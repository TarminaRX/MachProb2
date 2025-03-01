package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.rnzonly.mtwo.models.DataAccess;
import net.rnzonly.mtwo.models.ErrorFolio;
import net.rnzonly.mtwo.models.UserFolio;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/update")
class AdminUpdateServlet extends TemplateServlet {
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

    String old_username = request.getParameter("old_user_name");
    String user_name = request.getParameter("user_name");
    String user_role = request.getParameter("user_role");
    String password = request.getParameter("password");
    
    if (old_username == null || user_name == null || user_role == null || password == null) {
      messageError = new ErrorFolio(true, "Malformed body request");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    ArrayList<UserFolio> resultF = new ArrayList<>();
    if (sq.getAttribute("resultFolio") != null) {
      UserFolio[] bufArrayResult = (UserFolio[]) sq.getAttribute("resultFolio");
      resultF = (ArrayList<UserFolio>)Arrays.asList(bufArrayResult);
    }

    messageError = da.updateUser(old_username, user_name, password, user_role, currUser);
    if (messageError.isError() == false) {
      resultF.add(da.cachedUser());
      sq.removeAttribute("resultFolio");
      sq.setAttribute("resultFolio", resultF.toArray(new UserFolio[0]));
    }
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
