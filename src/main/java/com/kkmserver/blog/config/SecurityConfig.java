package com.kkmserver.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.kkmserver.blog.security.LoginFailureHandler;
import com.kkmserver.blog.security.LoginSuccessHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final LoginSuccessHandler loginSuccessHandler;
    private final LoginFailureHandler loginFailureHandler;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions().sameOrigin())
            .authorizeHttpRequests(
                auth -> auth
                            .requestMatchers(
                                "/api/v0/member"
                            )
                            .permitAll()
                            .requestMatchers(
                                "/admin/**",
                                "/api/v0/**"
                            )
                            .authenticated()
                            .anyRequest()
                            .permitAll()
            )
            .formLogin(
                form -> form.loginPage("/login")
                            .loginProcessingUrl("/api/v0/member")
                            .successHandler(loginSuccessHandler)
                            .failureHandler(loginFailureHandler)
                            .permitAll()
            )
            .logout(
                logout -> logout.logoutUrl("/logout")
                                .logoutSuccessUrl("/")
                                .permitAll()   
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
