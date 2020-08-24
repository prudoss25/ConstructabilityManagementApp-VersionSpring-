const MenuCIP = [
    {
        heading: 'CIP Management',
    },
    {
        name: 'CIP Dashboard',
        icon: 'icon-speedometer',
        path: '/cipdashboard',
        // label: { value: 30, color: 'success' },
    },
    {
        name: 'Milestones',
        icon: 'icon-calendar',
        submenu: [{
                name: 'Project',
                path: '/projectMilestone',
            },
            {
                name: 'Constructability',
                path: '/constructabilityMilestone',
            }
        ]
    },
    {
        name: 'Project Context',
        icon: 'icon-pencil',
        path: '/projectContext',
        // label: { value: 30, color: 'success' },
    },
    {
        name: 'Project Scope',
        icon: 'icon-note',
        submenu: [{
                name: 'Scope Text',
                path: '/projectScopeText',
            },
            {
                name: 'Scope Images',
                path: '/projectScopeImage',
            }
        ]
    },
    {
        name: 'Team Building',
        icon: 'icon-people',
        path: '/teamBuilding',
        // label: { value: 30, color: 'success' },
    },
    {
        name: 'CIP Delivrable',
        icon: 'icon-doc',
        path: '/constructabilityimplementationplan',
        // label: { value: 30, color: 'success' },
    }
    
    
];

export default MenuCIP;