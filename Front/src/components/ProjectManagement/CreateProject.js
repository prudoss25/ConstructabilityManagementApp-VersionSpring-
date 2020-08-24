import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import classnames from 'classnames';

import { Card,CardHeader,FormGroup,CardBody,TabContent,TabPane,Input,Nav,NavItem,NavLink } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
 
import GlobalVariables from '../../GlobalVariables';


class CreateProject extends Component {
    state = {
        members:[],
        membertitles:[],
        companies:[],
        projectName: '',
        projectCode: '',
        projectContext: '',
        confirm: '',
        clientId: {},
        clientName: '',
        constructabilityManager: {},
        constructabilityManagerName:'',
        projectManager: {},
        projectManagerName:'',
        memberTitleCurrentId : 0,
        memberTitleCurrent : {},
        activeTab: 1,
        terms: false,
    }

    onEditorStateChange = editorState => {
        this.setState({ editorState })
    }
    componentDidMount() {
        axios.get(GlobalVariables.URLBACKBASE+'/api/projectMember/all')
             .then(response=>{
                this.setState({members:response.data})}
            );

        axios.get(GlobalVariables.URLBACKBASE+'/api/memberTitle/all')
            .then(response=>{
               this.setState({membertitles:response.data})}
           );

        axios.get(GlobalVariables.URLBACKBASE+'/api/company/all')
           .then(response=>{
              this.setState({companies:response.data})}
          );
    }
    
    handleProjectName = event => {
        this.setState({projectName: event.currentTarget.value})
    }
    handleProjectCode= event => {
        this.setState({projectCode: event.currentTarget.value})
    }
    handleProjectContext = event => {
        this.setState({projectContext: event.currentTarget.value})
    }
    handleConstructabilityManager = event => {
        this.setState({constructabilityManager: event.currentTarget.value})
    }
    handleProjectManager = event => {
        this.setState({projectManager: event.currentTarget.value})
    }
    handleClient = event => {
        this.setState({clientId: event.currentTarget.value})
    }
    handleProjectStep=event => {
        if(event.currentTarget.value>0)
        {
            const projectStep=this.state.projectSteps.filter(projectStep=>projectStep.id === event.currentTarget.value)
            this.setState({projectStepCurrent: projectStep[0]})
        }
    }
    handleConstructabilityEvent=event => {
        if(event.currentTarget.value>0)
        {
            const constructabilityEvent=this.state.constructabilityEvents.filter(constructabilityEvent=>constructabilityEvent.id === event.currentTarget.value)
            this.setState({constructabilityEventCurrent: constructabilityEvent[0]})
        }
    }
    handleProjectContext = event => {
        this.setState({projectContext: event.currentTarget.value})
    }
    handleInputChange = event => {
        const target = event.currentTarget;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }
    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    notify = (text) => toast(text, {
        type: 'info',
        position: 'bottom-right'
    })

    onSubmit = async event =>{
        event.preventDefault();
        if(this.state.projectName!=='' && this.state.projectCode!=='' && this.state.clientId!=={} && this.state.constructabilityManager!=={} && this.state.projectManager!=={} && this.state.constructabilityManager!==this.state.projectManager)
        {
            const projectScope ={
                scopeText:"<p></p>"
            }
            const projectScopeCreated = await axios.post(GlobalVariables.URLBACKBASE+'/api/projectScope',projectScope)
            .then(res=> {return res.data})

            const constructability_project = {
                projectScope:
                {
                    id:projectScopeCreated.id
                },
                projectName:this.state.projectName,
                projectCode:this.state.projectCode,
                projectContext:this.state.projectContext,
                client:
                {
                    id:this.state.clientId
                },
                projectManager:
                {
                    id:this.state.projectManager
                },
                constructabilityManager:
                {
                    id:this.state.constructabilityManager
                }
            }


            await axios.post(GlobalVariables.URLBACKBASE+'/api/constructabilityProject',constructability_project)
            .then(res=> {return res.data})


            await this.notify("Project Save As Initialized");

            this.props.history.push('/projectsInitialized');
        }
    }

   
    render() {
        
       
        return (
            <ContentWrapper>
                <form onSubmit={this.onSubmit}>
                {/* START card */}
                <Card className="card-default">
                    <CardHeader>Create New Project</CardHeader>
                    <CardBody>
                        <div role="tabpanel">
                            {/* Nav tabs */}
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === 1 })}>
                                        General Informations
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            {/* Tab panes */}
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId={1}>
                                    <div>
                                        <fieldset className="last-child">
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label" htmlFor="projectName">Project Name *</label>
                                            <div className="col-md-10">
                                                <Input id="input-id-1" 
                                                    type="text" 
                                                    onChange={this.handleProjectName} 
                                                    //    invalid={this.hasError('generalInfos','text','required')}
                                                    //    data-validate='["required"]'
                                                    required/>
                                                {/* <span className="invalid-feedback">Project Name is required</span> */}
                                            </div>
                                        </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label" htmlFor="projectCode">Project Code *</label>
                                            <div className="col-md-10">
                                                <Input id="input-id-1" 
                                                    type="text" 
                                                    onChange={this.handleProjectCode}
                                                    required/>
                                            </div>
                                        </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                        <FormGroup row>
                                        <label className="col-md-2 col-form-label">Client *</label>
                                            <div className="col-md-10">
                                                <select defaultValue="" className="custom-select custom-select-sm" onChange={this.handleClient} required>
                                                    <option>Select the company</option>
                                                    {this.state.companies.map(company =>{
                                                        return(
                                                            <option key={company.id} value={company.id}>{company.companyName}</option>
                                                        )})}
                                                </select>
                                            </div>
                                        </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                        <FormGroup row>
                                            <label className="col-md-2 col-form-label ">Project Manager *</label>
                                            <div className="col-md-10">
                                                <select defaultValue="" className="custom-select custom-select-sm" onChange={this.handleProjectManager} required>
                                                    <option>Select the member</option>
                                                    {this.state.members.map(member =>{
                                                        return(
                                                            <option key={member.id} value={member.id}>{member.memberName}</option>
                                                        )})}
                                                </select>
                                            </div>
                                        </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                        <FormGroup row>
                                        <label className="col-md-2 col-form-label required">Constructability Manager *</label>
                                            <div className="col-md-10">
                                                <select defaultValue="" className="custom-select custom-select-sm" onChange={this.handleConstructabilityManager} required>
                                                    <option>Select the member</option>
                                                    {this.state.members.map(member =>{
                                                        return(
                                                            <option key={member.id} value={member.id}>{member.memberName}</option>
                                                        )})}

                                                </select>
                                            </div>
                                        </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                        <p>(*) Mandatory</p>
                                    </fieldset>
                                </div>
                                </TabPane>
                                
                            </TabContent>
                        </div>
                        <ToastContainer />
                    </CardBody>
                </Card>
                <div className="text-right mt-3">
                    <button className="btn btn-success mr-2" type="submit">Save</button>
                </div>
            </form>
            </ContentWrapper>
            );
    }

}

export default CreateProject;
