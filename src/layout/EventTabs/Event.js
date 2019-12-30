import React, { Component } from "react";
import { Route } from "react-router-dom";
import Supply from "./Supply/Supply";
import Location from "./Location/Location";
import Members from "./Members/Members";
import "./Event.scss";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { eventName: "" };
  }

  componentDidMount() {
    console.log("hi");

    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(response => response.json())
      .then(json => this.setState({ eventName: json.name }));
  }

  render() {
    return (
      <div>
        <h1 className="EventName">{this.state.eventName}</h1>
        <Route
          path={`${this.props.match.path}/suplies`}
          exact
          render={() => <Supply />}
        />
        <Route
          path={`${this.props.match.path}/location`}
          exact
          render={() => <Location />}
        />
        <Route
          path={`${this.props.match.path}/members`}
          exact
          render={() => <Members />}
        />
      </div>
    );
  }
}

export default Event;
