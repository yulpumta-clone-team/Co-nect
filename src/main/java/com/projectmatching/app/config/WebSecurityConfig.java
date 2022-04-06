package com.projectmatching.app.config;

import com.projectmatching.app.config.handler.OAuth2AuthenticationSuccessHandler;
import com.projectmatching.app.service.user.OAuthService;
import com.projectmatching.app.util.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final OAuthService oAuthService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final JwtAuthFilter jwtAuthFilter;

    @Override
    protected void configure(HttpSecurity http)throws Exception {
        http.csrf().ignoringAntMatchers("/h2-console/**")
                .disable();
        http.httpBasic().disable();
        http.csrf().disable().
                cors().configurationSource(corsConfigurationSource())
                .and()
                    .formLogin().disable()
                    .authorizeRequests()
                    .antMatchers("/h2-console/**").permitAll()
                    .antMatchers("/user/login").permitAll()
                    .antMatchers("/user/join/**").permitAll()
                    .antMatchers(
                        "/swagger*/**",
                        "/webjars/**",
                        "/v2/api-docs").permitAll()
                    .anyRequest().authenticated()
                .and()
                .headers()
                .frameOptions().sameOrigin() // h2 console을 위해
                .and()
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //토큰 사용하므로 세션 사용 x
                .and()
                .logout()
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                    .userInfoEndpoint()
                        .userService(oAuthService)
                        .and()
                .successHandler(oAuth2AuthenticationSuccessHandler);


    }

    //패스워드 인코더 설정
    @Bean
    public PasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    //cors 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/v2/api-docs",
                "/swagger-resources/configuration/ui",
                "/swagger-resources",
                "/swagger-resources/configuration/security",
                "/swagger-ui/**",
                "/webjars/**");
    }

}
