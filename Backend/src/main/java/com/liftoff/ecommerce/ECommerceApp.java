package com.liftoff.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ECommerceApp {

    public static void main(String[] args) {
	Dotenv dotenv = Dotenv.load();

        SpringApplication.run(ECommerceApp.class, args);
    }

}
