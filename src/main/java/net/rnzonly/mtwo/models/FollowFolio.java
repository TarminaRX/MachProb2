package net.rnzonly.mtwo.models;

public class FollowFolio {
  private String follow1, follow2, follow3;

  public FollowFolio(String f1, String f2, String f3) {
    follow1 = f1;
    follow2 = f2;
    follow3 = f3;
  }

  public FollowFolio() {
    follow1 = null;
    follow2 = null;
    follow3 = null;
  }

  public String[] toArray() {
    String[] buf = {follow1, follow2, follow3};
    return buf;
  }

  public ErrorFolio unfollowUser(String username) {
    if (username == null) {
      return new ErrorFolio(true, "Username cannot be null!");
    }

    String normalizedUsername = username.trim();
    if (normalizedUsername.isEmpty()) {
      return new ErrorFolio(true, "Username cannot be empty!");
    }

    boolean wasFollowing = false;

    String[] follows = {follow1, follow2, follow3};

    for (int i = 0; i < follows.length; i++) {
      if (follows[i] != null &&
          follows[i].equalsIgnoreCase(normalizedUsername)) {
        follows[i] = null;
        wasFollowing = true;
        break;
      }
    }

    follow1 = follows[0];
    follow2 = follows[1];
    follow3 = follows[2];

    if (!wasFollowing) {
      return new ErrorFolio(true, "You don't follow this user!");
    }

    return new ErrorFolio(false, "Successfully unfollowed user!");
  }

  public ErrorFolio followUser(String username) {
    String[] follows = toArray();

    for (int i = 0; i < follows.length; i++) {
      if (follows[i] == null) {
        switch (i) {
        case 0:
          follow1 = username;
          break;
        case 1:
          follow2 = username;
          break;
        case 2:
          follow3 = username;
          break;
        }
        return new ErrorFolio(false, "Successfully followed user!");
      } else if (follows[i].equals(username)) {
        return new ErrorFolio(true, "You are already following this user!");
      }
    }
    return new ErrorFolio(true, "Maximum following reached!");
  }
}
