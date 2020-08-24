package com.jesa.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jesa.domains.Company;

@Repository
public interface CompanyRepository extends CrudRepository<Company,Long>{
	
	

}
