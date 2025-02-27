import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { SignUpUser, authState } from '../../redux/actionGenerator';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CircularLoader from '../../components/circularLoader';
import CustomCheckBox from '../../components/CustomCheckBox';
import CustomTextInput from '../../components/CustomTextInput';
import { auth, signInWithGoogle, signInWithGithub } from '../../firebase';
import { Redirect, Link } from 'react-router-dom';
import Google from '../../assets/Google__G__Logo 1.svg';
import Github from '../../assets/GitHub-Mark-64px.png';
import frame from '../../assets/Frame.svg';
import rectangle from '../../assets/Rectangle 5.png';
import '../Login/index.scss';

const Signup = () => {
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
    dispatch(SignUpUser(value));
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(authState(user));
      }
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
              name: '',
              email: '',
              password: '',
              acceptedTerms: false,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(3, 'Must be at least 3 character')
                .max(15, 'Less than 15 charcters')
                .required('Name is Required'),
              email: Yup.string()
                .email('Invalid Email')
                .required('Email is Required'),
              acceptedTerms: Yup.boolean()
                .oneOf([true], 'You must accept the terms and condition')
                .required('You must accept the terms and condition'),
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
                <h3 className='title'>Sign Up</h3>
                <CustomTextInput
                  label='Name'
                  name='name'
                  type='text'
                  placeholder='Name'
                  className='form-input'
                />
                <CustomTextInput
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='example@test.com'
                  className='form-input'
                />
                <CustomTextInput
                  label='Password'
                  name='password'
                  type='password'
                  placeholder='********'
                  className='form-input'
                />
                <CustomCheckBox name='acceptedTerms'>
                  &nbsp; I accept he terms and condition
                </CustomCheckBox>
                <div className='input-options'>
                  <p className='sign-up'>
                    Already a User? <Link to='/'>Log In</Link>
                  </p>
                  <button type='submit' className='input-button'>
                    {props.isSubmitting ? 'loading...' : 'Sign up'}
                    <img src={frame} className='btn-arrow' alt='' />
                  </button>
                </div>

                <div className='alternative-options'>
                  <small>Or log in with</small>
                  <div className='social-buttons'>
                    <button
                      className='social-button'
                      onClick={() => signInWithGithub()}
                    >
                      <img src={Github} alt='' /> Github
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

export default Signup;
