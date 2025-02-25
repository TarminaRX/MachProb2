package net.rnzonly.mtwo.models;

public class UserFolio {
  private String user_name, password;
  private UserRole user_role;
  private PostFolio posts;
  private FollowFolio follows;

  public UserFolio(String username, String password, String user_role,
      PostFolio posts, FollowFolio follows) {
    this.user_name = username;
    this.password = password;
    this.user_role = UserRole.fromString(user_role);
    this.posts = posts;
    this.follows = follows;
  }

  public String user_name() {
    return user_name;
  }

  public String password() {
    return password;
  }

  public String user_role() {
    return user_role.value();
  }

  public PostFolio posts() {
    return posts;
  }

  public FollowFolio follows() {
    return follows;
  }

  public void user_role(String urole) {
    user_role = UserRole.fromString(urole);
  }

  public void user_name(String newName) {
    user_name = newName;
  }

  public void password(String newPassword) {
    password = newPassword;
  }

  public void posts(PostFolio newPosts) {
    posts = newPosts;
  }

  public void follows(FollowFolio newFollows) {
    follows = newFollows;
  }
}

enum UserRole {
  USER("user"),
  ADMIN("admin"),
  SUPER_ADMIN("super_admin");

  private final String value;

  UserRole(String value) {
    this.value = value;
  }

  public String value() {
    return value;
  }

  public static UserRole fromString(String text) {
    for (UserRole role : UserRole.values()) {
      if (role.value.equalsIgnoreCase(text)) {
        return role;
      }
    }
    throw new IllegalArgumentException("No constant with text " + text +
        " found");
  }

  @Override
  public String toString() {
    return value;
  }
}
