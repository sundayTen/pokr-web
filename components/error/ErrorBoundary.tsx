import Button from '@components/common/button';
import Text from '@components/common/text';
import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: Error | boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error | boolean) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log({ error, errorInfo });
  }

  reset() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Text weight="NORMAL" variant="H2">
            예상치 못한 에러가 발생했다...
          </Text>
          <Button label="홈으로 가기" onClick={this.reset} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
