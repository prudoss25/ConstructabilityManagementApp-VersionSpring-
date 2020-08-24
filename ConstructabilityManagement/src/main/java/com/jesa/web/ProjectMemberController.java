package com.jesa.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jesa.domains.ProjectMember;
import com.jesa.services.ProjectMemberService;

@RestController
@RequestMapping("/api/projectMember")
public class ProjectMemberController {

	@Autowired	
	private ProjectMemberService projectMemberService;
	
	@GetMapping("")
	public List<ProjectMember> index()
	{
		return projectMemberService.listAll();
	}
}
