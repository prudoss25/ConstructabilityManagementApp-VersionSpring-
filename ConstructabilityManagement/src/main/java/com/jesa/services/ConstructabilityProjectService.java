package com.jesa.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jesa.domains.ConstructabilityProject;
import com.jesa.repositories.ConstructabilityProjectRepository;

@Service
public class ConstructabilityProjectService {

	@Autowired
	private ConstructabilityProjectRepository constructabilityProjectRepository;

	public ConstructabilityProject saveOrUpdateConstructabilityProject(ConstructabilityProject project) {
		
		return constructabilityProjectRepository.save(project);
	}
	
	public List<ConstructabilityProject> listAll()
	{
		return (List<ConstructabilityProject>) constructabilityProjectRepository.findAll();
	}
	

}
