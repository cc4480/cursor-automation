import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { server } from './src/mocks/server';

// Configure testing-library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
});

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
  // Clear all mocks after each test
  jest.clearAllMocks();
});

// Clean up after the tests are finished
afterAll(() => server.close());

// Extend expect matchers
expect.extend({
  toHaveStyle(received, style) {
    const pass = this.equals(received.style, style);
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have style ${style}`,
      pass,
    };
  },
  toBeInTheDocument(received) {
    const pass = received !== null;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be in the document`,
      pass,
    };
  },
  toBeVisible(received) {
    const pass = received.offsetParent !== null;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be visible`,
      pass,
    };
  },
  toBeDisabled(received) {
    const pass = received.disabled === true;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be disabled`,
      pass,
    };
  },
  toBeEnabled(received) {
    const pass = received.disabled === false;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be enabled`,
      pass,
    };
  },
  toHaveFocus(received) {
    const pass = document.activeElement === received;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have focus`,
      pass,
    };
  },
  toBeEmpty(received) {
    const pass = received.innerHTML === '';
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be empty`,
      pass,
    };
  },
  toHaveTextContent(received, text) {
    const pass = received.textContent.includes(text);
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have text content ${text}`,
      pass,
    };
  },
  toHaveValue(received, value) {
    const pass = received.value === value;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have value ${value}`,
      pass,
    };
  },
  toBeChecked(received) {
    const pass = received.checked === true;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be checked`,
      pass,
    };
  },
  toBePartiallyChecked(received) {
    const pass = received.indeterminate === true;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be partially checked`,
      pass,
    };
  },
  toHaveAttribute(received, attr, value) {
    const pass = received.getAttribute(attr) === value;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have attribute ${attr} with value ${value}`,
      pass,
    };
  },
  toHaveClass(received, className) {
    const pass = received.classList.contains(className);
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have class ${className}`,
      pass,
    };
  },
  toBeInTheDOM(received) {
    const pass = received !== null;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be in the DOM`,
      pass,
    };
  },
  toHaveText(received, text) {
    const pass = received.textContent.includes(text);
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have text ${text}`,
      pass,
    };
  },
  toBeVisible(received) {
    const pass = received.offsetParent !== null;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be visible`,
      pass,
    };
  },
  toBeEmpty(received) {
    const pass = received.innerHTML === '';
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be empty`,
      pass,
    };
  },
  toBeInTheDocument(received) {
    const pass = received !== null;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be in the document`,
      pass,
    };
  },
  toHaveStyle(received, style) {
    const pass = this.equals(received.style, style);
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have style ${style}`,
      pass,
    };
  },
  toBeDisabled(received) {
    const pass = received.disabled === true;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be disabled`,
      pass,
    };
  },
  toBeEnabled(received) {
    const pass = received.disabled === false;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be enabled`,
      pass,
    };
  },
  toHaveFocus(received) {
    const pass = document.activeElement === received;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have focus`,
      pass,
    };
  },
  toHaveValue(received, value) {
    const pass = received.value === value;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have value ${value}`,
      pass,
    };
  },
  toBeChecked(received) {
    const pass = received.checked === true;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be checked`,
      pass,
    };
  },
  toBePartiallyChecked(received) {
    const pass = received.indeterminate === true;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be partially checked`,
      pass,
    };
  },
  toHaveAttribute(received, attr, value) {
    const pass = received.getAttribute(attr) === value;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have attribute ${attr} with value ${value}`,
      pass,
    };
  },
  toHaveClass(received, className) {
    const pass = received.classList.contains(className);
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}have class ${className}`,
      pass,
    };
  },
}); 