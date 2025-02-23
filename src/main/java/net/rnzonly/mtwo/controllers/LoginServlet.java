package net.rnzonly.mtwo.controllers;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.rnzonly.mtwo.models.ExampleModel;
import net.rnzonly.mtwo.utilities.JsonConverter;

@WebServlet("/api/login")
class LoginServlet extends TemplateServlet {

  class ResponseMessage {
    private String message;
    private Object data;

    public Object getData() {
      return data;
    }

    public void setData(Object data) {
      this.data = data;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
  }

  @Override
  protected void processRequest(HttpServletRequest request,
                                HttpServletResponse response)
      throws ServletException, IOException {

    /* PLEASE FOLLOW FORMAT */
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    PrintWriter aba = response.getWriter();
    ResponseMessage rm = new ResponseMessage();

    rm.setMessage("Success!");
    ExampleModel em = new ExampleModel();
    rm.setData(em);

    aba.print(JsonConverter.convertToJson(rm));
  }
}
