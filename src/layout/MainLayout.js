import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Modal from '../components/Modal/Modal';
import Input from '../components/Input/Input';
import Form from '../components/Form/Form';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import Home from './Home/Home';
import Profile from './Profile/Profile';

class MainLayout extends React.Component {

    state = {
        mainNav : [
            ['Home','fas fa-home'],
            ['Profile','fas fa-user-alt'],
            ['Admin','fas fa-user-shield']
        ],
        EventNav: [
            ['Suplies','fas fa-box-open'],
            ['Location','fas fa-map-marker-alt'],
            ['Members','fas fa-users'],
            ['Photos', 'fas fa-images'],
            ['Forum','fas fa-comments'],
            ['Games', 'fas fa-gamepad']
        ]

    }


    render() {
        
        return (
            <div className="MainLayout">
            <Modal show={this.state.show} modalClose={this.hideModal}>
                <p>hello</p>
            </Modal>

                <BrowserRouter>
                <Sidebar classes="SideBar-orange" navlinks={this.state.mainNav} />
                <div>
                    <Route path="/" exact render={() => <Redirect to="/home" /> } />
                    <Route path="/home" exact component={Home} />
                    <Route path="/profile" exact component={Profile} />
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