package com.emranhss.hospital.dto;

import java.util.Date;
import java.util.List;

public class PrescriptionDTO {


    private Long id;
    private String note;
    private String advice;
    private String height;
    private String weight;
    private String bp;
    private Date date;
    private String applyWay;

    private Long doctorId;
    private Long appoinmentId;
    private List<Long> medicineIds;
    private List<Long> testIds;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
    public String getAdvice() { return advice; }
    public void setAdvice(String advice) { this.advice = advice; }
    public String getHeight() { return height; }
    public void setHeight(String height) { this.height = height; }
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getBp() { return bp; }
    public void setBp(String bp) { this.bp = bp; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public String getApplyWay() { return applyWay; }
    public void setApplyWay(String applyWay) { this.applyWay = applyWay; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public Long getAppoinmentId() { return appoinmentId; }
    public void setAppoinmentId(Long appoinmentId) { this.appoinmentId = appoinmentId; }
    public List<Long> getMedicineIds() { return medicineIds; }
    public void setMedicineIds(List<Long> medicineIds) { this.medicineIds = medicineIds; }
    public List<Long> getTestIds() { return testIds; }
    public void setTestIds(List<Long> testIds) { this.testIds = testIds; }
}