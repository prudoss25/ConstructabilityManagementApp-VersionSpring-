package com.jesa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jesa.domains.ConstructabilityTeamMember;

@Repository
public interface ConstructabilityTeamMemberRepository extends CrudRepository<ConstructabilityTeamMember, Long>{

	
}
