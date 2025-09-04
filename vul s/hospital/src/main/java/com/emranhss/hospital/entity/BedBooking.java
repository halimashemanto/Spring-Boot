package com.emranhss.hospital.entity;


import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "bedBookings")
public class BedBooking {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private Date admissionDate;
    private Date dischargeDate;
    private double totalCharge;

    @ManyToOne
    @JoinColumn(name = "bed_id")
    private Bed bed;

    public BedBooking() {}


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Date getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(Date admissionDate) { this.admissionDate = admissionDate; }

    public Date getDischargeDate() { return dischargeDate; }
    public void setDischargeDate(Date dischargeDate) { this.dischargeDate = dischargeDate; }

    public double getTotalCharge() { return totalCharge; }
    public void setTotalCharge(double totalCharge) { this.totalCharge = totalCharge; }

    public Bed getBed() { return bed; }
    public void setBed(Bed bed) { this.bed = bed; }
}
