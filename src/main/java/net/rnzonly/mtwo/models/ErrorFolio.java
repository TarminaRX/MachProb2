package net.rnzonly.mtwo.models;

public class ErrorFolio {
  private boolean isError = false;
  private String message;

  public ErrorFolio(boolean err, String mess) {
    isError = err;
    message = mess;
  }

  public boolean isError() {
    return isError;
  }

  public void isError(boolean newVal) {
    isError = newVal;
  }

  public String message() {
    return message;
  }

  public void message(String newVal) {
    message = newVal;
  }
}
