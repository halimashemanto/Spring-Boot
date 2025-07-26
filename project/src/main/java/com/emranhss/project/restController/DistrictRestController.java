package com.emranhss.Project.RestController;


import com.emranhss.Project.Entity.District;
import com.emranhss.Project.dto.DistrictResponseDTO;
import com.emranhss.Project.service.DistrictService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dist/")
public class DistrictRestController {

    @Autowired
    private DistrictService districtService;

    @PostMapping("")
    public ResponseEntity<String> saveDistrict(@RequestBody District district) {
        try {
            districtService.save(district);
            return ResponseEntity.ok("data Saved ");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    @GetMapping("")
    public ResponseEntity<List<DistrictResponseDTO>> getDistricts() {

        try {
            List<DistrictResponseDTO> dList = districtService.getAllDistrictDTOs();

            return ResponseEntity.ok(dList);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
