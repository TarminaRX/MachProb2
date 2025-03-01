package net.rnzonly.mtwo.models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;

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

    pst = localcon.prepareStatement("INSERT INTO account (user_name, "
                                    + "password, user_role) VALUES (?, ?, ?)");
    pst.setString(1, username);
    pst.setString(2, pass);
    pst.setString(3, role);
    pst.executeUpdate();
    // posts table
    pst = localcon.prepareStatement(
        "INSERT INTO posts (user_name, post1, post2, post3, post4, post5) "
        + "VALUES (?, NULL, NULL, NULL, NULL, NULL)");
    pst.setString(1, username);
    pst.executeUpdate();
    // follow table
    pst = localcon.prepareStatement(
        "INSERT INTO follows (user_name, follow1, follow2, follow3) VALUES "
        + "(?, NULL, NULL, NULL)");
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

  public ErrorFolio updateUser(String oldUserName, String newUserName,
                               String newPassword, String newRole, UserFolio currUser)
      throws Exception {
    ErrorFolio message = getUserLite(oldUserName);
    if (message.isError()) {
      return message;
    } else if (newUserName.equals(currUser.user_name())) {
      message = new ErrorFolio(true, "You can't rename user to yourself");
      return message;
    } else if (oldUserName.equals(currUser.user_name())) {
      message = new ErrorFolio(true, "You can't update yourself");
      return message;
    }

    if ((cachedUser.user_role().contains("admin") &&
        !currUser.user_role().equals("super_admin")) || (newRole.contains("admin") && !currUser.user_role().equals("super_admin"))) {
      message = new ErrorFolio(true, "You don't have privilege for this!");
      return message;
    }

    cachedUser.user_name((newUserName.length() != 0) ? newUserName : cachedUser.user_name());
    cachedUser.password((newPassword.length() != 0) ? newPassword : cachedUser.password());
    cachedUser.user_role((newRole.length() != 0) ? newRole : cachedUser.user_role());

    pst = localcon.prepareStatement("update account set user_name = ?, password = ?, user_role = ? where user_name = ?");
    pst.setString(1, cachedUser.user_name());
    pst.setString(2, cachedUser.password());
    pst.setString(3, cachedUser.user_role());
    pst.setString(4, oldUserName);
    pst.executeUpdate();
    return new ErrorFolio(false, "Successfully updated the user!");
  }

  public UserFolio[] getAllUsersLite(UserFolio curUser) throws Exception {
    if (curUser.user_role().toString().equals("super_admin")) {
      pst = localcon.prepareStatement(
          "SELECT * FROM account WHERE user_name != ?");
    } else {
      pst =
          localcon.prepareStatement("SELECT * FROM account WHERE (user_role = "
                                    + "'user') AND user_name != ?");
    }
    ArrayList<UserFolio> ufList = new ArrayList<>();
    pst.setString(1, curUser.user_name());
    ResultSet setOne = pst.executeQuery();
    while (setOne.next()) {
      UserFolio bufUF = new UserFolio(
          setOne.getString("user_name"), setOne.getString("password"),
          setOne.getString("user_role"), null, null);
      ufList.add(bufUF);
    }

    return ufList.toArray(new UserFolio[ufList.size()]);
  };

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
      pst = localcon.prepareStatement("update follows set " + currentFollow +
                                      " = ? where user_name = ?");
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
      pst = localcon.prepareStatement("update posts set " + currentPost +
                                      " = ? where user_name = ?");
      if (posts[i] == null) {
        pst.setNull(1, Types.VARCHAR);
      } else {
        pst.setString(1, posts[i]);
      }
      pst.setString(2, curUser.user_name());
      pst.executeUpdate();
    }
  }

  public ErrorFolio updateUserPosts(String message, UserFolio curUser)
      throws Exception {
    ErrorFolio currErr = curUser.posts().newPost(message);
    if (currErr.isError()) {
      return currErr;
    }
    updatePostsTable(curUser);
    return currErr;
  }

  public ErrorFolio removeUserPost(String message, UserFolio curUser)
      throws Exception {
    ErrorFolio currErr = curUser.posts().deletePost(message);
    if (currErr.isError()) {
      return currErr;
    }
    updatePostsTable(curUser);
    return currErr;
  }

  public ErrorFolio getUserLite(String username) throws Exception {
    if (!checkIfUserExists(username)) {
      return new ErrorFolio(true, "Account does not exist!");
    }
    pst =
        localcon.prepareStatement("select * from account WHERE user_name = ?");
    pst.setString(1, username);
    ResultSet rs = pst.executeQuery();
    if (rs.next()) {
      cachedUser =
          new UserFolio(rs.getString("user_name"), rs.getString("password"),
                        rs.getString("user_role"), null, null);
    }
    return new ErrorFolio(false, "Retrieval was successful!");
  }

  public ErrorFolio deleteUser(String username, UserFolio currUser)
      throws Exception {
    ErrorFolio message = getUserLite(username);
    if (message.isError()) {
      return message;
    } else if (username.equals(currUser.user_name())) {
      message = new ErrorFolio(true, "You can't delete yourself");
      return message;
    }

    if (cachedUser.user_role().contains("admin") &&
        !currUser.user_role().equals("super_admin")) {
      message = new ErrorFolio(true, "You don't have privilege for this!");
      return message;
    }

    pst = localcon.prepareStatement("delete from account where user_name = ?");
    pst.setString(1, username);
    pst.executeUpdate();

    message = new ErrorFolio(false, "Successfully deleted user!");
    return message;
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

  public PostFolio updatePost(String uname, String mess) throws Exception {
    PostFolio posts = getUserPosts(uname);
    String[] postsArray = posts.toArray();

    for (int i = 0; i < postsArray.length;
         i++) { // Find position of user to be unfollowed
      if (postsArray[i] == null) {
        posts.newPost(mess);
        String column = "post" + (i + 1);
        pst = localcon.prepareStatement("update posts set " + column +
                                        " = ? where user_name = ?");
        pst.setString(1, mess);
        pst.setString(2, uname);
        pst.executeUpdate();
        return posts;
      }
    }
    return null;
  }

  public PostFolio deletePost(String uname, String mess) throws Exception {
    PostFolio posts = getUserPosts(uname);
    String[] postsArray = posts.toArray();
    for (int i = 0; i < postsArray.length; i++) {
      if (mess.equalsIgnoreCase(postsArray[i])) {
        posts.deletePost(mess);
        String column = "post" + (i + 1);
        pst = localcon.prepareStatement("update posts set " + column +
                                        " = null where user_name = ?");
        pst.setString(1, uname);
        pst.executeUpdate();
        return posts;
      }
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
