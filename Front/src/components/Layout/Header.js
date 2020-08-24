import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem } from 'reactstrap';
import ToggleState from '../Common/ToggleState';
import TriggerResize from '../Common/TriggerResize';
import HeaderRun from './Header.run'

class Header extends Component {

    componentDidMount() {

        HeaderRun();

    }

   

    render() {
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav className="navbar topnavbar">
                    { /* START navbar header */ }
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            <div className="brand-logo">
                                <img className="img-fluid" src="img/Logo.png" width="70" height="20" alt="App Logo" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid" src="img/Logo.png" width="45" height="20" alt="App Logo" />
                            </div>
                        </a>
                    </div>
                    { /* END navbar header */ }
                    { /* START Left navbar */ }
                    <ul className="navbar-nav mr-auto flex-row">
                        <li className="nav-item">
                            { /* Button used to collapse the left sidebar. Only visible on tablet and desktops */ }
                            <TriggerResize>
                                <ToggleState state="aside-collapsed">
                                    <a href="" className="nav-link d-none d-md-block d-lg-block d-xl-block">
                                        <em className="fas fa-bars"></em>
                                    </a>
                                </ToggleState>
                            </TriggerResize>
                            
                        </li>
                    </ul>
                    { /* END Left navbar */ }
                    { /* START Right Navbar */ }
                    <ul className="navbar-nav flex-row"> 
                    <UncontrolledDropdown nav inNavbar className="dropdown-list">
                            <DropdownToggle nav className="dropdown-toggle-nocaret">
                                    Constructability Project Management
                            </DropdownToggle>
                            { /* START PM Dropdown menu */ }
                            <DropdownMenu right className="dropdown-menu-right animated flipInX">
                                <DropdownItem>
                                    { /* START list group */ }
                                    <ListGroup>
                                       <ListGroupItem  onClick={e => e.preventDefault()}>
                                           <Link to="/projects" className="text-inherit">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="m-0">Projects List</p>
                                                    </div>
                                                </div>
                                           </Link>
                                          
                                       </ListGroupItem>
                                       <ListGroupItem  onClick={e => e.preventDefault()}>
                                           <Link to="/delivrables" className="text-inherit">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="m-0">Delivrables</p>
                                                    </div>
                                                </div>
                                           </Link>
                                          
                                       </ListGroupItem>
                                       <ListGroupItem  onClick={e => e.preventDefault()}>
                                           <Link to="/reviews" className="text-inherit">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="m-0">Reviews</p>
                                                    </div>
                                                </div>
                                           </Link>
                                          
                                       </ListGroupItem>
                                    </ListGroup>
                                    { /* END list group */ }
                                </DropdownItem>
                            </DropdownMenu>
                            { /* END PM Dropdown menu */ }
                        </UncontrolledDropdown>
                        { /* END Alert menu */ }   
                         
                        <li className="nav-item">
                            <Link to="/addedvalue" className="nav-link"> Constructability Added Value </Link>
                        </li>         
                        <li className="nav-item">
                            <Link to="/reporting" className="nav-link"> Reporting</Link>
                        </li>              
                        { /* START Alert menu */ }
                        <UncontrolledDropdown nav inNavbar className="dropdown-list">
                            <DropdownToggle nav className="dropdown-toggle-nocaret">
                                <em className="icon-user"></em>
                            </DropdownToggle>
                            { /* START Dropdown menu */ }
                            <DropdownMenu right className="dropdown-menu-right animated flipInX">
                                <DropdownItem>
                                    { /* START list group */ }
                                    <ListGroup>
                                       <ListGroupItem  onClick={e => e.preventDefault()}>
                                          <div className="media">
                                             <div className="align-self-start mr-2">
                                                <em className="fas fa-user fa-2x text-info"></em>
                                             </div>
                                             <div className="media-body">
                                                <p className="m-0">Tarik Bakeli</p>
                                                <p className="m-0 text-muted text-sm">Home Office Manager</p>
                                             </div>
                                          </div>
                                       </ListGroupItem>

                                       <ListGroupItem  onClick={e => e.preventDefault()}>
                                          <span className="d-flex align-items-center">
                                             <span className="text-sm icon-logout"> Log out</span>
                                          </span>
                                       </ListGroupItem>
                                    </ListGroup>
                                    { /* END list group */ }
                                </DropdownItem>
                            </DropdownMenu>
                            { /* END Dropdown menu */ }
                        </UncontrolledDropdown>
                        { /* END Alert menu */ }
                      
                    </ul>
                    { /* END Right Navbar */ }

                </nav>
                { /* END Top Navbar */ }
            </header>
            );
    }

}

export default Header;
