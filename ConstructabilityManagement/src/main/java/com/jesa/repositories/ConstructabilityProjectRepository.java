package com.jesa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jesa.domains.ConstructabilityProject;

@Repository
public interface ConstructabilityProjectRepository extends CrudRepository<ConstructabilityProject, Long>{

}
