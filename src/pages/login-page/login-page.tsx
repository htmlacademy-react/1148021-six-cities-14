import { Helmet } from 'react-helmet-async';
import LogoLink from '../../components/logo-link/logo-link';
import { APP_TITLE, AppRoute } from '../../const';
import React, { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginAction } from '../../store/api-actions';
import { getIsAuthorized } from '../../store/user/user.selectors';
import { Link, Navigate } from 'react-router-dom';
import { getRandomCity } from '../../utils/utils';
import { showNotification } from '../../components/notification/show-notification';

function LoginPage(): React.ReactNode {
  const testDigit = /[0-9]{1,}/;
  const testLetter = /[a-zA-Z]{1,}/;
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const randomCity = getRandomCity();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!loginRef.current || !passwordRef.current) {
      return false;
    }

    const login = loginRef.current.value;
    const password = passwordRef.current.value;

    if (!testDigit.test(password) || !testLetter.test(password)) {
      showNotification('password should contain atleast one number and one special character');
      return false;
    }

    dispatch(loginAction({ login, password }));
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>{APP_TITLE} - Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <LogoLink />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  ref={loginRef}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="loginFieldEl"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid="passwordFieldEl"
                />
              </div>
              <button className="login__submit form__submit button" type="submit" data-testid="loginBtnEl">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/${randomCity}`}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function LoginWithAuthCheckPage(): React.ReactNode {
  return useAppSelector(getIsAuthorized) ? <Navigate to={AppRoute.Main} /> : <LoginPage />;
}
