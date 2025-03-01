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

@WebServlet("/api/exist")
class ExistServlet extends TemplateServlet {
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
    UserFolio curUser = (UserFolio) sq.getAttribute("currentUser");
    if(!da.checkIfUserExists(curUser.user_name())) {
      messageError = new ErrorFolio(true, "User does not exist anymore!");
      sq.removeAttribute("currentUser");
    } else {
      messageError = new ErrorFolio(false, "Still valid no action needed!");
    };

    aba.print(JsonConverter.convertToJson(messageError));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
