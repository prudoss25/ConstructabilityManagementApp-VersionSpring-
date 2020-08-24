package com.jesa.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jesa.domains.ProjectStep;
import com.jesa.repositories.ProjectStepRepository;

@Service
public class ProjectStepService {
	
	@Autowired
	private ProjectStepRepository projectStepRepository;
	
	
	public List<ProjectStep> findAll(){
		return (List<ProjectStep>) projectStepRepository.findAll();
	}

}
