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

@WebServlet("/api/Supercreate")
class SuperAdminCreateServlet extends TemplateServlet {
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
    
    if(!"super_admin".equalsIgnoreCase(currUser.user_role())){
      messageError = new ErrorFolio(true, "You are not authorized to do this!");
      aba.print(JsonConverter.convertToJson(messageError));
      return;
    }

    String uNametoCreate = request.getParameter("user_name");
    String password = request.getParameter("password");
    String uRole = request.getParameter("user_role");

    if(da.checkIfUserExists(uNametoCreate)){
        messageError = new ErrorFolio(true, "User already exists!");
        aba.print(JsonConverter.convertToJson(messageError));
        return;
      }else{
        messageError = da.registerUser(uNametoCreate, password, uRole);
        if(messageError.isError() == false){
            messageError = new ErrorFolio(false, "User created successfully!");
        }else{
            messageError = new ErrorFolio(true, "User creation failed. User may already exist");
        }
      }

    
    
    aba.print(JsonConverter.convertToJson(messageError));

    // aba.print(JsonConverter.convertToJson(rm));
  }
}
