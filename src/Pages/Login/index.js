import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { SignInUser, authState } from '../../redux/actionGenerator';
import CustomTextInput from '../../components/CustomTextInput';
import CircularLoader from '../../components/circularLoader';
import { auth, signInWithGoogle } from '../../firebase';
import { Redirect, Link } from 'react-router-dom';
import Google from '../../assets/Google__G__Logo 1.svg';
import fb from '../../assets/f_logo_RGB-Blue_72 1.svg';
import frame from '../../assets/Frame.svg';
import rectangle from '../../assets/Rectangle 5.png';
import './index.scss';

const Login = () => {
  const { user, isLoading } = useSelector(
    ({ user: { user, isLoading, error } }) => ({
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
    <div className='container_main'>
      <div className='container'>
        <div className='login-page'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid Email')
                .required('Email is Required'),
              password: Yup.string()
                .required('Password is Required')
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
              <Form className='login-form'>
                <h3 className='title'>Log In</h3>
                <CustomTextInput
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='example@test.com'
                />
                <CustomTextInput
                  label='Password'
                  name='password'
                  type='password'
                  placeholder='********'
                />
                <div className='input-options'>
                  <p className='sign-up'>
                    New to Job Listing? <Link to='/signup'>Sign up</Link>
                  </p>
                  <button type='submit' className='input-button'>
                    {props.isSubmitting ? 'loading...' : 'Log In'}
                    <img src={frame} className='btn-arrow' alt='' />
                  </button>
                </div>

                <div className='alternative-options'>
                  <small>Or log in with</small>
                  <div className='social-buttons'>
                    <button className='social-button'>
                      <img src={fb} alt='' /> Github
                    </button>
                    <button
                      className='social-button'
                      onClick={() => signInWithGoogle()}
                    >
                      <img src={Google} alt='' /> Google
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className='page-image'>
            <img src={rectangle} alt='' />
          </div>
        </div>
      </div>
    </div>
  ) : user.displayName ? (
    <Redirect to='/home' />
  ) : (
    <CircularLoader />
  );
};

export default Login;
