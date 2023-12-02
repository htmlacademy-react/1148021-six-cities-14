import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus } from '../../store/user/user.selectors';
import Preloader from '../preloader/preloader';
import classNames from 'classnames';

// без него проще выходит, но может потом пригодится
function Layout() {
  const isCheckedAuth = useAppSelector(getAuthCheckedStatus);
  const pageClasses = classNames(
    'page'
    // {'page--gray': isMain},
    // {'page--main': isMain},
    // {'page--favorites-empty': isFav && isFaveEmpty},
  );

  return (
    <div className={pageClasses}>
      <Header />

      {isCheckedAuth ? <Outlet /> : <Preloader />}
    </div>
  );
}

export default Layout;
