package tech.getarrays.employeemanager.resource;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager.dto.LoginRequest;
import tech.getarrays.employeemanager.dto.LoginResponse;
import tech.getarrays.employeemanager.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthResource {
    private final AuthService authService;

    public AuthResource(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        String authHeader = authService.authenticate(request);

        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", authHeader);

        LoginResponse response = new LoginResponse(("Admin has successfully logged in."));

        return ResponseEntity.ok().headers(headers).body(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<LoginResponse> logout(){
        LoginResponse response = new LoginResponse("Admin has successfully logged out.");
        return ResponseEntity.ok(response);
    }
}
