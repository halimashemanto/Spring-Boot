package com.emranhss.hospital.service;


import com.emranhss.hospital.dto.*;
import com.emranhss.hospital.entity.*;
import com.emranhss.hospital.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdmittedPatientService {


    @Autowired
    private IAdmittedPatientRepo admittedPatientRepository;

    @Autowired
    private IPatientRepo patientRepository;

    @Autowired
    private IDoctorRepo doctorRepository;

    @Autowired
    private IDepartmentRepository departmentRepository;

    @Autowired
    private IWordRepo wardRepository;

    @Autowired
    private IBedRepo bedRepository;

    public AdmittedPatient saveAdmittedPatient(AdmittedPatientDTO dto) {

        AdmittedPatient admittedPatient = new AdmittedPatient();

        admittedPatient.setAdmissionDate(dto.getAdmissionDate());
        admittedPatient.setDischargeDate(dto.getDischargeDate());
        admittedPatient.setWardNo(dto.getWardNo());
        admittedPatient.setBedNo(dto.getBedNo());
        admittedPatient.setStatus(dto.getStatus());
        admittedPatient.setTreatmentPlan(dto.getTreatmentPlan());
        admittedPatient.setWardChargePerDay(dto.getWardChargePerDay());


        patientRepository.findById(dto.getPatientId())
                .ifPresent(admittedPatient::setPatient);


        doctorRepository.findById(dto.getDoctorId())
                .ifPresent(admittedPatient::setDoctor);


        departmentRepository.findById(dto.getDepartmentId())
                .ifPresent(admittedPatient::setDepartment);


        wardRepository.findById(dto.getWardId())
                .ifPresent(admittedPatient::setWard);


        bedRepository.findById(dto.getBedId())
                .ifPresent(admittedPatient::setBed);


        Billing billing = new Billing();
        if (dto.getBill() != null) {
            billing.setWardCost(dto.getBill().getWardCost());
            billing.setMealCost(dto.getBill().getMealCost());
            billing.setMedicineCost(dto.getBill().getMedicineCost());
            billing.setTestCost(dto.getBill().getTestCost());
            billing.setDoctorCharge(dto.getBill().getDoctorCharge());
            billing.setOtherCharge(dto.getBill().getOtherCharge());
            billing.setTotalCost(dto.getBill().getTotalCost());
        }
        admittedPatient.setBill(billing);

        // Meals
        if (dto.getMeals() != null) {
            List<Meal> meals = new ArrayList<>();
            for (MealDTO mealDTO : dto.getMeals()) {
                Meal meal = new Meal();

                meal.setMealCost(mealDTO.getMealCost());
                meal.setAdmittedPatient(admittedPatient); // parent set
                meals.add(meal);
            }
            admittedPatient.setMeals(meals);
        }


        // Medicines
        if (dto.getMedicines() != null) {
            List<MedicineAdmitedPatient> medicines = new ArrayList<>();
            for (MedicineAdmitedPatientDTO medDTO : dto.getMedicines()) {
                MedicineAdmitedPatient med = new MedicineAdmitedPatient();
                med.setMedicineName(medDTO.getMedicineName());
                med.setQuantity(medDTO.getQuantity());
                med.setMedicineCost(medDTO.getMedicineCost());
                med.setAdmittedPatient(admittedPatient);
                medicines.add(med);
            }
            admittedPatient.setMedicines(medicines);
        }

        // Tests
        if (dto.getTests() != null) {
            List<TestAdmitedPatient> tests = new ArrayList<>();
            for (TestAdmitedPatientDTO testDTO : dto.getTests()) {
                TestAdmitedPatient test = new TestAdmitedPatient();
                test.setTestName(testDTO.getTestName());
                test.setTestCost(testDTO.getTestCost());
                test.setAdmittedPatient(admittedPatient);
                tests.add(test);
            }
            admittedPatient.setTests(tests);
        }

        // Doctor Charges
        if (dto.getDoctorCharges() != null) {
            List<DoctorCharge> doctorCharges = new ArrayList<>();
            for (DoctorChargeDTO docDTO : dto.getDoctorCharges()) {
                DoctorCharge docCharge = new DoctorCharge();
                docCharge.setDescription(docDTO.getDescription());
                docCharge.setAmount(docDTO.getAmount());
                docCharge.setAdmittedPatient(admittedPatient);
                doctorCharges.add(docCharge);
            }
            admittedPatient.setDoctorCharges(doctorCharges);
        }

        // Others Charges
        if (dto.getOtherCharges() != null) {
            List<OthersCharge> otherCharges = new ArrayList<>();
            for (OthersChargeDTO otherDTO : dto.getOtherCharges()) {
                OthersCharge otherCharge = new OthersCharge();
                otherCharge.setDescription(otherDTO.getDescription());
                otherCharge.setAmount(otherDTO.getAmount());
                otherCharge.setAdmittedPatient(admittedPatient);
                otherCharges.add(otherCharge);
            }
            admittedPatient.setOtherCharges(otherCharges);
        }

        return admittedPatientRepository.save(admittedPatient);
    }
}
