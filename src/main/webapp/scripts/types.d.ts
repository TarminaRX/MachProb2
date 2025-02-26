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
}

export { };
