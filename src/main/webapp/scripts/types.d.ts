declare global {
  type MFormDataResult = {
    data: string | Object;
    error: boolean;
  }

  type ErrorFolio = {
    isError: boolean;
    message: string;
  }
}

export { };
