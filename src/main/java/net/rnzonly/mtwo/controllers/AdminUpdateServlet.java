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
    
    if(!"admin".equalsIgnoreCase(currUser.user_role()) && !"super_admin".equalsIgnoreCase(currUser.user_role())){
      messageError = new ErrorFolio(true, "You are not authorized to do this!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    String uNametoUpdate = request.getParameter("user_change");
    String password = request.getParameter("password");
    String uRole = request.getParameter("user_role");
    String userName = request.getParameter("user_name");

    if (uNametoUpdate == null || uNametoUpdate.isEmpty() || password == null || password.isEmpty() ||
        uRole == null || uRole.isEmpty() || userName == null || userName.isEmpty()) {
        messageError = new ErrorFolio(true, "All fields are required!");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
    }
        messageError = da.updateUser(uNametoUpdate, password, uRole, userName);
        if(messageError.isError() == false){
            messageError = new ErrorFolio(false, "User updated successfully!");
        }else{
            messageError = new ErrorFolio(true, "Failed to udpate user. Try again");
        }
      

    aba.print(JsonConverter.convertToJson(messageError));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
