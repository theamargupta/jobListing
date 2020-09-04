import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SignInUser, authState } from '../../redux/actionGenerator';
import CustomTextInput from '../../components/CustomTextInput';
// import ContentLoader from '../../components/ContentLoader';
import CircularLoader from '../../components/circularLoader';
import { auth } from '../../firebase';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const { user, isLoading } = useSelector(
    ({ user, isLoading, error }) => ({
      user: user,
      isLoading: isLoading,
      error: error,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const handleClick = (value) => {
    dispatch(SignInUser(value));
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(authState(user));
    });
  }, [dispatch]);
  return user.displayName ? (
    <Redirect to='/home' />
  ) : !isLoading ? (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid Email').required('Required'),
          password: Yup.string()
            .required()
            .min(2, 'Seems a bit short...')
            .max(10, 'We prefer insecure system, try a shorter password.'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleClick(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <h1>Login Form</h1>

            <CustomTextInput
              label='Email'
              name='email'
              type='email'
              placeholder='theamargupta.tech@gmail.com'
            />
            <CustomTextInput
              label='Password'
              name='password'
              type='password'
              placeholder='********'
            />
            <button type='submit'>
              {props.isSubmitting ? 'loading...' : 'submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <CircularLoader />
  );
};

export default Login;
