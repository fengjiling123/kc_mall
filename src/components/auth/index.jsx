import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import store from "@/store";

const Auth = WrappedComponent =>
  class extends React.Component {
    static displayName =
      WrappedComponent.displayName ||
      WrappedComponent.name + "_HOC" ||
      "Component_HOC";

    constructor(props) {
      super(props);
      this.state = {
        render: true
      };
      props.cacheLifecycles &&
        props.cacheLifecycles.didCache(this.componentDidCache);
      props.cacheLifecycles &&
        props.cacheLifecycles.didRecover(this.componentDidRecover);
    }

    //被缓存时生命周期
    componentDidCache = () => {
      this.setState({ render: false });
    };

    //被恢复时生命周期
    componentDidRecover = () => {
      this.setState({ render: true });
    };

    render() {
      let states = store.getState();
      let { isLogin } = states.login;
      if (!isLogin) {
        if (this.state.render) return <Redirect to="/login" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };

export default Auth;
