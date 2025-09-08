package com.emranhss.hospital.restController;


import com.emranhss.hospital.dto.AdmittedPatientDTO;
import com.emranhss.hospital.entity.AdmittedPatient;
import com.emranhss.hospital.service.AdmittedPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admittedPatient")
public class AdmittedPatientRestController {


    @Autowired
    private AdmittedPatientService admittedPatientService;

    @PostMapping("")
    public ResponseEntity<AdmittedPatient> savePatient(@RequestBody AdmittedPatientDTO dto) {
        AdmittedPatient savedPatient = admittedPatientService.saveAdmittedPatient(dto);
        return ResponseEntity.ok(savedPatient);
    }
}
