package com.gamebox.gb.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(
                                    HttpServletResponse.SC_UNAUTHORIZED,
                                    "Não autenticado"
                            );
                        })
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        .requestMatchers("/auth/**").permitAll()

                        // ADMIN cria, atualiza e deleta jogos
                        .requestMatchers(HttpMethod.POST, "/games/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/games/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/games/**").hasRole("ADMIN")

                        // USERS logados podem ver jogos
                        .requestMatchers(HttpMethod.GET, "/games/**").authenticated()

                        .requestMatchers("/profile/**").authenticated()
                        .requestMatchers("/profiles/**").authenticated()
                        .requestMatchers("/reviews/**").authenticated()

                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                .build();
    }
}