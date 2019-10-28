import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import SidebarItem from '../components/Sidebar/SideBarItem/SdeBarItem';

class MainLayout extends React.Component {

    state = {
        CurrentUser: ""
    }


    render() {
        return (
            <div className="MainLayout">
                <Sidebar classes="SideBar-orange">
                    <SidebarItem active={true}>Home</SidebarItem>
                    <SidebarItem>Profile</SidebarItem>
                </Sidebar>
                <div>
                    content
                </div>
                <Sidebar classes="SideBar-darkBlue">
                    <SidebarItem>Suplies</SidebarItem>
                    <SidebarItem active={true}>Location</SidebarItem>
                    <SidebarItem>Memebrs</SidebarItem>
                    <SidebarItem>Games</SidebarItem>
                    <SidebarItem>Photos</SidebarItem>
                </Sidebar>
            </div>
        );
    }
}

export default MainLayout;