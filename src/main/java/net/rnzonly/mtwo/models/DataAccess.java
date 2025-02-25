package net.rnzonly.mtwo.models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import net.rnzonly.mtwo.listeners.FolioInitialized;

public class DataAccess {
  private Connection localcon = FolioInitialized.getMsqlcon();
  private PreparedStatement pst;
  private UserFolio cachedUser;

  public UserFolio cachedUser() {
    return cachedUser;
  }

  public ErrorFolio registerUser(String username, String pass, String role)
      throws Exception {
    ErrorFolio currError = new ErrorFolio(false, "Account successfully created!");
    if (checkIfUserExists(username)) {
      currError.isError(true);
      currError.message("Account already exists!");
      return currError;
    }

    pst = localcon.prepareStatement("INSERT INTO account (user_name, password, user_role) VALUES (?, ?, ?)");
    pst.setString(1, username);
    pst.setString(2, pass);
    pst.setString(3, role);
    pst.executeUpdate();
    // posts table
    pst = localcon.prepareStatement("INSERT INTO posts (user_name, post1, post2, post3, post4, post5) VALUES (?, NULL, NULL, NULL, NULL, NULL)");
    pst.setString(1, username);
    pst.executeUpdate();
    // follow table
    pst = localcon.prepareStatement("INSERT INTO follows (user_name, follow1, follow2, follow3) VALUES (?, NULL, NULL, NULL)");
    pst.setString(1, username);
    pst.executeUpdate();

    cachedUser = new UserFolio(username, pass, role, new PostFolio(), new FollowFolio());
    
    return currError;
  }

  public boolean checkIfUserExists(String userName) throws Exception {
    pst = localcon.prepareStatement("select * from account WHERE user_name = ?");
    pst.setString(1, userName);

    ResultSet rBuf = pst.executeQuery();
    if (rBuf.next()) {
      return true;
    }
    return false;
  }

  public FollowFolio getUserFollows(String uname) throws Exception {
    pst = localcon.prepareStatement("select * from follows WHERE user_name = ?");
    pst.setString(1, uname);

    ResultSet r = pst.executeQuery();
    if (r.next()) {
      return new FollowFolio(r.getString("follow1"), r.getString("follow2"), r.getString("follow3"));
    }
    return null;
  }

  public PostFolio getUserPosts(String uname) throws Exception {
    pst = localcon.prepareStatement("select * from posts WHERE user_name = ?");
    pst.setString(1, uname);

    ResultSet r = pst.executeQuery();
    if (r.next()) {
      return new PostFolio(r.getString("post1"), r.getString("post2"), r.getString("post3"), r.getString("post4"), r.getString("post5"));
    }
    return null;
  }

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
        cachedUser = new UserFolio(rs.getString("user_name"), pw,
            rs.getString("user_role"),
            getUserPosts(uname), getUserFollows(uname));
      } else {
        currError.message("Your password is incorrect.");
      }
    } else {
      currError.message("The user doesn't exist.");
    }
    return currError;
  }
}
