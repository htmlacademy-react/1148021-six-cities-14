import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-route';

describe('[Component History-router]:', () => {
  it('Should render correct', () => {
    const basename = '/';
    const expectedText = /Test text/i;
    const children = <span>Test text</span>;
    const mockHistory = createMemoryHistory();
    const component = (
      <HistoryRouter history={mockHistory} basename={basename}>
        {children}
      </HistoryRouter>
    );

    render(component);
    const expectEl = screen.getByText(expectedText);

    expect(expectEl).toBeInTheDocument();
  });
});
