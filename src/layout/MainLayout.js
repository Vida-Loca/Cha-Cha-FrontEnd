import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SidebarItem from '../components/Sidebar/SideBarItem/SdeBarItem';

class MainLayout extends React.Component {

    state = {
        mainNav : {
            Home: true,
            Profile: false,
            Admin: false
        },
        EventNav: {
            Suplies: false,
            Location: false,
            Members: false,
            Photos: false,
            Forum: false,
            Games: false
        }

    }


    changeActivityMainNav = (linkName) =>{
        const updatedNavLinks = {
            ...this.state.mainNav
        };
        let navItemNames = Object.keys(updatedNavLinks);
        navItemNames.map(item => {
            updatedNavLinks[item] = false;
        });
        updatedNavLinks[linkName] = true;
        this.setState({mainNav: updatedNavLinks});
        
    }

    changeActivityEventNav = (linkName) =>{
        const updatedNavLinks = {
            ...this.state.EventNav
        };
        let navItemNames = Object.keys(updatedNavLinks);
        navItemNames.map(item => {
            updatedNavLinks[item] = false;
        });
        updatedNavLinks[linkName] = true;
        this.setState({EventNav: updatedNavLinks});
        
    }

    render() {
        
        return (
            <div className="MainLayout">
                <Sidebar classes="SideBar-orange" navlinks={this.state.mainNav} clicked={this.changeActivityMainNav} />
                <div>
                    content
                </div>
                <Sidebar classes="SideBar-darkBlue" navName="EventNav" navlinks={this.state.EventNav} clicked={this.changeActivityEventNav} />
            </div>
        );
    }
}

export default MainLayout;