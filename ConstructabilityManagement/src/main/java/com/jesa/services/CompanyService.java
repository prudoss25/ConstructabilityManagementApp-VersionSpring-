package com.jesa.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jesa.domains.Company;
import com.jesa.repositories.CompanyRepository;

@Service
public class CompanyService {

	@Autowired
	private CompanyRepository companyRepository;
	
	public Company saveOrUpdateCompany(Company company) {
		return companyRepository.save(company);
	}
	
	public List<Company> listAll() {
		return (List<Company>) companyRepository.findAll();
	}
}
