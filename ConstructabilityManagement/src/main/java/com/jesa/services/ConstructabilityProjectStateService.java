package com.jesa.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jesa.domains.ConstructabilityProjectState;
import com.jesa.repositories.ConstructabilityProjectStateRepository;

@Service
public class ConstructabilityProjectStateService {
	
	@Autowired
	private ConstructabilityProjectStateRepository constructabilityProjectStateRepository;
	
	public ConstructabilityProjectState saveOrUpdateConstructabilityProjectState(ConstructabilityProjectState state) {
		return constructabilityProjectStateRepository.save(state);
	}
	
	public List<ConstructabilityProjectState> listAll() {
		return (List<ConstructabilityProjectState>) constructabilityProjectStateRepository.findAll();
	}

}
