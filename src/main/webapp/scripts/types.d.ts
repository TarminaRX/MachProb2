declare global {
  type MFormDataResult = {
    data: string | Object;
    error: boolean;
  }

  type ErrorFolio = {
    isError: boolean;
    message: string;
  }

  type FeedContents = {
    user_name:  string;
    post: string;
  }
   
  type UserContents = {
    user_name: string
    user_role: {
      value: string
    }
    posts: {
      post1: string | null
      post2: string | null
      post3: string | null
      post4: string | null
      post5: string | null
    } | null
    follows: {
      follow1: string | null
      follow2: string | null
      follow3: string | null
    } | null
  }

  type UserContentLite = {
    user_name: string
    user_role: {
      value: string
    }
  }

  type SupportMessage = {
    user_name: string
    message: string
  }
}

export { };
