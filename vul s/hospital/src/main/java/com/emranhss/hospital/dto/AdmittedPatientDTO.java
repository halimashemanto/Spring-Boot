package com.emranhss.hospital.dto;

import java.util.Date;
import java.util.List;

public class AdmittedPatientDTO {


    private Long id;
    private Date admissionDate;
    private Date dischargeDate;
    private String wardNo;
    private String bedNo;
    private String status;
    private String treatmentPlan;
    private double wardChargePerDay;

    private Long patientId;
    private Long doctorId;
    private Long departmentId;
    private Long wardId;
    private Long bedId;

    private BillingDTO bill;

    private List<MealDTO> meals;
    private List<MedicineAdmitedPatientDTO> medicines;
    private List<TestAdmitedPatientDTO> tests;
    private List<DoctorChargeDTO> doctorCharges;
    private List<OthersChargeDTO> otherCharges;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(Date admissionDate) {
        this.admissionDate = admissionDate;
    }

    public Date getDischargeDate() {
        return dischargeDate;
    }

    public void setDischargeDate(Date dischargeDate) {
        this.dischargeDate = dischargeDate;
    }

    public String getWardNo() {
        return wardNo;
    }

    public void setWardNo(String wardNo) {
        this.wardNo = wardNo;
    }

    public String getBedNo() {
        return bedNo;
    }

    public void setBedNo(String bedNo) {
        this.bedNo = bedNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
    }

    public double getWardChargePerDay() {
        return wardChargePerDay;
    }

    public void setWardChargePerDay(double wardChargePerDay) {
        this.wardChargePerDay = wardChargePerDay;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getWardId() {
        return wardId;
    }

    public void setWardId(Long wardId) {
        this.wardId = wardId;
    }

    public Long getBedId() {
        return bedId;
    }

    public void setBedId(Long bedId) {
        this.bedId = bedId;
    }

    public BillingDTO getBill() {
        return bill;
    }

    public void setBill(BillingDTO bill) {
        this.bill = bill;
    }

    public List<MealDTO> getMeals() {
        return meals;
    }

    public void setMeals(List<MealDTO> meals) {
        this.meals = meals;
    }

    public List<MedicineAdmitedPatientDTO> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<MedicineAdmitedPatientDTO> medicines) {
        this.medicines = medicines;
    }

    public List<TestAdmitedPatientDTO> getTests() {
        return tests;
    }

    public void setTests(List<TestAdmitedPatientDTO> tests) {
        this.tests = tests;
    }

    public List<DoctorChargeDTO> getDoctorCharges() {
        return doctorCharges;
    }

    public void setDoctorCharges(List<DoctorChargeDTO> doctorCharges) {
        this.doctorCharges = doctorCharges;
    }

    public List<OthersChargeDTO> getOtherCharges() {
        return otherCharges;
    }

    public void setOtherCharges(List<OthersChargeDTO> otherCharges) {
        this.otherCharges = otherCharges;
    }
}
