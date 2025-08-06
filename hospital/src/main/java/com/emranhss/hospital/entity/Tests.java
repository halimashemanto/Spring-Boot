package com.emranhss.hospital.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tests")
public class Tests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String testName;
    private String testPrice;

    public Tests() {
    }

    public Tests(long id, String testPrice, String testName) {
        this.id = id;
        this.testPrice = testPrice;
        this.testName = testName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTestPrice() {
        return testPrice;
    }

    public void setTestPrice(String testPrice) {
        this.testPrice = testPrice;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }
}
