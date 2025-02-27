package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.rnzonly.mtwo.models.DataAccess;
import net.rnzonly.mtwo.models.FollowFolio;
import net.rnzonly.mtwo.models.ErrorFolio;
import net.rnzonly.mtwo.models.UserFolio;
import net.rnzonly.mtwo.models.UserMessage;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/follow")
class FollowServlet extends TemplateServlet {
  private DataAccess da = new DataAccess();

  @Override
  protected void processRequest(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {

    /* PLEASE FOLLOW FORMAT */
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    PrintWriter aba = response.getWriter();
    ErrorFolio messageError = null;

    HttpSession sq = request.getSession(true);
    if (sq.getAttribute("currentUser") == null) {
      messageError = new ErrorFolio(true, "Session expired, Log in again!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    UserFolio currUser = (UserFolio)sq.getAttribute("currentUser");
    String[] followsArray = currUser.follows().toArray();

    String action = request.getParameter("action");
    String username = request.getParameter("user_name");

    if(action == null || username == null){
      messageError = new ErrorFolio(true, "Invalid parameter provided!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    if(username.equals("currentUser")){
      messageError = new ErrorFolio(true, "You cannot follow or unfollow yourself!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    if(!da.checkIfUserExists(username)){
      messageError = new ErrorFolio(true, "User does not exist!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    ErrorFolio result = null;
    if("follow".equals(action)){
      for (String follow : followsArray){
        if(follow != null && follow.equalsIgnoreCase(username)){
          result = new ErrorFolio(true, "You are already following " + username);
          break;
        }else{
          FollowFolio updateF = da.updateUserFollows(currUser.user_name(), username);
          if(updateF != null){
            currUser.follows(updateF);
            result = new ErrorFolio(false, "Successfully followed " + username);
          }else{
            result = new ErrorFolio(true, "You have reached the maximum follow limit!");
          }
          break;
        }
      }
    }else if("unfollow".equals(action)){
      FollowFolio updateF = da.removeUserFollow(currUser.user_name(), username);
      currUser.follows(updateF);
      result = new ErrorFolio(false, "Successfully unfollowed " + username);
    }else{
      result = new ErrorFolio(true, "Invalid action!");
    }

    sq.setAttribute("currentUser", currUser);
    aba.print(JsonConverter.convertToJson(result));

    // aba.print(JsonConverter.convertToJson(um));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
