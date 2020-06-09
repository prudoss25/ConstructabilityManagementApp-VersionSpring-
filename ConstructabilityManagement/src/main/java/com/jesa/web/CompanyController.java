package com.jesa.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jesa.domains.Company;
import com.jesa.services.CompanyService;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	@GetMapping("")
	public List<Company> index()
	{
		return companyService.listAll();
	}
	
	@PostMapping("")
	public ResponseEntity<Company> createNewCompany(@RequestBody Company company){
		companyService.saveOrUpdateCompany(company);
		return new ResponseEntity<Company>(company, HttpStatus.CREATED);
	}
	
}
