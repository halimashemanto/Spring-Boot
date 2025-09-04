package com.emranhss.hospital.security;

import com.emranhss.hospital.jwt.JwtAuthenticationFilter;
import com.emranhss.hospital.jwt.JwtService;
import com.emranhss.hospital.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           JwtAuthenticationFilter jwtAuthenticationFilter,
                                           UserService userService) throws Exception {

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(req ->

                        req.requestMatchers("/api/user/",
                                        "/images/**",
                                        "/auth/all",
                                        "/api/doctor/**",
                                        "/api/doctor/",
                                        "/api/user/active/**",
                                        "/auth/login",
                                        "/api/nurse/**",
                                        "/api/receptionist/**",
                                        "/api/officeStaff/**",
                                        "/api/tests/**",
                                        "/api/medicine/**",
                                        "/api/department/**",
                                        "/api/department/",
                                        "/api/slot/**",
                                        "/api/slot",
                                        "/api/prescription",
                                        "/api/prescription/**",
                                        "/api/patient/",
                                        "/api/invoice",
                                        "/api/invoice/**",
                                        "/api/report",
                                        "/api/report/**",
                                        "/api/appoinment",
                                        "/api/appoinment/**",
                                        "/api/patient/**",
                                        "/api/doctor/by-department/**",
                                        "/api/slot/doctor/**",
                                        "/api/emergency",
                                        "/api/emergency/**",
                                        "/api/ward",
                                        "/api/ward/**"
                                        )

                                .permitAll()
                                .requestMatchers("/api/doctor/profile","/api/nurse/profile","/api/receptionist/profile")
                                .hasAnyRole("Doctor","Nurse","Admin","Receptionist","OfficeStaff")
                                .anyRequest().authenticated()
                )
                .userDetailsService(userService)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        return new JwtAuthenticationFilter(jwtService, userService);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200", "http://127.0.0.1:4200"));
        configuration.setAllowedMethods(List.of("GET", "POST", "DELETE", "PUT", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache_Control", "Content-type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
