package com.jesa.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jesa.domains.ConstructabilityProjectState;
import com.jesa.services.ConstructabilityProjectStateService;

@RestController
@RequestMapping("/api/constructabilityProjectState")
public class ConstructabilityProjectStateController {

	@Autowired
	private ConstructabilityProjectStateService constructabilityProjectStateService;
	
	@GetMapping("")
	public List<ConstructabilityProjectState> index()
	{
		return constructabilityProjectStateService.listAll();
	}
	
}
