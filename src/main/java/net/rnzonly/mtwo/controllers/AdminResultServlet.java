package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.rnzonly.mtwo.models.DataAccess;
import net.rnzonly.mtwo.models.ErrorFolio;
import net.rnzonly.mtwo.models.UserFolio;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/result")
class AdminResultServlet extends TemplateServlet {
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
    UserFolio[] bufMessage = new UserFolio[0];

    if (!(currUser.user_role().contains("admin"))) {
      messageError = new ErrorFolio(true, "You don't have privilege for this!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    } else if (sq.getAttribute("resultFolio") != null) {
      bufMessage = (UserFolio[])sq.getAttribute("resultFolio");
    } 
    aba.print(JsonConverter.convertToJson(bufMessage));
    sq.removeAttribute("resultFolio");

    // if ((uRole.equals("super_admin") && currUser.user_role().equals("admin"))
    // || (uRole.equals("admin") && currUser.user_role().equals("admin"))) {
    // messageError = new ErrorFolio(
    // true, "You are not authorized to create this kind of user.");
    // aba.print(JsonConverter.convertToJson(messageError));
    // return;
    // } else {
    // messageError = da.registerUser(uNametoCreate, password, uRole);
    // }
  }
}
