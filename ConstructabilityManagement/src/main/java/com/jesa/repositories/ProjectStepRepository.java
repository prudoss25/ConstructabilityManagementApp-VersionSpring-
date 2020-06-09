package com.jesa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jesa.domains.ProjectStep;

@Repository
public interface ProjectStepRepository extends CrudRepository<ProjectStep, Long>{

}
