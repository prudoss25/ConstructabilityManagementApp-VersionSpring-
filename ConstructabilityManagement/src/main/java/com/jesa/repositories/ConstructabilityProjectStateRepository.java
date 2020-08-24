package com.jesa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jesa.domains.ConstructabilityProjectState;

@Repository
public interface ConstructabilityProjectStateRepository extends CrudRepository<ConstructabilityProjectState, Long> {

}
