package com.emranhss.hospital.restController;


import com.emranhss.hospital.dto.PrescriptionDTO;
import com.emranhss.hospital.entity.Prescription;
import com.emranhss.hospital.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionRestController {

    @Autowired
    private PrescriptionService prescriptionService;

    // Create or Update
    @PostMapping
    public Prescription createOrUpdate(@RequestBody PrescriptionDTO dto){
        return prescriptionService.createOrUpdatePrescription(dto);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) throws Exception {
        prescriptionService.deletePrescription(id);
        return "Deleted successfully";
    }

    // GET All
    @GetMapping
    public List<PrescriptionDTO> getAll() {
        return prescriptionService.getAllPrescriptionsDTO();
    }

    // GET by ID
    @GetMapping("/{id}")
    public PrescriptionDTO getById(@PathVariable Long id) throws Exception {
        return prescriptionService.getPrescriptionDTOById(id);
    }
}