package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.rnzonly.mtwo.models.DataAccess;
import net.rnzonly.mtwo.models.ErrorFolio;
import net.rnzonly.mtwo.models.UserFolio;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/delete")
class AdminDeleteServlet extends TemplateServlet {
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

    if (!(currUser.user_role().contains("admin"))) {
      messageError = new ErrorFolio(true, "You don't have privilege for this!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    String[] uNametoCreate = request.getParameterValues("selected_users[]");
    
    if (uNametoCreate == null || uNametoCreate.length == 0) {
      messageError = new ErrorFolio(true, "Malformed body request");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    int countDeleted = 0;
    ArrayList<UserFolio> bufferResult = new ArrayList<>();
    for (int i = 0; i < uNametoCreate.length; i++) {
      String usernameDelete = uNametoCreate[i];
      messageError = da.deleteUser(usernameDelete, currUser);
      if (messageError.isError() == false) {
        countDeleted++;
        da.cachedUser().user_role("deleted");
        da.cachedUser().password("deleted");
        bufferResult.add(da.cachedUser());
      }
    }

    if (countDeleted == 0) {
      messageError = new ErrorFolio(true, "Didn't delete any user!");
    } else {
      messageError = new ErrorFolio(false, "Successfully deleted " + String.valueOf(countDeleted) + " users");
      UserFolio[] resultFolio = bufferResult.toArray(new UserFolio[0]);
      sq.setAttribute("resultFolio", resultFolio);
    };

    aba.print(JsonConverter.convertToJson(messageError));


    //if ((uRole.equals("super_admin") && currUser.user_role().equals("admin")) || (uRole.equals("admin") && currUser.user_role().equals("admin"))) {
    //  messageError = new ErrorFolio(
    //      true, "You are not authorized to create this kind of user.");
    //  aba.print(JsonConverter.convertToJson(messageError));
    //  return;
    //} else {
    //  messageError = da.registerUser(uNametoCreate, password, uRole);
    //}
  }
}
