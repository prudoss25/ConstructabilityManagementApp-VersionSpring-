package com.jesa.domains;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

@Entity
@Table(name = "project_steps")
public class ProjectStep {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String project_step_name;
	
	private Date created_at;
	private Date updated_at;
	
	
	
	
	
	public ProjectStep() {
	}
	
	

	public ProjectStep(String project_step_name) {
		this.project_step_name = project_step_name;
		this.created_at = new Date();
		this.updated_at = new Date();
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getProject_step_name() {
		return project_step_name;
	}



	public void setProject_step_name(String project_step_name) {
		this.project_step_name = project_step_name;
	}



	public Date getCreated_at() {
		return created_at;
	}



	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}



	public Date getUpdated_at() {
		return updated_at;
	}



	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}



	@PrePersist
	protected void onCreate() {
		this.created_at = new Date();
		this.updated_at = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updated_at =new Date();
	}

}
