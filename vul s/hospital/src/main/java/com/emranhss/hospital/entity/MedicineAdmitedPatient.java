package com.emranhss.hospital.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "medicineAdmitedPatient")
public class MedicineAdmitedPatient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String medicineName;
    private String applyWay;
    private int quantity;
    private double medicineCost;

    @ManyToOne
    @JoinColumn(name = "admitted_patient_id")
    private AdmittedPatient admittedPatient;

    public MedicineAdmitedPatient() {}

    public MedicineAdmitedPatient(Long id, String medicineName, String applyWay, int quantity, double medicineCost, AdmittedPatient admittedPatient) {
        this.id = id;
        this.medicineName = medicineName;
        this.applyWay = applyWay;
        this.quantity = quantity;
        this.medicineCost = medicineCost;
        this.admittedPatient = admittedPatient;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getApplyWay() {
        return applyWay;
    }

    public void setApplyWay(String applyWay) {
        this.applyWay = applyWay;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getMedicineCost() {
        return medicineCost;
    }

    public void setMedicineCost(double medicineCost) {
        this.medicineCost = medicineCost;
    }

    public AdmittedPatient getAdmittedPatient() {
        return admittedPatient;
    }

    public void setAdmittedPatient(AdmittedPatient admittedPatient) {
        this.admittedPatient = admittedPatient;
    }
}
