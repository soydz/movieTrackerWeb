package com.soydz.config.security;

import com.soydz.config.filter.JwtTokenValidator;
import com.soydz.service.impl.UserDetailServiceImpl;
import com.soydz.util.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtils jwtUtils;

    public SecurityConfig(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    // Configures the SecurityFilterChain to set authentication and authorization rules
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> {
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .authorizeHttpRequests(http -> {
                    http.requestMatchers(HttpMethod.GET,
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**",
                            "/swagger-resources/**",
                            "/webjars/**")
                            .permitAll();

                    http.requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll();

                    http.requestMatchers(HttpMethod.POST, "/api/movies/save").hasAnyRole("USER","ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.GET, "/api/movies/findAll").hasAnyRole("USER","ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.GET, "/api/movies/find/*").hasAnyRole("USER","ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.DELETE, "/api/movies/delete/*").hasAnyRole("USER","ADMIN","DEVELOPER");

                    http.requestMatchers(HttpMethod.GET, "/api/users/findAll").hasAnyRole("ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.GET, "/api/users/find/*").hasAnyRole("ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.DELETE, "/api/users/delete/*").hasAnyRole("ADMIN","DEVELOPER");

                    http.requestMatchers(HttpMethod.POST, "/api/user-movie/save").hasAnyRole("USER","ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.GET, "/api/user-movie/findAll").hasAnyRole("ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.GET, "/api/user-movie/find/*").hasAnyRole("USER","ADMIN","DEVELOPER");
                    http.requestMatchers(HttpMethod.DELETE, "/api/user-movie/delete/*").hasAnyRole("USER","ADMIN","DEVELOPER");

                    http.anyRequest().denyAll();

                })
                .addFilterBefore(new JwtTokenValidator(jwtUtils), BasicAuthenticationFilter.class)
                .build();
    }

    // Defines the AuthenticationManager used by Spring Security
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Custom Authentication Provider Configuration
    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailServiceImpl userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);

        return provider;
    }

    // Configures the PasswordEncoder used to securely encode and verify user passwords.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
