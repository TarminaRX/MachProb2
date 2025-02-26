package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import net.rnzonly.mtwo.models.DataAccess;
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
    UserMessage[] um = new UserMessage[3];

    for (int is = 0; is < followsArray.length; is++) {
      String followedUser = followsArray[is];
      if (followedUser != null) {
        String followedUmessage = da.getUserPosts(followedUser).getLatestPost();
        UserMessage completeMessage =
            new UserMessage(followedUser, followedUmessage);
        um[is] = completeMessage;
      }
    }

    aba.print(JsonConverter.convertToJson(um));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
