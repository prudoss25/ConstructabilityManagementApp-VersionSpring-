package com.jesa.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jesa.domains.ConstructabilityTeamMember;
import com.jesa.repositories.ConstructabilityTeamMemberRepository;

@Service
public class ConstructabilityTeamMemberService {

	@Autowired
	private ConstructabilityTeamMemberRepository constructabilityTeamMemberRepository;
	
	public List<ConstructabilityTeamMember> findAll()
	{
		return (List<ConstructabilityTeamMember>) constructabilityTeamMemberRepository.findAll();
	}
}
