import React from "react";
import { formatMessage } from "./i18n";
import { injectIntl } from "react-intl";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // update the state to show the failover UI at next render
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Just log for now, could be reported elsewhere
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>{formatMessage(this.props.intl, "core", "common.errorBoundary")}</h1>;
      // return <h1>An error was not properly caught. Refer to console log.</h1>;
    }
    return this.props.children;
  }
}

export default injectIntl(ErrorBoundary);
