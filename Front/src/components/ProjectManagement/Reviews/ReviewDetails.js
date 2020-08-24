import React, { Component } from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Row, Col, Progress,Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Scrollable from '../../Common/Scrollable'
import axios from 'axios';

const REVIEWTIMING=[
    'Coming Soon',
    'In Progess',
    'Happened'
]
class ReviewDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            review:{
                constructability_project:{
                    constructability_manager:{},
                    project_manager:{},
                    client:{},
                    project_step:{}
                },
                review_type:{},
                review_report:{
                    sections:[]
                }
            },
            reviewReportId:{},
            reportSections:[],
            constructabilityTeamMembers:[],
            reviewParticipants:[],
            client:{},
        } 
    }

    async componentDidMount(){
        await axios.get('http://127.0.0.1:8000/api/review/'+this.props.match.params.id)
        .then(response=>{
            this.setState({review:response.data});
        });    
        
        axios.get('http://127.0.0.1:8000/api/constructabilityteammembers/showByProject/'+this.state.review.constructability_project_id)
        .then(response=>{
             this.setState({constructabilityTeamMembers:response.data});
         })

        axios.get('http://127.0.0.1:8000/api/reviewParticipants/Review/'+this.props.match.params.id)
        .then(response=>{
             this.setState({reviewParticipants:response.data});
        })
    }
    
    editReport=()=>{
        this.props.history.push('/editreportReview/'+this.props.match.params.id);
    }
    
    render() {
        var options = {year: 'numeric', month: 'long', day: 'numeric' };
        var today = new Date();
        const reviewDate=new Date(this.state.review.review_date)
        const ReviewTiming=reviewDate<today?REVIEWTIMING[2]:(reviewDate==today?REVIEWTIMING[1]:REVIEWTIMING[0])
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Review Informations
                        <small></small>
                    </div>
                </div>
                <Row>
                    <Col xl="8">
                        {/* Main card */}
                        <div className="card b">
                            <div className="card-header">
                                <div className="float-right mt-2">
                                    <div className="badge badge-info">{ReviewTiming}</div>
                                </div>
                                <h4 className="my-2">
                                    <span>{this.state.review.review_type.review_type_name} : {this.state.review.review_object}</span>
                                </h4>
                            </div>
                            <div className="card-body">
                                {
                                    this.state.reviewParticipants.length>0 &&
                                    <div>
                                        <h4>Review Team Member</h4>
                                        <table className="table table-striped my-4 w-100">
                                            <thead>
                                                <tr>
                                                    {/* <th>Title</th> */}
                                                    <th>Name</th>
                                                    <th>Company</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr>
                                                    <td>Facilitator</td>
                                                    <td>{this.state.review.constructability_project.constructability_manager.member_name}</td>
                                                    <td>JESA</td>
                                                </tr>
                                                <tr>
                                                    <td>Project Manager</td>
                                                    <td>{this.state.review.constructability_project.project_manager.member_name}</td>
                                                    <td>JESA</td>
                                                </tr> */}
                                                {this.state.reviewParticipants.map((participant)=>{
                                                    return(
                                                        <tr key={participant.id}>
                                                            <td>{participant.project_member.member_name}</td>
                                                            {/* <td>{participant.member_title.title_name}</td> */}
                                                            <td>{participant.project_member.company.company_name}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        <p className="text-right">
                                            <Link to={`/manageParticipants/${this.props.match.params.id}`}>
                                                <Button color="primary" >Manage Participants</Button>
                                            </Link>
                                        </p>
                                    </div>
                                }
                            </div>

                            {/* <div className="card-body">
                            {
                                this.state.review.review_report.sections.length>0 &&
                                <div>
                                    <h4>Review Summary</h4>
                                    <table className="table table-striped my-4 w-100">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Section Title</th>
                                                <th>Section Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.review.review_report.sections.map(section=>{
                                                    return(
                                                        <tr key={section.id}>
                                                            <td align="left"><strong>{section.id}</strong></td>
                                                            <td align="left"><strong>{section.section_title}</strong></td>
                                                            <td>
                                                                <ul>
                                                                    {section.actions.map(action =>{
                                                                        return (
                                                                            <li key={action.id}>{action.action}</li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <p className="text-right">
                                        <Link to="/reviewsummury">
                                            <Button color="primary" >View Details</Button>
                                        </Link>
                                    </p>
                                </div>
                            } 
                               
                            
                            </div>*/}
                        </div>
                        {/* End Main card */}
                    </Col>
                    <Col xl="4">
                        {/* Aside card */}
                        <div className="card b">
                            <div className="card-body bb">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <button className="btn btn-secondary btn-oval" type="button" onClick={()=>this.editReport()}>
                                            <em className="fa-fw text-muted"></em>
                                            <span>Edit Report</span>
                                        </button>
                                    </div>
                                    <div className="float-right">
                                        <button className="btn btn-danger btn-oval" type="button">Cancel Review</button>
                                    </div>
                                </div>
                            </div>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Review date</strong>
                                        </td>
                                        <td>{reviewDate.toLocaleDateString("en-US", options)}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Review Location</strong>
                                        </td>
                                        <td>{this.state.review.review_location}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Project Number</strong>
                                        </td>
                                        <td>{this.state.review.constructability_project.project_code}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Project Name</strong>
                                        </td>
                                        <td>{this.state.review.constructability_project.project_name}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Client</strong>
                                        </td>
                                        <td>{this.state.review.constructability_project.client.company_name}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Project Manager</strong>
                                        </td>
                                        <td>{this.state.review.constructability_project.project_manager.member_name}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Constructability Manager</strong>
                                        </td>
                                        <td>{this.state.review.constructability_project.constructability_manager.member_name}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Project Step</strong>
                                        </td>
                                        <td>{this.state.review.constructability_project.project_step.project_step_name}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>
                                            <strong>Attachements</strong>
                                        </td>
                                        <td>
                                            <Scrollable height="120" className="list-group">
                                                <table className="table table-bordered bg-transparent">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <em className="fa-lg far fa-file-word"></em>
                                                            </td>
                                                            <td>
                                                                <a className="text-muted" href="Constructability_suggestion/lessons_learned_form.docx">Constructability_sug...</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <em className="fa-lg far fa-file-word"></em>
                                                            </td>
                                                            <td>
                                                                <a className="text-muted" href="" alt="Constructability_Team_Action_Item_List.docx">Constructability_Team...</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <em className="fa-lg far fa-file-word"></em>
                                                            </td>
                                                            <td>
                                                                <a className="text-muted" href="" alt="Constructability_Value_Added_Summary_Log.docx">Constructability_Val...</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Scrollable>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                            {/* <p className="text-right">
                                <a className="btn btn-link" href="">Open repository</a>
                            </p> */}
                        </div>
                        {/* end Aside card */}
                    </Col>
                </Row>
            </ContentWrapper>
            );
    }

}

export default ReviewDetails;
