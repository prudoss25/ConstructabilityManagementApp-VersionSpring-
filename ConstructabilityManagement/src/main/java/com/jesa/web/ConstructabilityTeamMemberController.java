package com.jesa.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jesa.domains.ConstructabilityTeamMember;
import com.jesa.services.ConstructabilityTeamMemberService;

@RestController
@RequestMapping("/api/constructabilityTeamMember")
public class ConstructabilityTeamMemberController {
	
	@Autowired
	private ConstructabilityTeamMemberService constructabilityTeamMemberService;
	
	@GetMapping("")
	public List<ConstructabilityTeamMember> findAll()
	{
		return constructabilityTeamMemberService.findAll();
	}
	
	

}
