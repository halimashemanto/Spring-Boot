package com.emranhss.hospital.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "meals")

public class Meal {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String mealType;
        private double mealCost;
        private Date servedAt;

        @ManyToOne
        @JoinColumn(name = "admitted_patient_id")
        private AdmittedPatient admittedPatient;

        public Meal() {}

    public Meal(AdmittedPatient admittedPatient, Date servedAt, double mealCost, String mealType, Long id) {
        this.admittedPatient = admittedPatient;
        this.servedAt = servedAt;
        this.mealCost = mealCost;
        this.mealType = mealType;
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public double getMealCost() {
        return mealCost;
    }

    public void setMealCost(double mealCost) {
        this.mealCost = mealCost;
    }

    public Date getServedAt() {
        return servedAt;
    }

    public void setServedAt(Date servedAt) {
        this.servedAt = servedAt;
    }

    public AdmittedPatient getAdmittedPatient() {
        return admittedPatient;
    }

    public void setAdmittedPatient(AdmittedPatient admittedPatient) {
        this.admittedPatient = admittedPatient;
    }
}

