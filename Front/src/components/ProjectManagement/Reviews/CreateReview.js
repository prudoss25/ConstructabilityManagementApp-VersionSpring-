import React, { Component } from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import classnames from 'classnames';
import { Card, TabContent, TabPane, Nav, NavItem, NavLink, Input, Row, InputGroup, InputGroupAddon, InputGroupText, FormGroup } from 'reactstrap';
import Select from 'react-select';
// DateTimePicker
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import GlobalVariables from '../../../GlobalVariables';
import axios from 'axios';

class CreateReview extends Component {
    state = {
        activeTab: 1,
        projectCurrent:[],
        reviewTypes:[],
        projects:[],
        reviewTypeId:0,
        reviewDate:{},
        reviewObject:'',
        reviewLocation:'',
        previousColor:'secondary',
        nextColor:'primary',
        projectTeamMembers:[],
        reviewTypeDefined:false,
        reviewProjectDefined:false,
        reviewObjectDefined:false,
        reviewDateDefined:false,
        reviewLocationDefined:false
    }
    componentDidMount() {

        axios.get(GlobalVariables.URLBACKBASE+'/api/constructabilityProject/created')
             .then(response=>{
                this.setState({projects:response.data})}
        );

        axios.get(GlobalVariables.URLBACKBASE+'/api/reviewType/all')
        .then(response=>{
            this.setState({reviewTypes:response.data})}
        );

    }

    initializeParticipantCheckList = (teamMembers) =>{
        var indexCurrent = 0;
        teamMembers.map(teamMember =>{
            this.setState((prevState, props) => ({
                // Return new array, do not mutate previous state.
                projectTeamMembers: [
                    ...prevState.projectTeamMembers.slice(0, indexCurrent),
                    { 
                        index:indexCurrent,
                        checked: false,
                        teamMemberName: teamMember.project_member.member_name,
                        teamMemberId: teamMember.project_member.id,
                        teamMemberCompany: teamMember.project_member.company.company_name
                    },
                    ...prevState.projectTeamMembers.slice(indexCurrent+1)
                ],
            }));
            indexCurrent++;
        })
    }

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleDelivrableCheklistChange = (listName,index) => {
        this.setState({
            [listName]: this.state[listName].map((item, i) => (index !== i ? item : {...item, checked: !this.state[listName][index].checked} ) )
        });
    }

    handleProject = (projectCurrent) => {
        this.setState({reviewProjectDefined:true})
        this.setState({ projectCurrent });
    }
    handleReviewDate= event => {
        this.setState({reviewDate: event.toDate()})
        this.setState({reviewDateDefined:true})
    }

    handleReviewObject= event => {
        this.setState({reviewObject: event.currentTarget.value})
        this.setState({reviewObjectDefined:true})
    }

    handleReviewLocation= event => {
        this.setState({reviewLocation: event.currentTarget.value})
        this.setState({reviewLocationDefined:true})
    }

    handleReviewType = event => {
        this.setState({reviewTypeId: event.currentTarget.value})
        this.setState({reviewTypeDefined:true})
    }

    // onClickNext = () => {
    //     if(this.state.activeTab === 1 && this.state.reviewObjectDefined && this.state.reviewProjectDefined && this.state.reviewTypeDefined && this.state.reviewDateDefined && this.state.reviewLocationDefined)
    //     {
    //         axios.get('http://127.0.0.1:8000/api/constructabilityteammembers/showByProject/'+this.state.projectCurrent.value)
    //         .then(response=>{
    //             this.initializeParticipantCheckList(response.data);
    //         });
    //     }
    //     if(this.state.activeTab < 3)
    //     {
            
    //         this.toggleTab(this.state.activeTab + 1)
            
    //     }
    // }

    // onClickPrev = () => {
    //     if(this.state.activeTab > 1)
    //     this.toggleTab(this.state.activeTab - 1)
    // }


    onSubmit = async event =>{
        event.preventDefault();
        const review = {
            constructabilityProject:
            {
                id:this.state.projectCurrent.value,
            },
            reviewType:
            {
                id:this.state.reviewTypeId,
            },
            reviewDate:this.state.reviewDate,
            reviewObject:this.state.reviewObject,
            reviewLocation:this.state.reviewLocation
        }
        const reviewCreated = await axios.post(GlobalVariables.URLBACKBASE+'/api/review',review)
        .then(res=> {return res.data})

        // this.state.projectTeamMembers.map(async teamMember=>{
        //     if(teamMember.checked)
        //     {
        //         const review_participant={
        //             project_member_id:teamMember.teamMemberId,
        //             review_id:reviewCreated.id,
        //         }
        //         await axios.post('http://127.0.0.1:8000/api/reviewParticipant',review_participant)
        //         .then(res=> { return res.data})
        //     }
        // })

        

        this.props.history.push('/reviews');
    }

