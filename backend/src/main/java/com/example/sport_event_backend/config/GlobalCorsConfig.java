package com.example.sport_event_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class GlobalCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow credentials (e.g., cookies, authorization headers)
        config.setAllowCredentials(true);

        // Allow requests from your frontend origin
        config.addAllowedOrigin("http://localhost:5173"); // You can use "*" for all origins, but it's safer to use the specific domain

        // Allow all headers to be sent in requests
        config.addAllowedHeader("*");

        // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
        config.addAllowedMethod("*");

        // Register the CORS configuration for all endpoints
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
