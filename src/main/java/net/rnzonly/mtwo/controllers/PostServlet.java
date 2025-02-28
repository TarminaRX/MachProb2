package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.rnzonly.mtwo.models.DataAccess;
import net.rnzonly.mtwo.models.ErrorFolio;
import net.rnzonly.mtwo.models.PostFolio;
import net.rnzonly.mtwo.models.UserFolio;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/post")
class PostServlet extends TemplateServlet {
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
    
    if(!"admin".equalsIgnoreCase(currUser.user_role()) && !"super_admin".equalsIgnoreCase(currUser.user_role())){
      messageError = new ErrorFolio(true, "You are not authorized to do this!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    String action = request.getParameter("action");
    String username = request.getParameter("user_name");
    String message = request.getParameter("message");

    if (action == null || username == null) {
        messageError = new ErrorFolio(true, "Invalid parameters provided!");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
      }
  
      if (!da.checkIfUserExists(username)) {
        messageError = new ErrorFolio(true, "User does not exist!");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
      }

    ErrorFolio result = null;

    if("create".equals(action)){
      if(message == null){
        messageError = new ErrorFolio(true, "Posts cannot be empty!");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
      }

      PostFolio updatedPost = da.updatePost(username, message);
      if(updatedPost != null){
        currUser.posts(updatedPost);
        result = new ErrorFolio(false, "Successfully posted!");
      }else{
        result = new ErrorFolio(true, "You have reached maximum post limit!");
      }
    }else if("delete".equals(action)){
      if (message == null) {
        messageError = new ErrorFolio(true, "Specify which post to delete!");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
      }

      PostFolio updatedPost = da.updatePost(username, message);
      currUser.posts(updatedPost);
      result = new ErrorFolio(false, "Successfully deleted post!");
    }else{
      result = new ErrorFolio(true, "Invalid action!");
    }

    
    sq.setAttribute("currentUser", currUser);
    aba.print(JsonConverter.convertToJson(result));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
