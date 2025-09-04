package com.emranhss.hospital.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "Billing")
public class Billing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


}
