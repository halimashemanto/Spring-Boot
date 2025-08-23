package com.emranhss.hospital.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private Double discount;
    private Date invoiceDate;
    private Date deliveryDate;
    private Integer deliveryTime;
    private Double totalAmount;
    private Double totalDiscount;
    private Double payable;
    private Double received;
    private Double due;
    private Boolean status;
    private String preparedBy;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnore
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appoinment_id", nullable = false)
    @JsonIgnore
    private Appoinment appoinment;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "invoice_id")
    private List<Tests> tests;


    public void calculateTotal() {

        this.amount = (tests != null) ? tests.stream()
                .mapToDouble(t -> t.getTestPrice() != null ? t.getTestPrice() : 0.0)
                .sum() : 0.0;

        this.totalDiscount = (this.discount != null) ? this.discount : 0.0;
        this.totalAmount = this.amount - this.totalDiscount;
        this.payable = this.totalAmount;
        double receivedAmount = (this.received != null) ? this.received : 0.0;
        this.due = this.payable - receivedAmount;
        this.status = this.due <= 0;
    }

    public Invoice() {
    }

    public Invoice(Long id, Double amount, Double discount, Date invoiceDate, Date deliveryDate, Integer deliveryTime, Double totalAmount, Double totalDiscount, Double payable, Double received, Double due, Boolean status, String preparedBy, Appoinment appoinment, Doctor doctor, List<Tests> tests) {
        this.id = id;
        this.amount = amount;
        this.discount = discount;
        this.invoiceDate = invoiceDate;
        this.deliveryDate = deliveryDate;
        this.deliveryTime = deliveryTime;
        this.totalAmount = totalAmount;
        this.totalDiscount = totalDiscount;
        this.payable = payable;
        this.received = received;
        this.due = due;
        this.status = status;
        this.preparedBy = preparedBy;
        this.appoinment = appoinment;
        this.doctor = doctor;
        this.tests = tests;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Integer getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Double getTotalDiscount() {
        return totalDiscount;
    }

    public void setTotalDiscount(Double totalDiscount) {
        this.totalDiscount = totalDiscount;
    }

    public Double getPayable() {
        return payable;
    }

    public void setPayable(Double payable) {
        this.payable = payable;
    }

    public Double getReceived() {
        return received;
    }

    public void setReceived(Double received) {
        this.received = received;
    }

    public Double getDue() {
        return due;
    }

    public void setDue(Double due) {
        this.due = due;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getPreparedBy() {
        return preparedBy;
    }

    public void setPreparedBy(String preparedBy) {
        this.preparedBy = preparedBy;
    }

    public Appoinment getAppoinment() {
        return appoinment;
    }

    public void setAppoinment(Appoinment appoinment) {
        this.appoinment = appoinment;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctorId) {
        this.doctor= doctorId;
    }

    public List<Tests> getTests() {
        return tests;
    }

    public void setTests(List<Tests> tests) {
        this.tests = tests;
    }
}
