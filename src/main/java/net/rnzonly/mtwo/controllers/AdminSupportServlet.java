package net.rnzonly.mtwo.controllers;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.rnzonly.mtwo.listeners.FolioInitialized;
import net.rnzonly.mtwo.models.DataAccess;
import net.rnzonly.mtwo.models.ErrorFolio;
import net.rnzonly.mtwo.models.SupportMessage;
import net.rnzonly.mtwo.models.UserFolio;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/list_support")
class AdminSupportServlet extends TemplateServlet {
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
    }

    List<SupportMessage> messages = FolioInitialized.spMessages();
    List<SupportMessage> lastFive =
        messages.subList(Math.max(0, messages.size() - 5), messages.size());
    SupportMessage[] spM = lastFive.toArray(new SupportMessage[0]);
    aba.println(JsonConverter.convertToJson(spM));
  }
}
