import React, { Component } from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { CardHeader,Card, Table } from 'reactstrap';

class ManageParticipant extends Component {

    state = {
        reviewParticipants:[],
        participantStatuts:[],
        someChange:false,
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/reviewParticipants/Review/'+this.props.match.params.id)
             .then(response=>{
                this.setState({reviewParticipants:response.data})}
        );

        axios.get('http://127.0.0.1:8000/api/reviewParticipantStatuts')
        .then(response=>{
            this.setState({participantStatuts:response.data})}
        );
    }

    handleParticipantStatut = (event,participant) =>{
        const index = this.state.reviewParticipants.indexOf(participant)
        this.state.reviewParticipants[index].review_participant_statut_id = event.currentTarget.value
        this.setState({someChange:true})
    }

    
    save = async event =>{
        event.preventDefault();
         this.state.reviewParticipants.map (async participant => {
            await axios.put('http://127.0.0.1:8000/api/reviewParticipant/'+participant.id,participant)
            .then(response=>{return response.data}
            );
        })
        await this.setState({someChange:false})
        this.props.history.push('/manageParticipants/'+this.props.match.params.id);
    }
    
    render() {
        console.log(this.state.reviewParticipants)
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Participants Management
                        {/* <small>Page 1</small> */}
                    </div>
                </div>
                <form onSubmit={this.save}>
                <Card className="card-default">
                        <CardHeader>Participants List</CardHeader>
                            {/* START table-responsive */}
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Participation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.reviewParticipants.map(participant =>{
                                            return(
                                                <tr key={participant.id}>
                                                    <td>{participant.project_member.member_name}</td>
                                                    <td>{participant.project_member.company.company_name}</td>
                                                    <td>
                                                        <select  className="custom-select" multiple="" defaultValue="1" onChange={(event)=>this.handleParticipantStatut(event,participant)}> 
                                                            {/* <option value={0}>Statut</option> */}
                                                            {this.state.participantStatuts.map(participantStatut =>{
                                                                return(
                                                                    <option key={participantStatut.id} value={participantStatut.id} selected={participant.review_participant_statut_id == participantStatut.id}>{participantStatut.statut}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            {/* END table-responsive */}
                        </Card>
                        <div className="text-right mt-3">
                            <button className="btn btn-success mr-2" disabled={!this.state.someChange} type="submit" >Save</button>
                        </div>
                </form> 
            </ContentWrapper>
            );
        }
}

export default ManageParticipant;