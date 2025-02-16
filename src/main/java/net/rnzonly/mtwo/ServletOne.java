package net.rnzonly.mtwo;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/api/hello")
class ServletOne extends TemplateServlet {

  @Override
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    response.setContentType("text/plain");
    PrintWriter aba = response.getWriter();
    aba.println("This is a test message");
  }

}
