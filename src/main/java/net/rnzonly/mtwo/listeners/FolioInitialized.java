package net.rnzonly.mtwo.listeners;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import net.rnzonly.mtwo.models.SupportMessage;

@WebListener
public class FolioInitialized implements ServletContextListener {
  private static Connection msqlcon;
  private static final Logger logger = Logger.getLogger(FolioInitialized.class.getName());
  private static ArrayList<SupportMessage> spMessages;

  public static Connection getMsqlcon() {
    return msqlcon;
  }

  @Override
  public void contextInitialized(ServletContextEvent sce) {
    msqlcon = initializeConnection();
    if (msqlcon != null) {
      logger.info("Successfully connected to the database!");
    } else {
      logger.severe("Failed to establish database connection.");
    }
    spMessages = new ArrayList<>();
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {
    if (msqlcon != null) {
      try {
        msqlcon.close();
        logger.info("Database connection closed.");
      } catch (SQLException e) {
        logger.severe("Error closing connection: " + e.getMessage());
      }
    }
  }

  public static ArrayList<SupportMessage> spMessages() {
    return spMessages;
  }

  public static Connection initializeConnection() {
    try {
      Class.forName("com.mysql.cj.jdbc.Driver");
      String mainUrl = "jdbc:mysql://localhost:3306/"
          + "FolioRevised?useSSL=false&allowPublicKeyRetrieval=true";
      return DriverManager.getConnection(mainUrl, "root", "root");
    } catch (Exception e) {
      logger.severe("Database connection error: " + e.getMessage());
    }
    return null;
  }
}
