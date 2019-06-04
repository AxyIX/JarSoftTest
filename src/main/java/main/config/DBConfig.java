package main.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

@Configuration
public class DBConfig {

    private static final String DB_ADDRESS = "localhost";
    private static final String DB_PORT = "3306";
    private static final String DB_NAME = "test_db";
    private static final String DB_USER = "testuser";
    private static final String DB_PASSWORD = "testpassword";

    @Bean
    public DataSource getDBConfig() {
        Properties properties = new Properties();
        try {
            FileInputStream fileInputStream = new FileInputStream("dbconfig.properties");
            properties.load(fileInputStream);
            String dbAddress = properties.getProperty("db-address");
            String dbPort = properties.getProperty("db-port");
            String dbName = properties.getProperty("db-name");
            String dbUser = properties.getProperty("db-user");
            String dbPassword = properties.getProperty("db-password");

            if (dbAddress.isEmpty() || dbPort.isEmpty() || dbName.isEmpty() || dbUser.isEmpty() || dbPassword.isEmpty()) {
                System.out.println("Not all db configuration exist!");
                return null;
            }

            return generateDBConfig(dbAddress, dbPort, dbName, dbUser, dbPassword);

        } catch (IOException e) {

            System.out.println("File 'dbconfig.properties' not found. Trying to create default 'dbconfig.properties' file.");
            try {
                OutputStream fos = new FileOutputStream("dbconfig.properties");
                properties.setProperty("db-address", DB_ADDRESS);
                properties.setProperty("db-port", DB_PORT);
                properties.setProperty("db-name", DB_NAME);
                properties.setProperty("db-user", DB_USER);
                properties.setProperty("db-password", DB_PASSWORD);
                properties.store(fos, null);

            } catch (IOException ex) {
                System.out.println("Can't find/load/write default dbconfig.properties file! Check writing rights.\nUsing default configuration.");
            }
        }
        return generateDBConfig(DB_ADDRESS, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD);
    }

    private DataSource generateDBConfig(String address, String port, String name, String user, String password) {
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();

        dataSourceBuilder.url("jdbc:mysql://" + address + ":" + port + "/" + name + "?serverTimezone=UTC");
        dataSourceBuilder.username(user);
        dataSourceBuilder.password(password);

        return dataSourceBuilder.build();
    }
}
