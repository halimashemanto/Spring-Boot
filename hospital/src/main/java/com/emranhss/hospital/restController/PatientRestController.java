package com.emranhss.hospital.restController;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Patient;
import com.emranhss.hospital.entity.User;
import com.emranhss.hospital.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/patient/")

public class PatientRestController {
    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerPatient(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "patient") String patientJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        Patient patient = objectMapper.readValue(patientJson, Patient.class);

        try {
            userService.registerPatient(user, file, patient);
            Map<String, String> response = new HashMap<>();
            response.put("Message", "User Added Successfully ");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Message", "User Add Faild " + e);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


}

