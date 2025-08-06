package com.emranhss.hospital.restController;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.User;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.IUserRepo;
import com.emranhss.hospital.service.AuthService;
import com.emranhss.hospital.service.DoctorService;
import com.emranhss.hospital.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctor/")
@CrossOrigin("*")
public class DoctorRestController {


    @Autowired
    private AuthService userService;

    @Autowired
    private IDoctorRepo doctorRepository;

    @Autowired
    private IUserRepo userRepo;

    @Autowired
    private DoctorService doctorService;

    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerDoctor(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "doctor") String doctorJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        Doctor doctor = objectMapper.readValue(doctorJson, Doctor.class);

        try {
            userService.registerDoctor(user, file, doctor);
            Map<String, String> response = new HashMap<>();
            response.put("Message", "User Added Successfully ");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Message", "User Add Faild " + e);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


    @GetMapping("all")
    public ResponseEntity<List<Doctor>> getAllUsers() {
        List<Doctor> doctorList = doctorService.getAll();
        return ResponseEntity.ok(doctorList);

    }


    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        System.out.println("Authenticated User: " + authentication.getName());
        System.out.println("Authorities: " + authentication.getAuthorities());
        String email = authentication.getName();
        Optional<User> user =userRepo.findByEmail(email);
        Doctor doctor = doctorService.getProfileByUserId(user.get().getId());
        return ResponseEntity.ok(doctor);

    }





}
