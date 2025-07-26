package com.emranhss.Project.reposotory;

import com.emranhss.Project.Entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICountryRepo extends JpaRepository<Country,Integer> {
}
