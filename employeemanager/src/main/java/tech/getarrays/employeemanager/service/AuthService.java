package tech.getarrays.employeemanager.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager.dto.LoginRequest;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class AuthService {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder){
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    public String authenticate(LoginRequest request){
        UserDetails user = userDetailsService.loadUserByUsername(request.getUsername());

        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            String raw = request.getUsername() + ":" + request.getPassword();
            return "Basic " + Base64.getEncoder().encodeToString(raw.getBytes(StandardCharsets.UTF_8));
        }

        throw new RuntimeException("Invalid Credentials.");
    }




//    public LoginResponse authenticate(String authHeader){
//        if(authHeader == null || !authHeader.startsWith("Basic ")){
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
//        }
//        String base64Credentials = authHeader.substring("Basic ".length());
//        byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
//        String credentials = new String(decodedBytes, StandardCharsets.UTF_8);
//
//        String[] values = credentials.split(":", 2);
//        String username = values[0];
//        String password = values[1];
//
//        if("admin".equals(username) && "admin123".equals(password)){
//            return new LoginResponse("Admin has successfully logged in ", authHeader);
//        } else {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials.");
//        }
//    }
}
