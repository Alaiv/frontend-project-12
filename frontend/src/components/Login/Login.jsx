import React from 'react';
import {
  useFormik,
} from 'formik';
import * as Yup from 'yup';
import cl from './Login.module.css';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().max(10, 'Длина выше 10 символов').required('Поле обязательно'),
      password: Yup.string().required('Поле обязательно'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm({ userName: '', password: '' });
    },
  });

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
              placeholder="Введит пароль"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <button className={cl.btn} type="submit">Отправить</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
