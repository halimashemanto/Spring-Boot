package com.emranhss.hospital.restController;


import com.emranhss.hospital.dto.*;
import com.emranhss.hospital.entity.AdmittedPatient;
import com.emranhss.hospital.service.AdmittedPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/admittedPatient")
public class AdmittedPatientRestController {


    @Autowired
    private AdmittedPatientService admittedPatientService;


}
