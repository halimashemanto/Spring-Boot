package com.emranhss.Project.reposotory;

import com.emranhss.Project.Entity.PoliceStation;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IPoliceStationRepo extends JpaRepository<PoliceStation, Integer> {
}
