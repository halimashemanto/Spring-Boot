package com.emranhss.hospital.dto;

public class OthersChargeDTO {

    private Long id;
    private String description;
    private double amount;
    private Long bedBookingId;


    public OthersChargeDTO() {}

    public OthersChargeDTO(Long id, String description, double amount, Long bedBookingId) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.bedBookingId = bedBookingId;

    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public Long getBedBookingId() { return bedBookingId; }
    public void setBedBookingId(Long bedBookingId) { this.bedBookingId = bedBookingId; }


}