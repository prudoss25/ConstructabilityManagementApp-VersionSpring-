package com.jesa.domains;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "constructability_project_states")
public class ConstructabilityProjectState {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String project_state;
	
	public ConstructabilityProjectState() {
		
	}
	public ConstructabilityProjectState(String project_state) {
		this.project_state = project_state;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getProject_state() {
		return project_state;
	}


	public void setProject_state(String project_state) {
		this.project_state = project_state;
	}
	
	
}
