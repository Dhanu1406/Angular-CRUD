package net.javaguides.springboot.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.Service.LoginService;
import net.javaguides.springboot.model.Login;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v2/")
public class LoginController {
	
	@Autowired
	private LoginService loginService;

	

	@PostMapping("/login")
	   public ResponseEntity<Map<String, String>> authenticate(@RequestBody Login login) {
        boolean isAuthenticated = loginService.login(login);
        
        Map<String, String> response = new HashMap<>();
        if (isAuthenticated) {
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid username or password");
            return ResponseEntity.ok(response);
        }
    }
}
