package com.emranhss.hospital.service;


import com.emranhss.hospital.dto.*;
import com.emranhss.hospital.entity.*;
import com.emranhss.hospital.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;
import java.util.Date;


@Service
public class AdmittedPatientService {


    @Autowired
    private IAdmittedPatientRepo admittedPatientRepository;

    @Autowired
    private IBedBookingRepo bedBookingRepository;

    @Autowired
    private IDoctorRepo doctorRepository;

    @Autowired
    private IDepartmentRepository departmentRepository;

    @Autowired
    private IWordRepo wardRepository;

    @Autowired
    private IBedRepo bedRepository;

    public AdmittedPatientService(IAdmittedPatientRepo admittedPatientRepository,
                                  IBedBookingRepo bedBookingRepository,
                                  IDoctorRepo doctorRepository,
                                  IDepartmentRepository departmentRepository,
                                  IWordRepo wardRepository,
                                  IBedRepo bedRepository) {
        this.admittedPatientRepository = admittedPatientRepository;
        this.bedBookingRepository = bedBookingRepository;
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
        this.wardRepository = wardRepository;
        this.bedRepository = bedRepository;
    }

    // ✅ Admit patient
    public AdmittedPatient admitPatient(AdmittedPatientDTO dto) {
        AdmittedPatient admittedPatient = new AdmittedPatient();

        admittedPatient.setAdmissionDate(dto.getAdmissionDate());
        admittedPatient.setDischargeDate(dto.getDischargeDate());
        admittedPatient.setStatus(dto.getStatus());
        admittedPatient.setTreatmentPlan(dto.getTreatmentPlan());


        // Relations
        admittedPatient.setBedBooking(bedBookingRepository.findById(dto.getBedBookingId())
                .orElseThrow(() -> new RuntimeException("Patient not found")));
        admittedPatient.setDoctor(doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found")));
        admittedPatient.setDepartment(departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found")));

        wardRepository.findById(dto.getWardId()).ifPresent(admittedPatient::setWard);
        bedRepository.findById(dto.getBedId()).ifPresent(admittedPatient::setBed);

        return admittedPatientRepository.save(admittedPatient);
    }

    // ✅ Add meal
    public AdmittedPatient addMeal(Long admittedPatientId, MealDTO mealDTO) {
        AdmittedPatient patient = getPatientById(admittedPatientId);
        Meal meal = new Meal();
        meal.setMealCost(mealDTO.getMealCost());
        meal.setAdmittedPatient(patient);
        patient.getMeals().add(meal);
        return admittedPatientRepository.save(patient);
    }

    // ✅ Add medicine
    public AdmittedPatient addMedicine(Long admittedPatientId, MedicineAdmitedPatientDTO medDTO) {
        AdmittedPatient patient = getPatientById(admittedPatientId);
        MedicineAdmitedPatient med = new MedicineAdmitedPatient();
        med.setMedicineName(medDTO.getMedicineName());
        med.setQuantity(medDTO.getQuantity());
        med.setMedicineCost(medDTO.getMedicineCost());
        med.setAdmittedPatient(patient);
        patient.getMedicines().add(med);
        return admittedPatientRepository.save(patient);
    }


    // ✅ Add doctor charge
    public AdmittedPatient addDoctorCharge(Long admittedPatientId, DoctorChargeDTO docDTO) {
        AdmittedPatient patient = getPatientById(admittedPatientId);
        DoctorCharge charge = new DoctorCharge();
        charge.setDescription(docDTO.getDescription());
        charge.setAmount(docDTO.getAmount());
        patient.getDoctorCharges().add(charge);
        return admittedPatientRepository.save(patient);
    }

    // ✅ Add other charge
    public AdmittedPatient addOtherCharge(Long admittedPatientId, OthersChargeDTO otherDTO) {
        AdmittedPatient patient = getPatientById(admittedPatientId);
        OthersCharge charge = new OthersCharge();
        charge.setDescription(otherDTO.getDescription());
        charge.setAmount(otherDTO.getAmount());
        charge.setAdmittedPatient(patient);
        patient.getOtherCharges().add(charge);
        return admittedPatientRepository.save(patient);
    }

    // ✅ Discharge patient
    public AdmittedPatient discharge(Long admittedPatientId, Date dischargeDate) {
        AdmittedPatient patient = getPatientById(admittedPatientId);
        patient.setDischargeDate(dischargeDate);
        patient.setStatus("DISCHARGED");
        return admittedPatientRepository.save(patient);
    }

    public double calculateTotalBill(Long admittedPatientId) {
        AdmittedPatient patient = getPatientById(admittedPatientId);

        double mealCost = patient.getMeals().stream().mapToDouble(Meal::getMealCost).sum();
        double medicineCost = patient.getMedicines().stream().mapToDouble(MedicineAdmitedPatient::getMedicineCost).sum();
        double testCost = patient.getTests().stream().mapToDouble(TestAdmitedPatient::getTestCost).sum();
        double doctorCost = patient.getDoctorCharges().stream().mapToDouble(DoctorCharge::getAmount).sum();
        double otherCost = patient.getOtherCharges().stream().mapToDouble(OthersCharge::getAmount).sum();

        Date admissionDate = patient.getAdmissionDate();
        Date dischargeDate = (patient.getDischargeDate() != null) ? patient.getDischargeDate() : new Date();

        long diffInMillis = dischargeDate.getTime() - admissionDate.getTime();
        long days = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);

        if (days <= 0) {
            days = 1;
        }



        return mealCost + medicineCost + testCost + doctorCost + otherCost ;
    }
    // ✅ Get patient by ID helper
    private AdmittedPatient getPatientById(Long id) {
        return admittedPatientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admitted patient not found with id " + id));
    }
}
