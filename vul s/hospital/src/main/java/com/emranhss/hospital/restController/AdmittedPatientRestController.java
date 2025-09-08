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

    // ✅ Admit new patient
    @PostMapping("/admit")
    public AdmittedPatient admitPatient(@RequestBody AdmittedPatientDTO dto) {
        return admittedPatientService.admitPatient(dto);
    }

    // ✅ Add meal
    @PostMapping("/{id}/meals")
    public AdmittedPatient addMeal(@PathVariable Long id, @RequestBody MealDTO mealDTO) {
        return admittedPatientService.addMeal(id, mealDTO);
    }

    // ✅ Add medicine
    @PostMapping("/{id}/medicines")
    public AdmittedPatient addMedicine(@PathVariable Long id, @RequestBody MedicineAdmitedPatientDTO medDTO) {
        return admittedPatientService.addMedicine(id, medDTO);
    }

    // ✅ Add test
    @PostMapping("/{id}/tests")
    public AdmittedPatient addTest(@PathVariable Long id, @RequestBody TestAdmitedPatientDTO testDTO) {
        return admittedPatientService.addTest(id, testDTO);
    }

    // ✅ Add doctor charge
    @PostMapping("/{id}/doctor-charges")
    public AdmittedPatient addDoctorCharge(@PathVariable Long id, @RequestBody DoctorChargeDTO docDTO) {
        return admittedPatientService.addDoctorCharge(id, docDTO);
    }

    // ✅ Add other charge
    @PostMapping("/{id}/other-charges")
    public AdmittedPatient addOtherCharge(@PathVariable Long id, @RequestBody OthersChargeDTO otherDTO) {
        return admittedPatientService.addOtherCharge(id, otherDTO);
    }

    // ✅ Discharge patient
    @PutMapping("/{id}/discharge")
    public AdmittedPatient dischargePatient(@PathVariable Long id, @RequestParam Date dischargeDate) {
        return admittedPatientService.discharge(id, dischargeDate);
    }

    // ✅ Get total bill
    @GetMapping("/{id}/bill")
    public double calculateBill(@PathVariable Long id) {
        return admittedPatientService.calculateTotalBill(id);
    }
}