    render() {
        // used for react select
        const { projectCurrent } = this.state;
        const nextColor = this.state.activeTab < 3 ? 'primary' : 'secondary'
        const previousColor = this.state.activeTab > 1 ? 'primary' : 'secondary'
        return (
            <ContentWrapper>
                <div className="content-heading">Create Review</div>
                <form className="ie-fix-flex" onSubmit={this.onSubmit}>
                <Card>
                        <div role="tabpanel">
                            <Nav tabs justified>
                                <NavItem>
                                <NavLink  className={classnames({ active: this.state.activeTab === 1 })}
                                    >
                                        Generals Informations</NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === 2 })}
                                    >
                                        Participants Management</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === 3 })}
                                    >
                                        Resume</NavLink>
                                </NavItem> */}
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId={1} role="tabpanel">
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">Review's Type :</label>
                                                <div className="col-lg-10">
                                                <select defaultValue="" className="custom-select custom-select-sm" onChange={this.handleReviewType} required>
                                                    <option>Select the Review Type</option>
                                                    {this.state.reviewTypes.map(reviewType =>{
                                                        return(
                                                            <option key={reviewType.id} value={reviewType.id}>{reviewType.reviewTypeName}</option>
                                                        )})}
                                                </select>
                                                
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">Review's Object :</label>
                                            <div className="col-lg-10">
                                            <Input id="input-id-1" 
                                                    type="text" 
                                                    onChange={this.handleReviewObject}
                                                    required/>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">Project :</label>
                                            <div className="col-lg-10">
                                            <Select name="multi-select-name"
                                                    multi
                                                    simpleValue
                                                    value={projectCurrent}
                                                    onChange={this.handleProject}
                                                    options={this.state.projects.map(project =>{
                                                        return(
                                                            { value: project.id , label: project.projectName}
                                                        )})}
                                                    />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">Reviews Date:</label>
                                            <div className="col-lg-10">
                                            <Datetime inputProps={{className: 'form-control'}} value={this.state.reviewDate} onChange={this.handleReviewDate}/>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group row">
                                            <label className="col-lg-2 col-form-label">Review's Location :</label>
                                            <div className="col-lg-10">
                                            <Input id="input-id-1" type="text" onChange={this.handleReviewLocation} required/>
                                            </div>
                                        </div>
                                    </fieldset>
                                </TabPane>

                                <div>
                                    {
                                        // <TabPane tabId={2} role="tabpanel">
                                        // <FormGroup row>
                                        //     <label className="col-md-2 col-form-label">Participant List</label>
                                        //     <div className="col-md-10">
                                        //         {
                                        //             this.state.projectTeamMembers.map(teamMember =>{
                                        //                 return(
                                        //                     <InputGroup key={teamMember.index}>
                                        //                         <InputGroupAddon addonType="prepend">
                                        //                             <InputGroupText>
                                        //                                 <Input addon type="checkbox" checked={teamMember.checked} onChange={e => this.handleDelivrableCheklistChange('projectTeamMembers',teamMember.index)} aria-label="Checkbox for following text input" />
                                        //                             </InputGroupText>
                                        //                         </InputGroupAddon>
                                        //                         <InputGroupAddon addonType="append">
                                        //                             <InputGroupText>{teamMember.teamMemberName}</InputGroupText>
                                        //                             <InputGroupText>{teamMember.teamMemberCompany}</InputGroupText>
                                        //                         </InputGroupAddon>
                                        //                     </InputGroup>
                                        //                 )
                                        //             })
                                        //         }
                                        //     </div>
                                        // </FormGroup>
                                        // </TabPane>
                                    }
                                </div>
                                
                                <div>
                                {
                                // <TabPane tabId={3} role="tabpanel">
                                // <fieldset>
                                //         <div className="form-group row">
                                //             <label className="col-lg-2 col-form-label">Review's type:</label>
                                //                 <div className="col-lg-10">
                                //                 <select value={this.state.reviewTypeId} className="custom-select custom-select-sm"  disabled>
                                //                     <option>Select the Review Type</option>
                                //                     {this.state.reviewTypes.map(reviewType =>{
                                //                         return(
                                //                             <option key={reviewType.id} value={reviewType.id}>{reviewType.review_type_name}</option>
                                //                         )})}
                                //                 </select>
                                //             </div>
                                //         </div>
                                //     </fieldset>
                                //     <fieldset>
                                //         <div className="form-group row">
                                //             <label className="col-lg-2 col-form-label">Project :</label>
                                //             <div className="col-lg-10">
                                //                 {/* <Input value={this.state.projectCurrent.label} disabled/> */}
                                //             </div>
                                //         </div>
                                //     </fieldset>
                                //     <fieldset>
                                //         <div className="form-group row">
                                //             <label className="col-lg-2 col-form-label">Reviews Date:</label>
                                //             <div className="col-lg-10">
                                //                 <Datetime inputProps={{className: 'form-control'}} value={this.state.reviewDate} onChange={this.handleReviewDate} disabled/>
                                //             </div>
                                //         </div>
                                //     </fieldset>
                                // </TabPane>
                            }
                                </div>
                                
                            </TabContent>
                        </div>
                    
                </Card>
                <Row>
                    <div className="col">
                        <div className="text-left mt-3">
                            {/* {this.state.activeTab === 2 && */}
                                <button className="btn btn-success mr-2" type="submit" >Save</button>
                            {/* } */}
                        </div>
                    </div>
                    {/* <div className="col">
                        <div className="text-right mt-3">
                            <button className={`btn btn-${previousColor} mr-2`} type="button" onClick={() => { this.onClickPrev()}}>Previous</button>
                            <button className={`btn btn-${nextColor}`} type="button" onClick={() => { this.onClickNext()}}>Next</button>
                        </div>
                    </div> */}
                </Row>
                </form>
            </ContentWrapper>
            );
    }

}
export default CreateReview;