import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import {BrowserRouter, Route} from 'react-router-dom';

class MainLayout extends React.Component {

    state = {
        mainNav : [
            'Home',
            'Profile',
            'Admin'
        ],
        EventNav: [
            'Suplies',
            'Location',
            'Members',
            'Photos',
            'Forum',
            'Games'
        ]

    }


    render() {
        
        return (
            <div className="MainLayout">
                <BrowserRouter>
                <Sidebar classes="SideBar-orange" navlinks={this.state.mainNav} />
                <div>
        
                <Route path="/home" exact render={() => <h1>this is Home</h1>} />
                <Route path="/profile" exact render={() => <h1>this is Home</h1>} />
                <Route path="/admin" exact render={() => <h1>this is Admin</h1>} />
                <Route path="/suplies" exact render={() => <h1>this is Suplies</h1>} />
                <Route path="/location" exact render={() => <h1>this is Location</h1>} />
                <Route path="/members" exact render={() => <h1>this is Memebrs</h1>} />
                <Route path="/photos" exact render={() => <h1>this is Photos</h1>} />
                <Route path="/forum" exact render={() => <h1>this is Forum</h1>} />
                <Route path="/games" exact render={() => <h1>this is Games</h1>} />

                </div>
                <Sidebar classes="SideBar-darkBlue" navName="EventNav" navlinks={this.state.EventNav} />
                </BrowserRouter>
            </div>
        );
    }
}

export default MainLayout;