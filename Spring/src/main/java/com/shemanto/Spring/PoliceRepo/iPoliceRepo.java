package com.shemanto.Spring.PoliceRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface iPoliceRepo extends JpaRepository<Police, Integer> {
}
