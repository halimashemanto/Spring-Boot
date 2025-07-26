package com.emranhss.project.dto;

import java.util.List;

public class DistrictDTO {
    private int id;
    private String name;
    private List<Integer> policStations;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Integer> getPolicStations() {
        return policStations;
    }

    public void setPolicStations(List<Integer> policStations) {
        this.policStations = policStations;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
