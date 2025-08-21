package com.emranhss.hospital.restController;


import com.emranhss.hospital.dto.PrescriptionDTO;
import com.emranhss.hospital.entity.Medicine;
import com.emranhss.hospital.entity.Prescription;
import com.emranhss.hospital.entity.Tests;
import com.emranhss.hospital.service.MedicineService;
import com.emranhss.hospital.service.PrescriptionService;
import com.emranhss.hospital.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionRestController {
    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private TestService testsService;




//    @GetMapping
//    public List<Prescription> getAllPrescriptions() {
//        return prescriptionService.getAllPrescriptions();
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        return prescriptionService.getPrescriptionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @PostMapping
//    public ResponseEntity<Prescription> createPrescription(@RequestBody PrescriptionDTO request) {
//
//        Prescription prescription = new Prescription();
//        prescription.setNote(request.getNote());
//        prescription.setAdvice(request.getAdvice());
//        prescription.setHeight(request.getHeight());
//        prescription.setWeight(request.getWeight());
//        prescription.setBp(request.getBp());
//        prescription.setDate(request.getDate());
//
//        Prescription saved = prescriptionService.savePrescription(
//                prescription,
//                request.getMedicineIds(),
//                request.getTestIds(),
//                request.getDoctorId()
//        );
//
//        return ResponseEntity.ok(saved);
//    }


    @PostMapping
    public ResponseEntity<Prescription> createPrescription(@RequestBody PrescriptionDTO request) {

        Prescription prescription = new Prescription();
        prescription.setNote(request.getNote());
        prescription.setAdvice(request.getAdvice());
        prescription.setHeight(request.getHeight());
        prescription.setWeight(request.getWeight());
        prescription.setBp(request.getBp());
        prescription.setDate(request.getDate());

        Prescription saved = prescriptionService.savePrescription(
                prescription,
                request.getMedicineIds(),
                request.getTestIds(),
                request.getDoctorId(),
                request.getAppoinmentId()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.noContent().build();
    }
}

