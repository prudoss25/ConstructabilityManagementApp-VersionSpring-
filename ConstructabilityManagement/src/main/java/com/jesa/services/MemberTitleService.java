package com.jesa.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jesa.domains.MemberTitle;
import com.jesa.repositories.MemberTitleRepository;

@Service
public class MemberTitleService {

	@Autowired
	private MemberTitleRepository memberTitleRepository;
	
	public List<MemberTitle> findAll(){
		return (List<MemberTitle>) memberTitleRepository.findAll();
	}
}
