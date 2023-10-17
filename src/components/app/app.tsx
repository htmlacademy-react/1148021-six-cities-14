import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  offersCount: number;
};

export default function App({ offersCount }: AppProps): JSX.Element {
  return <MainPage offersCount={offersCount} />;
}
