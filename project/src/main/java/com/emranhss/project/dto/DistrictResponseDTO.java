package com.emranhss.Project.dto;

import java.util.List;

public class DistrictResponseDTO {

    private int id;
    private String distName;
    private List<Integer> policeStations;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Integer> getPoliceStations() {
        return policeStations;
    }

    public void setPoliceStations(List<Integer> policeStations) {
        this.policeStations = policeStations;
    }

    public String getDistName() {
        return distName;
    }

    public void setDistName(String distName) {
        this.distName = distName;
    }
}
