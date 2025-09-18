package com.kkmserver.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(
                auth -> auth.requestMatchers(
                                "/admin/**",
                                "/api/v0/**"
                            )
                            .authenticated()
                            .anyRequest()
                            .permitAll()
            )
            .formLogin(
                form -> form.loginPage("/login")
                            .loginProcessingUrl("/login")
                            .defaultSuccessUrl("/admin")
                            .failureUrl("/login?error")
                            .permitAll()
            )
            .logout(
                logout -> logout.logoutUrl("/logout")
                                .logoutSuccessUrl("/")
                                .permitAll()   
            );

        return http.build();
    }
}
