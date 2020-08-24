import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Base from './components/Layout/Base'
import BasePage from './components/Layout/BasePage'
import Reviews from './components/ProjectManagement/Reviews/Reviews';
import ReviewDetails from './components/ProjectManagement/Reviews/ReviewDetails';
// import DelivrablesList from './components/ProjectManagement/Delivrables/DelivrablesList';
import ProjectsList from './components/ProjectManagement/ProjectsList';
// import AddedValue from './components/ConstructabilityAddedValue/AddedValue';
// import Reporting from './components/Reporting/Reporting';
// import ProjectDetails from './components/ProjectManagement/ProjectDetails';
import CreateProject from './components/ProjectManagement/CreateProject';
import CreateReview from './components/ProjectManagement/Reviews/CreateReview';
// import ConstructabilityImplementationPlan from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/ConstructabilityImplementationPlan';
import ProjectsInitialized from './components/ProjectManagement/ProjectsInitialized';
// import ModifyProject from './components/ProjectManagement/ModifyProject';
// import EditReport from './components/Reporting/ReviewsReports/EditReport';
// import CIPDashboard from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/CIPDashboard';
// import ConstructabilityMilestone from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/ConstructabilityMilestone';
// import ProjetMilestone from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/ProjectMilestone';
// import ProjectContext from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/ProjectContext';
// import ProjetScopeText from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/ProjetScopeText';
// import ProjetScopeImage from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/ProjectScopeImage';
// import TeamBuilding from './components/ProjectManagement/Delivrables/ConstructabilityImplementationPlan/TeamBuilding';
// import ManageParticipant from './components/ProjectManagement/Reviews/ManageParticipants';
// import NewReportSection from './components/Reporting/ReviewsReports/NewReportSection';
// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    
];


const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    if(listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Switch location={location}>
                    
                </Switch>
            </BasePage>
        )
    }
    else {
        return (
            // Layout component wrapper
            // Use <BaseHorizontal> to change layout
            <Base>
              <TransitionGroup>
                <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                    <div>
                        <Switch location={location}>
                            {/*Project Management*/}
                            <Route path="/projects" component={ProjectsList}/>
                            <Route path="/reviews" component={Reviews}/>                       
                            <Route path="/newreview" component={CreateReview}/>                       
                            <Route path="/reviewdetails/:id" component={ReviewDetails}/>
                            {/* <Route path="/manageParticipants/:id" component={ManageParticipant}/> */}
                            
                            {/*<Route path="/projectdetails/:id" component={ProjectDetails}/>
                            
                            <Route path="/modifyProject/:id" component={ModifyProject}/>*/}
                            <Route path="/newproject" component={CreateProject}/>
                            <Route path="/projectsInitialized" component={ProjectsInitialized}/> 

                            {/*Delivrables*/}
                            {/* <Route path="/delivrables" component={DelivrablesList}/> */}

                            {/* CIP */}
                            {/* <Route path="/constructabilityimplementationplan/:id" component={ConstructabilityImplementationPlan}/>
                            <Route path="/cipdashboard/:id" component={CIPDashboard}/>
                            <Route path="/constructabilityMilestone/:id" component={ConstructabilityMilestone}/>
                            <Route path="/projectMilestone/:id" component={ProjetMilestone}/>
                            <Route path="/projectContext/:id" component={ProjectContext}/>
                            <Route path="/projectScopeText/:id" component={ProjetScopeText}/>
                            <Route path="/projectScopeImage/:id" component={ProjetScopeImage}/>
                            <Route path="/teamBuilding/:id" component={TeamBuilding}/> */}

                            {/*Constructability Added Value*/}
                            {/* <Route path="/addedvalue" component={AddedValue}/> */}
                            
                            {/*Reporting*/}
                            {/* <Route path="/reporting" component={Reporting}/>
                            <Route path="/editreportReview/:id" component={EditReport}/>
                            <Route path="/newReviewSection/:id" component={NewReportSection}/> */}

                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </CSSTransition>
              </TransitionGroup>
            </Base>
        )
    }
}




export default withRouter(Routes);