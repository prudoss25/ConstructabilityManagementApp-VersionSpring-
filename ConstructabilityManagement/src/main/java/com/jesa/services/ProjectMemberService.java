package com.jesa.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jesa.domains.ProjectMember;
import com.jesa.repositories.ProjectMemberRepository;

@Service
public class ProjectMemberService {

	@Autowired
	private ProjectMemberRepository projectMemberRepository;
	
	public List<ProjectMember> listAll() {
		return (List<ProjectMember>) projectMemberRepository.findAll();
	}
	
	
}
