package com.session.demo.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.session.demo.service.UserService;
import com.session.demo.transport.UserLoginRequest;
import com.session.demo.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final UserService userService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        setAuthenticationManager(authenticationManager);
        this.userService = userService;
        setFilterProcessesUrl("/account/login");
        setPostOnly(true);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException {
        try {
            var login = new ObjectMapper()
                    .readValue(httpServletRequest.getInputStream(), UserLoginRequest.class);

            if (login.getIdentity().isBlank() || login.getSecret().isBlank()) {
                throw new BadCredentialsException("Missing login info");
            }

            var authRequest = new UsernamePasswordAuthenticationToken(login.getIdentity(), login.getSecret());
            return getAuthenticationManager().authenticate(authRequest);
        } catch (IOException ex) {
            throw new BadCredentialsException("Couldn't read credentials.");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal();
        var userEntity = userService.getByUsernameOrEmail(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User does not exist."));
        var token = JwtUtil.generateToken(userEntity);
        response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token);
    }
}
