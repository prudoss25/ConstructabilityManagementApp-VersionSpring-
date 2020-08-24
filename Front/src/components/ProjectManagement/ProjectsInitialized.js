import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Datatable from '../Tables/Datatable';
import ReactDOM from 'react-dom';
 
import GlobalVariables from '../../GlobalVariables';
import $ from 'jquery';
 
class ProjectsInitialized extends Component {
    constructor(){
        super();
        this.state={
            projects:[],
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
                    url:GlobalVariables.URLBACKBASE+"/api/constructabilityProject/initialized",
                    dataSrc:""
                },
                columns:[
                    {
                        data:"ref"
                    },
                    {
                        data:"projectCode"
                    },
                    {
                        data:"projectName"
                    },
                    {
                        data:"client.companyName"
                    },
                    {
                        data:"projectManager.memberName"
                    },
                    {
                        data:"constructabilityManager.memberName"
                    },
                    {
                        data:"created_at",
                        render: function(data,type,project){
                              var options = {year: 'numeric', month: 'long', day: 'numeric' };
                              const created_at= new Date(data);
                              return created_at.toLocaleDateString("en-US", options)
                        }  
                    }
                ],
                columnDefs : [
                    {
                       'targets': [0],
                       createdCell : (td, cellData, project, row, col) => {
                        
                        ReactDOM.render(
                            <div className="badge badge-warning" onClick={()=>this.goToProject(project)} >
                                     {project.ref}
                             </div>
                             ,td)
                        
                       }
                    }
                ]
              }
        }
    }

    goToProject=(project)=>{
        this.props.history.push('/modifyProject/'+project.id);
    }

    // Access to internal datatable instance for customizations
    dtInstance = dtInstance => {
        const inputSearchClass = 'datatable_input_col_search';
        const columnInputs = $('tfoot .' + inputSearchClass);
        // On input keyup trigger filtering
        columnInputs
            .keyup(function() {
                dtInstance.fnFilter(this.value, columnInputs.index(this));
            });
    }
    
    componentDidMount(){
        // axios.get('http://127.0.0.1:8000/api/projectsInitialized')
        // .then(response=>{
        //     this.setState({projects:response.data});
        // });
    }

    dtInstance = dtInstance => {
        const inputSearchClass = 'datatable_input_col_search';
        const columnInputs = $('tfoot .' + inputSearchClass);
        // On input keyup trigger filtering
        columnInputs
            .keyup(function() {
                dtInstance.fnFilter(this.value, columnInputs.index(this));
            });
    }

    
    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Project Management
                        <small></small>
                    </div>
                    <div className="ml-auto">
                        <Link to="/projects">
                            <Button outline color="primary" type="button">Projects Created</Button>
                        </Link>
                    </div>
                </div>
                
                <Container fluid>
                    <Card>
                        <CardHeader>
                            <CardTitle>Constructability Study Projects</CardTitle>
                            <div className="float-right mt-2">
                                <Link to="/newproject">
                                        <button className="btn btn-primary ml-auto" type="button">
                                            <em className="fa fa-plus-circle fa-fw mr-1"></em>
                                            New Project
                                        </button>
                                </Link>
                            </div>
                            {/* <div className="text-sm">fghcvbjk</div> */}
                        </CardHeader> 
                        <CardBody>
                            
                        <Datatable options={this.state.dtOptions}>
                            <table className="table table-striped my-4 w-100">
                                    <thead>
                                        <tr>
                                            <th data-priority="1">REF</th>
                                            <th>Project Code</th>
                                            <th>Project Name</th>
                                            <th>Client</th>
                                            <th>Project Manager</th>
                                            <th>Constructability Manager</th>
                                            <th>Created At</th>
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

export default ProjectsInitialized;