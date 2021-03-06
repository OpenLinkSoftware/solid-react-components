import React, { Component } from "react";
import { withWebId } from "@solid/react";
import { Redirect, Route } from "react-router-dom";

import { Loader } from "./private-route.style";

type Props = {
  webId?: String,
  redirect: String,
  component: Node,
  loaderComponent: Node
};

class PrivateRoute extends Component<Props> {
  renderRouter = (): React.Element => {
    const { webId, redirect, component: Component, ...rest } = this.props;
    return webId ? (
      <Route {...rest} component={Component} />
    ) : (
      <Redirect to={redirect} />
    );
  };

  render() {
    return this.props.webId === undefined
      ? this.props.loaderComponent()
      : this.renderRouter();
  }
}

PrivateRoute.defaultProps = {
  redirect: "/login",
  loaderComponent: () => (
    <Loader className="auth-loader">We are validating your data...</Loader>
  )
};

export default withWebId(PrivateRoute);
