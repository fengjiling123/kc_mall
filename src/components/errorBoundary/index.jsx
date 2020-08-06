import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // window.location.reload();
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            textAlign: "center",
            paddingTop: "1rem",
            lineHeight: ".5rem"
          }}
        >
          <a href="/">网络错误，点击重新加载</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
