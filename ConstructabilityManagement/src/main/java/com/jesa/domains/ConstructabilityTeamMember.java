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
@Table(name = "constructability_team_members")
public class ConstructabilityTeamMember {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	private ConstructabilityProject constructabilityProject;

	@ManyToOne
	private MemberTitle memberTitle;
	
	@ManyToOne
	private ProjectMember projectMember;
	
	
	private Date created_at;
	private Date updated_at;
	
	
	public ConstructabilityTeamMember() {
	}


	public ConstructabilityTeamMember(ConstructabilityProject constructabilityProject, MemberTitle memberTitle,
			ProjectMember projectMember) {
		this.constructabilityProject = constructabilityProject;
		this.memberTitle = memberTitle;
		this.projectMember = projectMember;
	}
	
	@PrePersist
	protected void OnCreate() {
		this.created_at = new Date();
		this.updated_at = new Date();
	}
	
	@PreUpdate
	protected void OnUpdate() {
		this.updated_at = new Date();
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public ConstructabilityProject getConstructabilityProject() {
		return constructabilityProject;
	}


	public void setConstructabilityProject(ConstructabilityProject constructabilityProject) {
		this.constructabilityProject = constructabilityProject;
	}


	public MemberTitle getMemberTitle() {
		return memberTitle;
	}


	public void setMemberTitle(MemberTitle memberTitle) {
		this.memberTitle = memberTitle;
	}


	public ProjectMember getProjectMember() {
		return projectMember;
	}


	public void setProjectMember(ProjectMember projectMember) {
		this.projectMember = projectMember;
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
	
	
	
	
	
}
