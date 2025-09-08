package com.emranhss.hospital.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "testAdmitedPatient")
public class TestAdmitedPatient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String testName;
    private double testPrice;
    private double testCost;

    @ManyToOne
    @JoinColumn(name = "admitted_patient_id")
    private AdmittedPatient admittedPatient;

    public TestAdmitedPatient() {
    }

    public TestAdmitedPatient(Long id, String testName, double testPrice, double testCost, AdmittedPatient admittedPatient) {
        this.id = id;
        this.testName = testName;
        this.testPrice = testPrice;
        this.testCost = testCost;
        this.admittedPatient = admittedPatient;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public double getTestPrice() {
        return testPrice;
    }

    public void setTestPrice(double testPrice) {
        this.testPrice = testPrice;
    }

    public double getTestCost() {
        return testCost;
    }

    public void setTestCost(double testCost) {
        this.testCost = testCost;
    }

    public AdmittedPatient getAdmittedPatient() {
        return admittedPatient;
    }

    public void setAdmittedPatient(AdmittedPatient admittedPatient) {
        this.admittedPatient = admittedPatient;
    }
}
