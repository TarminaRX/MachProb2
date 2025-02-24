package net.rnzonly.mtwo.models;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import net.rnzonly.mtwo.listeners.FolioInitialized;

public class DataAccess {
  private Connection localcon = FolioInitialized.getMsqlcon();
  private PreparedStatement pst;
  private UserFolio cachedUser;

  public UserFolio cachedUser() { return cachedUser; }

  public ErrorFolio credentialsExists(String email, String password)
      throws Exception {
    ErrorFolio currError = new ErrorFolio(true, "");
    pst = localcon.prepareStatement("select * from Users WHERE email = ?");
    pst.setString(1, email);

    ResultSet rs = pst.executeQuery();
    if (rs.next()) {
      String pw = rs.getString("password");

      if (pw.equals(password)) {
        currError.isError(false);
        currError.message("You are now logged in!");
        cachedUser =
            new UserFolio(new BigInteger(rs.getString("user_id")),
                          rs.getString("username"), rs.getString("email"),
                          rs.getString("password"), rs.getString("role"));
      } else {
        currError.message("Your password is incorrect.");
      }
    } else {
      currError.message("The user doesn't exist.");
    }
    return currError;
  }
}
