package com.emranhss.hospital.dto;

import java.util.Date;

public class BedBookingDTO {

    private Long bedId;
    private String patientName;
    private Date admissionDate;
    private Date dischargeDate;
    private double totalCharge;

    public BedBookingDTO() {}

    public Long getBedId() { return bedId; }
    public void setBedId(Long bedId) { this.bedId = bedId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Date getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(Date admissionDate) { this.admissionDate = admissionDate; }

    public Date getDischargeDate() { return dischargeDate; }
    public void setDischargeDate(Date dischargeDate) { this.dischargeDate = dischargeDate; }

    public double getTotalCharge() { return totalCharge; }
    public void setTotalCharge(double totalCharge) { this.totalCharge = totalCharge; }
}
