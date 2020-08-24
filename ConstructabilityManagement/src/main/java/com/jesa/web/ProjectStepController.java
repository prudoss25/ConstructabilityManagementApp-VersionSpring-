package com.jesa.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jesa.domains.ProjectStep;
import com.jesa.repositories.ProjectStepRepository;

@RestController
@RequestMapping("/api/projectStep")
public class ProjectStepController {

	@Autowired
	private ProjectStepRepository projectStepRepository;
	
	@GetMapping("")
	public List<ProjectStep> index()
	{
		return (List<ProjectStep>) projectStepRepository.findAll();
	}
}
