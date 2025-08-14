package com.emranhss.hospital.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String note;
    private String  advice;
    private String height;
    private String weight;
    private String bp;
    private Date date;

    @JoinColumn(name = "medicine_id",nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Medicine medicine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false)
    private Tests test;

    @JoinColumn(name = "doctor_id",nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Doctor doctor;

    public Prescription() {
    }

    public Prescription(Long id, Doctor doctor, Tests test, Date date, String weight, String note, String advice, String height, String bp, Medicine medicine) {
        this.id = id;
        this.doctor = doctor;
        this.test = test;
        this.date = date;
        this.weight = weight;
        this.note = note;
        this.advice = advice;
        this.height = height;
        this.bp = bp;
        this.medicine = medicine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getBp() {
        return bp;
    }

    public void setBp(String bp) {
        this.bp = bp;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Tests getTest() {
        return test;
    }

    public void setTest(Tests test) {
        this.test = test;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
}
