package com.emranhss.hospital.dto;

public class BillingDTO {


    private long id;
    private double wardCost;

    private double mealCost;
    private double medicineCost;
    private double testCost;
    private double doctorCharge;
    private double otherCharge;
    private double totalCost;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getWardCost() {
        return wardCost;
    }

    public void setWardCost(double wardCost) {
        this.wardCost = wardCost;
    }

    public double getMealCost() {
        return mealCost;
    }

    public void setMealCost(double mealCost) {
        this.mealCost = mealCost;
    }

    public double getMedicineCost() {
        return medicineCost;
    }

    public void setMedicineCost(double medicineCost) {
        this.medicineCost = medicineCost;
    }

    public double getTestCost() {
        return testCost;
    }

    public void setTestCost(double testCost) {
        this.testCost = testCost;
    }

    public double getDoctorCharge() {
        return doctorCharge;
    }

    public void setDoctorCharge(double doctorCharge) {
        this.doctorCharge = doctorCharge;
    }

    public double getOtherCharge() {
        return otherCharge;
    }

    public void setOtherCharge(double otherCharge) {
        this.otherCharge = otherCharge;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }
}
