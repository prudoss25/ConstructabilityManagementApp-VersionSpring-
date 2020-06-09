package com.jesa.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jesa.domains.ConstructabilityProject;
import com.jesa.services.ConstructabilityProjectService;

@RestController
@RequestMapping("/api/constructabilityProject")
public class ConstructabilityProjectController {
	
	@Autowired
	private ConstructabilityProjectService constructabilityProjectService;
	
	@GetMapping("")
	public List<ConstructabilityProject> index()
	{
		return constructabilityProjectService.listAll();
	}

}
