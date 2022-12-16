import React, { useContext } from 'react';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import cl from './Login.module.css';
import { loginUser } from '../api/ApiProvider';
import AuthContext from '../contexts';

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(10, 'Длина выше 10 символов').required('Поле обязательно'),
      password: Yup.string().required('Поле обязательно'),
    }),
    onSubmit: (values, { resetForm, setStatus }) => {
      loginUser(values)
        .then((response) => {
          const { token } = response;
          localStorage.setItem('token', token);
          setIsAuth(true);
          setStatus(null);
        })
        .catch(() => {
          setStatus('Неверный логин или пароль');
        });
      resetForm({ userName: '', password: '' });
    },
  });
  if (isAuth) return <Navigate to="/" replace />;
  return (
    <div>
      <h1>Login page</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className={cl.form}>
          <div>
            <input
              className={cl.inp}
              type="text"
              name="userName"
              id="userName"
              placeholder="Введите ваш ник"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div style={{ color: 'red' }}>{formik.errors.userName}</div>
            ) : null}
          </div>
          <div>
            <input
              className={cl.inp}
              type="password"
              name="password"
              id="password"
              placeholder="Введитe пароль"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
          </div>
          {formik.status && <div style={{ color: 'red' }}>{formik.status}</div>}
          <div>
            <button className={cl.btn} type="submit">Отправить</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
