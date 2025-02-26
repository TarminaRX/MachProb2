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
  private FollowFolio ff = new FollowFolio();

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

    // UserFolio currUser = (UserFolio)sq.getAttribute("currentUser");
    // String[] followsArray = currUser.follows().toArray();
    // UserMessage[] um = new UserMessage[3];

    //Placeholder kase wala pa gawa si Brandy
    String action = request.getParameter("action"); // action=follow = return follow;
    String username = request.getParameter("user_name");

    if("follow".equals(action)){
      ff.followUser(username);
    }else if("unfollow".equals(action)){
      ff.unfollowUser(username);
    }

    // aba.print(JsonConverter.convertToJson(um));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
