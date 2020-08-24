import React, { Component } from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import Datatable from '../../Tables/Datatable';
import { Container, Card, CardHeader, CardBody, CardTitle,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';

import GlobalVariables from '../../../GlobalVariables';

class Reviews extends Component {
    constructor(){
        super();
        this.state={
            reviews:[],
            dtOptions: {
                'paging': true, // Table pagination
                'ordering': true, // Column ordering
                'info': true, // Bottom left status text
                responsive: true,
                // Text translation options
                // Note the required keywords between underscores (e.g _MENU_)
                oLanguage: {
                    sSearch: '<em class="fa fa-search"></em>',
                    sLengthMenu: '_MENU_ records per page',
                    info: 'Showing page _PAGE_ of _PAGES_',
                    zeroRecords: 'Nothing found - sorry',
                    infoEmpty: 'No records available',
                    infoFiltered: '(filtered from _MAX_ total records)',
                    oPaginate: {
                        sNext: '<em class="fa fa-caret-right"></em>',
                        sPrevious: '<em class="fa fa-caret-left"></em>'
                    }
                },
                ajax:{
                    url:GlobalVariables.URLBACKBASE+"/api/review/all",
                    dataSrc:""
                },
                columns:[
                    {
                        data:"ref"
                    },
                    {
                        data:"reviewType.reviewTypeName"
                    },
                    {
                        data:"reviewObject"
                    },
                    {
                        data:"constructabilityProject.projectCode"
                    },
                    {
                        data:"constructabilityProject.projectName"
                    },
                    {
                        data:"constructabilityProject.client.companyName"
                    },
                    {
                        data:"constructabilityProject.projectManager.memberName"
                    },
                    {
                        data:"constructabilityProject.constructabilityManager.memberName"
                    },
                    {
                        data:"reviewDate",
                        render: function(data,type,delivrable){
                              var options = {year: 'numeric', month: 'long', day: 'numeric' };
                              const created_at= new Date(data);
                              return created_at.toLocaleDateString("en-US", options)
                        }  
                    }
                ],
                columnDefs : [
                    {
                       'targets': [0],
                       createdCell : (td, cellData, review, row, col) => {
                        ReactDOM.render(
                            <div className="badge badge-success" onClick={()=>this.goToReview(review)}> 
                                {/* <Link to={`/projectdetails/${delivrable.id}`} className="text-inherit">  */}
                                    {review.ref}
                                {/* </Link>  */}
                            </div> 
                             ,td)
                        
                       }
                    }
                ]
              }
        }
    }
    goToReview=(review)=>{
        this.props.history.push('/reviewdetails/'+review.id);
    }
    
    componentDidMount(){
    }
    
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Project Management
                        <small></small>
                    </div>
                </div>
                <Container fluid>
                    <Card>
                        <CardHeader>
                            <CardTitle>Reviews List</CardTitle>
                            <div className="float-right mt-2">
                                <Link to="/newreview">
                                        <button className="btn btn-primary ml-auto" type="button">
                                            <em className="fa fa-plus-circle fa-fw mr-1"></em>
                                            New Review
                                        </button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody>
                           
                        <Datatable options={this.state.dtOptions}>
                            <table className="table table-striped my-4 w-100">
                                    <thead>
                                        <tr>
                                            <th data-priority="1">REF</th>
                                            <th>Review Title</th>
                                            <th>Review Object</th>
                                            <th>Project Code</th>
                                            <th>Project Name</th>
                                            <th>Client</th>
                                            <th>Project Manager</th>
                                            <th>Constructability Manager</th>
                                            <th>Review Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                            </table>
                        </Datatable>
                        </CardBody>
                    </Card>
                </Container>
                    
            </ContentWrapper>
            );
        }
}
export default Reviews;