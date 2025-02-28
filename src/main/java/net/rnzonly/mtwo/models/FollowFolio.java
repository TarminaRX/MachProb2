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
    ErrorFolio er = new ErrorFolio(true, "You don't follow this user!");

    if (follow1.equalsIgnoreCase(username) ||
        follow2.equalsIgnoreCase(username) ||
        follow3.equalsIgnoreCase(username)) {
      follow1 = (follow1.equalsIgnoreCase(username)) ? null : follow1;
      follow2 = (follow2.equalsIgnoreCase(username)) ? null : follow2;
      follow3 = (follow3.equalsIgnoreCase(username)) ? null : follow3;

      er.isError(false);
      er.message("Successfully unfollowed user!");
    }

    return er;
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
      }
    }
    return new ErrorFolio(true, "Maximum following reached!");
  }
}
