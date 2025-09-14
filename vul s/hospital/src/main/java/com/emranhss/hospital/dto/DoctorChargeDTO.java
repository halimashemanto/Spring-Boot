package com.emranhss.hospital.dto;

public class DoctorChargeDTO {


    private Long id;
    private String description;
    private double amount;
    private Long doctorId;
    private Long bedBookingId;

    public DoctorChargeDTO() {}

    public DoctorChargeDTO(Long id, String description, double amount, Long doctorId, Long bedBookingId) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.doctorId = doctorId;
        this.bedBookingId = bedBookingId;
    }

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public Long getBedBookingId() { return bedBookingId; }
    public void setBedBookingId(Long bedBookingId) { this.bedBookingId = bedBookingId; }
}


