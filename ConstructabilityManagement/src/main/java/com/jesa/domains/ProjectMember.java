package com.jesa.domains;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "project_members")
public class ProjectMember {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String member_name;
	
	@ManyToOne
	private Company member_company;
	
	public ProjectMember() {
		
	}
	
	public ProjectMember(String member_name, Company member_company) {
		super();
		this.member_name = member_name;
		this.member_company = member_company;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMember_name() {
		return member_name;
	}
	public void setMember_name(String member_name) {
		this.member_name = member_name;
	}
	public Company getMember_company() {
		return member_company;
	}
	public void setMember_company(Company member_company) {
		this.member_company = member_company;
	}
	
	
	
	
	
}
