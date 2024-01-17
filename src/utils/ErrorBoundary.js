import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorMessage) {
    console.error(error, errorMessage);
  }

  render() {
    if (this.state.hasError) {
      return <div>{this.state.errorMessage}</div>;
    }
    return this.props.children;
  }
}
