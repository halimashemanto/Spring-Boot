package com.emranhss.hospital.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "admittedPatients")
public class AdmittedPatient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Date admissionDate;
    private Date dischargeDate;
    private String wardNo;
    private String bedNo;
    private String status;
    private String treatmentPlan;


    @ManyToOne
    @JoinColumn(name = "patient_id")
    private EmergencyPatient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bill_id")
    private Billing bill;


    public AdmittedPatient() {
    }

    public AdmittedPatient(Long id, Date admissionDate, Date dischargeDate, String wardNo, String bedNo, String status, String treatmentPlan, EmergencyPatient patient, Doctor doctor, Department department, Billing bill) {
        this.id = id;
        this.admissionDate = admissionDate;
        this.dischargeDate = dischargeDate;
        this.wardNo = wardNo;
        this.bedNo = bedNo;
        this.status = status;
        this.treatmentPlan = treatmentPlan;
        this.patient = patient;
        this.doctor = doctor;
        this.department = department;
        this.bill = bill;
    }

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

    public EmergencyPatient getPatient() {
        return patient;
    }

    public void setPatient(EmergencyPatient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Billing getBill() {
        return bill;
    }

    public void setBill(Billing bill) {
        this.bill = bill;
    }
}
