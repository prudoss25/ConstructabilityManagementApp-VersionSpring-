package com.jesa.domains;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

@Entity
@Table(name = "constructability_projects")
public class ConstructabilityProject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String ref;
	private String project_name;
	private String project_context;
	private Double score_progression;
	private String project_code;
	

	private Date created_at;
	private Date updated_at;
	
	@ManyToOne
	private Company client;

	@ManyToOne
	private ProjectMember constructability_manager;
	
	@ManyToOne
	private ProjectMember project_manager;
	
	@ManyToOne
	private ConstructabilityProjectState constructability_project_state;
	
	@ManyToOne
	private ProjectStep project_step;
	
	public ConstructabilityProject() {
		
	}
	
	public ConstructabilityProject(String project_name, String project_context, Double score_progression,
			String project_code, Company client, ProjectMember constructability_manager, ProjectMember project_manager,
			ConstructabilityProjectState constructability_project_state, ProjectStep project_step) {
		this.project_name = project_name;
		this.project_context = project_context;
		this.score_progression = score_progression;
		this.project_code = project_code;
		this.client = client;
		this.constructability_manager = constructability_manager;
		this.project_manager = project_manager;
		this.constructability_project_state = constructability_project_state;
		this.project_step = project_step;
	}
	
	public Company getClient() {
		return client;
	}

	public void setClient(Company client) {
		this.client = client;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRef() {
		return ref;
	}

	public void setRef(String ref) {
		this.ref = ref;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}

	public String getProject_context() {
		return project_context;
	}

	public void setProject_context(String project_context) {
		this.project_context = project_context;
	}

	public Double getScore_progression() {
		return score_progression;
	}

	public void setScore_progression(Double score_progression) {
		this.score_progression = score_progression;
	}

	public String getProject_code() {
		return project_code;
	}

	public void setProject_code(String project_code) {
		this.project_code = project_code;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public ProjectMember getConstructability_manager() {
		return constructability_manager;
	}

	public void setConstructability_manager(ProjectMember constructability_manager) {
		this.constructability_manager = constructability_manager;
	}

	public ProjectMember getProject_manager() {
		return project_manager;
	}

	public void setProject_manager(ProjectMember project_manager) {
		this.project_manager = project_manager;
	}

	public ConstructabilityProjectState getConstructability_project_state() {
		return constructability_project_state;
	}

	public void setConstructability_project_state(ConstructabilityProjectState constructability_project_state) {
		this.constructability_project_state = constructability_project_state;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}
	
	public ProjectStep getProject_step() {
		return project_step;
	}

	public void setProject_step(ProjectStep project_step) {
		this.project_step = project_step;
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
