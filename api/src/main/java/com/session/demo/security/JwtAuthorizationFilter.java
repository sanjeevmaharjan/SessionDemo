package com.session.demo.security;

import com.nimbusds.jose.JWSObject;
import com.session.demo.util.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;

public class JwtAuthorizationFilter extends OncePerRequestFilter {
    private static final String TOKEN_PREFIX = "Bearer ";
    private final UserDetailsService userDetailsService;

    public JwtAuthorizationFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String header = httpServletRequest.getHeader("Authorization");

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            throw new BadCredentialsException("Headers have no token");
        }

        String authToken = header.substring(TOKEN_PREFIX.length());
        var jwt = JwtUtil.parseToken(authToken);

        if (jwt == null || jwt.getState() != JWSObject.State.VERIFIED) {
            throw new BadCredentialsException("Token is invalid");
        }

        try {
            String username = jwt.getJWTClaimsSet().getSubject();

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails user = userDetailsService.loadUserByUsername(username);

                var authentication = new UsernamePasswordAuthenticationToken(user, authToken, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
