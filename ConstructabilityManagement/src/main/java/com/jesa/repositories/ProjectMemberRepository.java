package com.jesa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jesa.domains.ProjectMember;

@Repository
public interface ProjectMemberRepository extends CrudRepository<ProjectMember, Long> {

	
}
