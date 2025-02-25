package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.rnzonly.mtwo.models.DataAccess;
import net.rnzonly.mtwo.models.ErrorFolio;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/signup")
class RegisterServlet extends TemplateServlet {
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
    if (sq.getAttribute("currentUser") != null) {
      messageError = new ErrorFolio(true, "Can't log in twice!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    String usernameVar = request.getParameter("user_name");
    String passVar = request.getParameter("password");
    String passConfirm = request.getParameter("password2");

    if (!passVar.equals(passConfirm)) {
      messageError = new ErrorFolio(true, "Password doesn't match.");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }
    
    messageError = da.registerUser(usernameVar, passVar, "user");

    if (messageError.isError() == false) {
      sq.setAttribute("currentUser", da.cachedUser());
    }
    aba.print(JsonConverter.convertToJson(messageError));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
