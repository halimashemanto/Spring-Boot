package com.suprovashemanto.crud.repository;

import com.suprovashemanto.crud.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmployeeRepo  extends JpaRepository<Employee, Integer> {
}
