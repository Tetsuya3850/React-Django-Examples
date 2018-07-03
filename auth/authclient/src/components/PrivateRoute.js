import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

let PrivateRoute = ({ component: Component, isAuthed, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isAuthed) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

const mapStateToProps = state => {
  return state;
};

PrivateRoute = connect(
  mapStateToProps,
  null
)(PrivateRoute);

export default withRouter(PrivateRoute);
