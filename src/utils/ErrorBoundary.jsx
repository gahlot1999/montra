import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Message from '../components/message/Message';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [location.key]);

  return (
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError}>
      {children}
    </ErrorBoundaryInner>
  );
}

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasError && !this.props.hasError) {
      this.setState({
        hasError: false,
        error: null,
      });
    }
  }

  componentDidCatch(error) {
    this.props.setHasError(true);
    this.setState({ hasError: true, error });
  }

  render() {
    return this.state.hasError ? (
      <Message
        variant='full'
        error={true}
        title='Something went wrong'
        message={this?.state?.error?.message}
        info={this?.state?.error?.stack}
        buttonText='Go Back'
      />
    ) : (
      this.props.children
    );
  }
}
