import React, { useContext } from 'react';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cl from './Login.module.css';
import { loginUser } from '../api/ApiProvider';
import { AuthContext } from '../contexts';

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
          const { token, username } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          setIsAuth(true);
          setStatus(null);
        })
        .catch((e) => {
          console.log(e);
          setStatus('Неверный логин или пароль');
        });
      resetForm({ userName: '', password: '' });
    },
  });
  if (isAuth) return <Navigate to="/" replace />;
  return (
    <div>
      <h1>Login page</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Введите ваш ник</Form.Label>
          <Form.Control
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
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Введите ваш пароль</Form.Label>
          <Form.Control
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
        </Form.Group>
        {formik.status && <div style={{ color: 'red' }}>{formik.status}</div>}
        <Button variant="primary" type="submit">Войти</Button>
      </Form>
    </div>
  );
};

export default Login;
