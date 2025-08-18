package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.Tests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITestRepo extends JpaRepository<Tests,Long> {
}
