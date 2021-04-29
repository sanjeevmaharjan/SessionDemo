package com.session.demo.config;

import com.session.demo.security.JwtAuthenticationFilter;
import com.session.demo.security.JwtAuthorizationFilter;
import com.session.demo.service.UserService;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserService userService;

    public WebSecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return usernameOrEmail -> {
            var userEntity = userService.getByUsernameOrEmail(usernameOrEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User " + usernameOrEmail + " is not available"));
            return new User(userEntity.getUsername(), userEntity.getPassword(), new ArrayList<>());
        };
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.POST, "/account/create");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .formLogin().disable()
                .csrf().disable();

        http.cors(Customizer.withDefaults());

        http.authorizeRequests()
                .antMatchers(
                        HttpMethod.GET,
                        "/swagger-ui/**",
                        "/v2/api-docs/**",
                        "/swagger-resources/**",
                        "favicon.ico"
                ).permitAll()
                .anyRequest().authenticated();

        http.addFilter(new JwtAuthenticationFilter(authenticationManager(), userService))
                .addFilterAfter(new JwtAuthorizationFilter(userDetailsService()), JwtAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}
