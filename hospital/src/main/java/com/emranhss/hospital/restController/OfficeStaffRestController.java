package com.emranhss.hospital.restController;

import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Nurse;
import com.emranhss.hospital.entity.OfficeStaff;
import com.emranhss.hospital.entity.User;
import com.emranhss.hospital.repository.INurseRepo;
import com.emranhss.hospital.repository.IOfficeStaffRepo;
import com.emranhss.hospital.repository.IUserRepo;
import com.emranhss.hospital.service.NurseService;
import com.emranhss.hospital.service.OfficeStaffService;
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
@RequestMapping("/api/officeStaff/")
@CrossOrigin("*")
public class OfficeStaffRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private IOfficeStaffRepo officeStaffRepository;

    @Autowired
    private IUserRepo userRepo;

    @Autowired
    private OfficeStaffService officeStaffService;

    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerOfficeStaff(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "officeStaff") String officeStaffJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        OfficeStaff officeStaff = objectMapper.readValue(officeStaffJson, OfficeStaff.class);

        try {
            userService.registerOfficeStaff(user, file, officeStaff);
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
    public ResponseEntity<List<OfficeStaff>> getAllUsers() {
        List<OfficeStaff> nurseList = officeStaffService.getAll();
        return ResponseEntity.ok(nurseList);

    }


    @GetMapping("profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        System.out.println("Authenticated User: " + authentication.getName());
        System.out.println("Authorities: " + authentication.getAuthorities());
        String email = authentication.getName();
        Optional<User> user =userRepo.findByEmail(email);
        OfficeStaff officeStaff = officeStaffService.getProfileByUserId(user.get().getId());
        return ResponseEntity.ok(officeStaff);

    }





}
