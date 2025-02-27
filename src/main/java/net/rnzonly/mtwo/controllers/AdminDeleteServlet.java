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
    if(!"admin".equalsIgnoreCase(currUser.user_role()) && !"super_admin".equalsIgnoreCase(currUser.user_role())){
      messageError = new ErrorFolio(true, "You are not authorized to do this!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    String action = request.getParameter("action");
    String uNametoDelete = request.getParameter("user_name");

    if(uNametoDelete == null){
      messageError = new ErrorFolio(true, "Invalid Username!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    if(currUser.user_name().equalsIgnoreCase(uNametoDelete)){
      messageError = new ErrorFolio(true, "You cannot delete yourself!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    if("delete".equals(action)){
      if(da.checkIfUserExists(uNametoDelete)){
        da.deleteUser(uNametoDelete);
        messageError = new ErrorFolio(false, "User deleted successfully!");
      }else if(!da.checkIfUserExists(uNametoDelete)){
        messageError = new ErrorFolio(true, "User does not exist!");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
      }else{
        messageError = new ErrorFolio(true, "Failed to delete");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
      }
    }else{
      messageError = new ErrorFolio(true, "Invalid Action!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }
    

    aba.print(JsonConverter.convertToJson(messageError));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
