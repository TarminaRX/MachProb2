package net.rnzonly.mtwo.models;

public class PostFolio {
  private String post1, post2, post3, post4, post5;

  public PostFolio(String post1, String post2, String post3, String post4, String post5) {
    this.post1 = post1;
    this.post2 = post2;
    this.post3 = post3;
    this.post4 = post4;
    this.post5 = post5;
  }

  public PostFolio() {
    post1 = null;
    post2 = null;
    post3 = null;
    post4 = null;
    post5 = null;
  }

  public String[] toArray() {
    String placeholder6 = null;
    String[] buf = {post1, post2, post3, post4, post5, placeholder6};
    return buf;
  }

  public String getLatestPost() {
    String[] posts = toArray();
    
    for (int i = posts.length-1; i >= 0; i--) {
      if (posts[i] != null) {
        switch (i) {
          case 4: return post5;
          case 3: return post4;
          case 2: return post3;
          case 1: return post2;
          case 0: return post1;
        }
      }
    }

    return null;
  }

  public ErrorFolio deletePost(String target) {
    if (target == null) 
      return new ErrorFolio(true, "Can't delete empty! or null!");
    
    String[] posts = toArray();
    int position = -1;
    
    for (int i = 0; i < posts.length; i++) {
        if (target.equals(posts[i])) {
            position = i;
            break;
        }
    }
    
    if (position == -1) 
      return new ErrorFolio(true, "Post not found!");
    
    switch (position) {
        case 0: post1 = post2; 
        case 1: post2 = post3;
        case 2: post3 = post4;
        case 3: post4 = post5;
        case 4: post5 = null;
    }
    
    return new ErrorFolio(false, "Successfully deleted post!");
  }

  public ErrorFolio newPost(String mess) {
    String[] cPosts = toArray();
    for (int ix = 0; ix <cPosts.length; ix++) {
      if (cPosts[ix] == null) {
        switch (ix) {
          case 0:
            post1 = mess;
            break;
          case 1:
            post2 = mess;
            break;
          case 2:
            post3 = mess;
            break;
          case 3:
            post4 = mess;
            break;
          case 4:
            post5 = mess;
            break;
          case 5:
            deletePost("0");
            post5 = mess;
            break;
        }
        return new ErrorFolio(false, "Successfully made a new post!");
      }
    }
    return new ErrorFolio(true, "Maximum posts reached! First post deleted.");
  }


}
