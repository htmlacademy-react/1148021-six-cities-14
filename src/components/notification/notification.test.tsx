import { render, screen } from '@testing-library/react';
import { Notification } from './notification';

describe('Component: Notification', () => {
  it('Should render correct', () => {
    const mockError = 'Mock error';
    render(<Notification error={mockError} />);

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });
});
