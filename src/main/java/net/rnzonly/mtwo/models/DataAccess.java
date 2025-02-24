package net.rnzonly.mtwo.models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import net.rnzonly.mtwo.listeners.FolioInitialized;

public class DataAccess {
  private Connection localcon = FolioInitialized.getMsqlcon();
  private PreparedStatement pst;
  private UserFolio cachedUser;

  public UserFolio cachedUser() { return cachedUser; }

  public ErrorFolio credentialsExists(String uname, String password)
      throws Exception {
    ErrorFolio currError = new ErrorFolio(true, "");
    pst = localcon.prepareStatement("select * from account WHERE user_name = ?");
    pst.setString(1, uname);

    ResultSet rs = pst.executeQuery();
    if (rs.next()) {
      String pw = rs.getString("password");

      if (pw.equals(password)) {
        currError.isError(false);
        currError.message("You are now logged in!");
        cachedUser = new UserFolio(rs.getString("user_name"), pw, rs.getString("user_role"));
      } else {
        currError.message("Your password is incorrect.");
      }
    } else {
      currError.message("The user doesn't exist.");
    }
    return currError;
  }
}
