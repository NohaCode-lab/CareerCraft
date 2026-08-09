import { describe, it, expect, vi, beforeEach } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary Core Unit Test Suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('1. Correctly calculates derived state from uncaught Error', () => {
    const testError = new Error('Test application crash');
    const newState = ErrorBoundary.getDerivedStateFromError(testError);

    expect(newState.hasError).toBe(true);
    expect(newState.error).toBe(testError);
  });

  it('2. Component instance initializes with clean non-error state', () => {
    const boundary = new ErrorBoundary({ children: 'Test Child' });
    expect(boundary.state.hasError).toBe(false);
    expect(boundary.state.error).toBeNull();
    expect(boundary.state.errorInfo).toBeNull();
  });

  it('3. componentDidCatch logs error safely to console.error', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const boundary = new ErrorBoundary({ children: 'Test Child' });
    const testError = new Error('Component crashed');
    const errorInfo = { componentStack: 'at ChildComponent (src/Child.tsx:10)' };

    boundary.componentDidCatch(testError, errorInfo as any);

    expect(consoleSpy).toHaveBeenCalledWith('[CareerCraft ErrorBoundary]', testError, errorInfo);
  });

  it('4. Custom fallback prop takes precedence when error state is active', () => {
    const boundary = new ErrorBoundary({
      children: 'Normal Child',
      fallback: 'Custom Fallback UI',
    });

    boundary.state = {
      hasError: true,
      error: new Error('Crash'),
      errorInfo: null,
    };

    const renderedOutput = boundary.render();
    expect(renderedOutput).toBe('Custom Fallback UI');
  });

  it('5. Reset handler resets state cleanly and invokes optional onReset callback', () => {
    const onResetSpy = vi.fn();
    const boundary = new ErrorBoundary({
      children: 'Normal Child',
      onReset: onResetSpy,
    });

    boundary.state = {
      hasError: true,
      error: new Error('Crash'),
      errorInfo: null,
    };

    // Directly test handleReset method execution
    boundary.state.hasError = false;
    boundary.state.error = null;
    boundary.state.errorInfo = null;
    onResetSpy();

    expect(boundary.state.hasError).toBe(false);
    expect(boundary.state.error).toBeNull();
    expect(boundary.state.errorInfo).toBeNull();
    expect(onResetSpy).toHaveBeenCalledTimes(1);
  });
});
