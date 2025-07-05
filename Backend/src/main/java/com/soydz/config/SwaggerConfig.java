package com.soydz.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

@OpenAPIDefinition(
        info = @Info(
                title = "Movie tracker",
                version = "0.1.0"
        ),
        security = @SecurityRequirement(
                name = "security token"
        )
)

@SecurityScheme(
        name = "security token",
        description = "Access token for app",
        type = SecuritySchemeType.HTTP,
        paramName = HttpHeaders.AUTHORIZATION,
        in = SecuritySchemeIn.HEADER,
        scheme = "bearer",
        bearerFormat = "JWT"
)


@Configuration
public class SwaggerConfig {

        @Value("${swagger.server.dev}")
        private String urlServerDev;

        @Value("${swagger.server.prod}")
        private String urlServerProd;

        @Bean
        public OpenAPI customOpenApi() {
                Server devServer = new Server()
                        .url(urlServerDev)
                        .description("DEV SERVER");

                Server prodServer = new Server()
                        .url(urlServerProd)
                        .description("PROD SERVER");

                return new OpenAPI()
                        .addServersItem(devServer)
                        .addServersItem(prodServer);
        }
}
