package com.emranhss.Project.reposotory;

import com.emranhss.Project.Entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDistrictRepo extends JpaRepository<District , Integer> {


   // public District findByName(String name);

}
