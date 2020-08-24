import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Collapse, Badge } from 'reactstrap';

import SidebarRun from './Sidebar.run';
import MenuCIP from '../../MenuCIP';

/** Component to display headings on sidebar */
const SidebarItemHeader = ({item}) => (
    <li className="nav-heading">
        <span>{item.heading}</span>
    </li>
)

const listofPages = [
    'constructabilityimplementationplan',
    'cipdashboard',
    'constructabilityMilestone',
    'projectMilestone',
    'projectContext',
    'projectScopeText',
    'projectScopeImage',
    'teamBuilding'
];


/** Normal items for the sidebar */
const SidebarItem = ({item, isActive,id}) => (
    <li className={ isActive ? 'active' : '' }>
        <Link to={item.path+'/'+id} title={item.name}>
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span>{item.name}</span>
        </Link>
    </li>
)

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({item, isActive, handler, children, isOpen}) => (
    <li className={ isActive ? 'active' : '' }>
        <div className="nav-item" onClick={ handler }>
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span>{item.name}</span>
        </div>
        <Collapse isOpen={ isOpen }>
            <ul id={item.path} className="sidebar-nav sidebar-subnav">
                { children }
            </ul>
        </Collapse>
    </li>
)

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({item}) => (
    <li className="sidebar-subnav-header">{item.name}</li>
)

class Sidebar extends Component {
        state = {
            collapse: {}
        }
        
        componentDidMount() {
            // pass navigator to access router api
            SidebarRun(this.navigator.bind(this));
            // prepare the flags to handle menu collapsed states
            this.buildCollapseList()
        }

        /** prepare initial state of collapse menus. Doesnt allow same route names */
        buildCollapseList = () => {
        let collapse = {};
        MenuCIP
            .filter(({heading}) => !heading)
            .forEach(({name, path, submenu}) => {
                collapse[name] = this.routeActive(submenu ? submenu.map(({path})=>path) : path)
            })
        this.setState({collapse});
        }

        navigator(route) {
            this.props.history.push(route);
        }
        routeActive(paths,id) {
            paths = Array.isArray(paths) ? paths : [paths];
            return paths.some(p =>
                this.props.location.pathname.indexOf(p+'/'+id) > -1 )
        }
    
        toggleItemCollapse(stateName) {
            for (let c in this.state.collapse) {
                if (this.state.collapse[c] === true && c !== stateName)
                    this.setState({
                        collapse: {
                            [c]: false
                        }
                    });
            }
            this.setState({
                collapse: {
                    [stateName]: !this.state.collapse[stateName]
                }
            });
        }
    

    getSubRoutes = item => item.submenu.map(({path}) => path)

    /** map menu config to string to determine what elemetn to render */
    itemType = item => {
        if (item.heading) return 'heading';
        if (!item.submenu) return 'menu';
        if (item.submenu) return 'submenu';
    }
    
    
    render() {
        const pathname = this.props.location.pathname.split("/")
        const sideBarMenu = listofPages.indexOf(pathname[1]) > -1 ? 
        <ul className="sidebar-nav">
            { /* Iterates over all sidebar items */ }
                {
                MenuCIP.map((item, i) => {
                        // heading
                        if(this.itemType(item) === 'heading')
                            return (
                                <SidebarItemHeader item={item} key={i} />
                            )
                        else {
                            if(this.itemType(item) === 'menu')
                            {
                                // console.log('routeActive')
                                // console.log(item.path)
                                // console.log(location.pathname)
                                // console.log(pathname[2])
                                return (
                                    <SidebarItem isActive={this.routeActive(item.path,pathname[2])} item={item} key={i} id={pathname[2]}/>
                                )
                            }
                            if(this.itemType(item) === 'submenu')
                                return [
                                    <SidebarSubItem item={item} isOpen={this.state.collapse[item.name]} handler={ this.toggleItemCollapse.bind(this, item.name) } isActive={this.routeActive(this.getSubRoutes(item),pathname[2])} key={i}>
                                        <SidebarSubHeader item={item} key={i}/>
                                        {
                                            item.submenu.map((subitem, i) =>
                                                <SidebarItem key={i} item={subitem} isActive={this.routeActive(subitem.path,pathname[2])} id={pathname[2]}/>
                                            )
                                        }
                                    </SidebarSubItem>
                                ]
                        }
                        return null; // unrecognized item
                    })
                }
        </ul> : <ul className="sidebar-nav"></ul>
        return (
            <aside className='aside-container'>
                { /* START Sidebar (left) */ }
                <div className="aside-inner">
                    <nav data-sidebar-anyclick-close="" className="sidebar">
                        { /* START sidebar nav */ }
                        {sideBarMenu}
                        { /* END sidebar nav */ }
                    </nav>
                </div>
                { /* END Sidebar (left) */ }
            </aside>
        );
    }
}



export default withRouter(Sidebar) ;
