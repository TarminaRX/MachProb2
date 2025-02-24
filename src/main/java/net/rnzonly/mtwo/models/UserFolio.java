package net.rnzonly.mtwo.models;

import java.math.BigInteger;

public class UserFolio {
  private BigInteger user_id;
  private String username, email, password;
  private UserRole role;

  public UserFolio(BigInteger user_id, String username, String email, String password, String role) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = UserRole.fromString(role);
  }

  public BigInteger user_id() { return user_id; }

  public String username() { return username; }

  public String email() { return email; }

  public String password() { return password; }

  public String role() { return role.value(); }

  public void role(String urole) { role = UserRole.fromString(urole); }

  public void username(String newName) { username = newName; }

  public void email(String newEmail) { email = newEmail; }

  public void password(String newPassword) { password = newPassword; }
}

enum UserRole {
  USER("user"),
  ADMIN("admin"),
  SUPER_ADMIN("super_admin");

  private final String value;

  UserRole(String value) { this.value = value; }

  public String value() { return value; }

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
