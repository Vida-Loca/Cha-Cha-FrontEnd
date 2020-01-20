import React, { Component } from "react";
import { Route } from "react-router-dom";
import Supply from "./Supply/Supply";
import Location from "./Location/Location";
import Members from "./Members/Members";
import "./Event.scss";
import { userService } from "../../Authentication/service";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { eventName: "" };
  }

  componentDidMount() {
    userService
      .getEventById(this.props.match.params.id)
      .then(body => {
        return body;
      })
      .then(res => {
        this.setState({ eventName: res.name });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1 className="EventName">{this.state.eventName}</h1>
        <Route
          path={`${this.props.match.path}/suplies`}
          exact
          render={({ id }) => <Supply id={this.props.match.params.id} />}
        />
        <Route
          path={`${this.props.match.path}/location`}
          exact
          render={({ id }) => <Location id={this.props.match.params.id} />}
        />
        <Route
          path={`${this.props.match.path}/members`}
          exact
          render={({ id }) => <Members id={this.props.match.params.id} />}
        />
      </div>
    );
  }
}

export default Event;
