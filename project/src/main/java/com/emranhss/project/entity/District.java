package com.emranhss.Project.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="districts")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(length = 50, nullable = false)
    private String distName;

    @JsonIgnore
    @OneToMany(mappedBy = "district",cascade= CascadeType.ALL)
    private List<PoliceStation> policeStations;

    public District() {
    }

    public District(List<PoliceStation> policeStations, String distName, int id) {
        this.policeStations = policeStations;
        this.distName = distName;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDistName() {
        return distName;
    }

    public void setDistName(String distName) {
        this.distName = distName;
    }

    public List<PoliceStation> getPoliceStations() {
        return policeStations;
    }

    public void setPoliceStations(List<PoliceStation> policeStations) {
        this.policeStations = policeStations;
    }



}
