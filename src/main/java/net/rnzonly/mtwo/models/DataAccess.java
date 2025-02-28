package net.rnzonly.mtwo.models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;

import net.rnzonly.mtwo.listeners.FolioInitialized;

public class DataAccess {
  private Connection localcon = FolioInitialized.getMsqlcon();
  private PreparedStatement pst;
  private UserFolio cachedUser;

  public UserFolio cachedUser() { return cachedUser; }

  public ErrorFolio registerUser(String username, String pass, String role)
      throws Exception {
    ErrorFolio currError =
        new ErrorFolio(false, "Account successfully created!");
    if (checkIfUserExists(username)) {
      currError.isError(true);
      currError.message("Account already exists!");
      return currError;
    }

    pst = localcon.prepareStatement("INSERT INTO account (user_name, " +
                                    "password, user_role) VALUES (?, ?, ?)");
    pst.setString(1, username);
    pst.setString(2, pass);
    pst.setString(3, role);
    pst.executeUpdate();
    // posts table
    pst = localcon.prepareStatement(
        "INSERT INTO posts (user_name, post1, post2, post3, post4, post5) " +
        "VALUES (?, NULL, NULL, NULL, NULL, NULL)");
    pst.setString(1, username);
    pst.executeUpdate();
    // follow table
    pst = localcon.prepareStatement(
        "INSERT INTO follows (user_name, follow1, follow2, follow3) VALUES " +
        "(?, NULL, NULL, NULL)");
    pst.setString(1, username);
    pst.executeUpdate();

    cachedUser =
        new UserFolio(username, pass, role, new PostFolio(), new FollowFolio());

    return currError;
  }

  public boolean checkIfUserExists(String userName) throws Exception {
    pst =
        localcon.prepareStatement("select * from account WHERE user_name = ?");
    pst.setString(1, userName);

    ResultSet rBuf = pst.executeQuery();
    if (rBuf.next()) {
      return true;
    }
    return false;
  }

  public ErrorFolio updateUser(String newUserName, String password,
                               String uRole, String oldUserName)
      throws Exception {
    ErrorFolio currError =
        new ErrorFolio(false, "Account successfully updated!");
    if (!checkIfUserExists(oldUserName)) {
      currError.isError(true);
      currError.message("Account does not exist!");
      return currError;
    }

    pst = localcon.prepareStatement("INSERT INTO account (user_name, " +
                                    "password, user_role) VALUES (?, ?, ?)");
    pst.setString(1, newUserName);
    pst.setString(2, password);
    pst.setString(3, uRole);
    pst.executeUpdate();

    pst = localcon.prepareStatement(
        "update posts set user_name = ? where user_name = ?");
    pst.setString(1, newUserName);
    pst.setString(2, oldUserName);
    pst.executeUpdate();

    pst = localcon.prepareStatement(
        "update follows set user_name = ? where user_name = ?");
    pst.setString(1, newUserName);
    pst.setString(2, oldUserName);
    pst.executeUpdate();

    pst = localcon.prepareStatement("delete from account where user_name = ?");
    pst.setString(1, oldUserName);
    pst.executeUpdate();

    return currError;
  }

  public FollowFolio getUserFollows(String uname) throws Exception {
    pst =
        localcon.prepareStatement("select * from follows WHERE user_name = ?");
    pst.setString(1, uname);

    ResultSet r = pst.executeQuery();
    if (r.next()) {
      return new FollowFolio(r.getString("follow1"), r.getString("follow2"),
                             r.getString("follow3"));
    }
    return null;
  }

  public void updateFollowsTable(UserFolio curUser) throws Exception {
    String[] follows = curUser.follows().toArray();
    for (int i = 0; i < follows.length; i++) {
      String currentFollow = "follow" + (i + 1);
      pst = localcon.prepareStatement("update follows set " + currentFollow + " = ? where user_name = ?");
      if (follows[i] == null) {
        pst.setNull(1, Types.VARCHAR);
      } else {
        pst.setString(1, follows[i]);
      }
      pst.setString(2, curUser.user_name());
      pst.executeUpdate();
    }
  }

  public ErrorFolio updateUserFollows(String uname, UserFolio curUser)
      throws Exception {
    if (checkIfUserExists(uname) == false) {
      return new ErrorFolio(true, "The user does not exist!");
    } else if (uname.equals(curUser.user_name())) {
      return new ErrorFolio(true, "You can't follow yourself!");
    }
    ErrorFolio currErr = curUser.follows().followUser(uname);
    if (currErr.isError()) {
      return currErr;
    }
    updateFollowsTable(curUser);
    return currErr;
  }

  public ErrorFolio removeUserFollow(String uname, UserFolio curUser)
      throws Exception {
    if (checkIfUserExists(uname) == false) {
      return new ErrorFolio(true, "The user does not exist!");
    }
    ErrorFolio currErr = curUser.follows().unfollowUser(uname);
    if (currErr.isError()) {
      return currErr;
    }
    updateFollowsTable(curUser);
    return currErr;
  }
  
  public void updatePostsTable(UserFolio curUser) throws Exception {
    String[] posts = curUser.posts().toArray();
    for (int i = 0; i < posts.length; i++) {
      String currentPost = "post" + (i + 1);
      pst = localcon.prepareStatement("update posts set " + currentPost + " = ? where user_name = ?");
      if (posts[i] == null) {
        pst.setNull(1, Types.VARCHAR);
      } else {
        pst.setString(1, posts[i]);
      }
      pst.setString(2, curUser.user_name());
      pst.executeUpdate();
    }
  }

  public ErrorFolio updateUserPosts(String message, UserFolio curUser) throws Exception {
    ErrorFolio currErr = curUser.posts().newPost(message);
    if (currErr.isError()) {
      return currErr;
    }
    updatePostsTable(curUser);
    return currErr;
  }

  public ErrorFolio removeUserPost(String message, UserFolio curUser) throws Exception {
    ErrorFolio currErr = curUser.posts().deletePost(message);
    if (currErr.isError()) {
      return currErr;
    }
    updatePostsTable(curUser);
    return currErr;
  }

  public ErrorFolio deleteUser(String username) {
    try {
      pst = localcon.prepareStatement("delete from account where user_name = ?");
      pst.setString(1, username);
      pst.executeUpdate();
      return new ErrorFolio(false, "Successfully deleted user!");
    } catch (SQLException er) {
      return new ErrorFolio(true, er.toString());
    }
  }

  public PostFolio getUserPosts(String uname) throws Exception {
    pst = localcon.prepareStatement("select * from posts WHERE user_name = ?");
    pst.setString(1, uname);

    ResultSet r = pst.executeQuery();
    if (r.next()) {
      return new PostFolio(r.getString("post1"), r.getString("post2"),
                           r.getString("post3"), r.getString("post4"),
                           r.getString("post5"));
    }
    return null;
  }

  public ErrorFolio credentialsExists(String uname, String password)
      throws Exception {
    ErrorFolio currError = new ErrorFolio(true, "");
    pst =
        localcon.prepareStatement("select * from account WHERE user_name = ?");
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
