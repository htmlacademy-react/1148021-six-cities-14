import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import CitiesTabs from './cities-tabs';
import { APP_CITIES } from '../../const';

describe('Component: CitiesTabs', () => {
  it('Should render correct', () => {
    const component = withHistory(<CitiesTabs />);

    render(component);

    expect(screen.getByTestId('citiesTabsEl')).toBeInTheDocument();
    APP_CITIES.forEach((city) => expect(screen.getByText(city)).toBeInTheDocument());
  });
});
