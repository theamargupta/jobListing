import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { SignUpUser, authState } from '../../redux/actionGenerator';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CircularLoader from '../../components/circularLoader';
import CustomCheckBox from '../../components/CustomCheckBox';
import CustomTextInput from '../../components/CustomTextInput';
import { auth, signInWithGoogle } from '../../firebase';
import { Redirect, Link } from 'react-router-dom';
import Google from '../../assets/Google__G__Logo 1.svg';
import fb from '../../assets/f_logo_RGB-Blue_72 1.svg';
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
                .required('Required'),
              email: Yup.string().email('Invalid Email').required('Required'),
              acceptedTerms: Yup.boolean()
                .oneOf([true], 'You must accept the terms and condition')
                .required('Required'),
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
              <Form className='login-form'>
                <h3 className='title'>Sign Up</h3>
                <CustomTextInput
                  label='Name'
                  name='name'
                  type='text'
                  placeholder='Name'
                />
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
                <CustomCheckBox name='acceptedTerms'>
                  &nbsp; I accept he terms and condition
                </CustomCheckBox>
                <div class='input-options'>
                  <p class='sign-up'>
                    Already a User? <Link to='/'>Log In</Link>
                  </p>
                  <button type='submit' class='input-button'>
                    {props.isSubmitting ? 'loading...' : 'Sign up'}
                    <img src={frame} class='btn-arrow' alt='' />
                  </button>
                </div>

                <div class='alternative-options'>
                  <small>Or log in with</small>
                  <div class='social-buttons'>
                    <button class='social-button'>
                      <img src={fb} alt='' /> Github
                    </button>
                    <button
                      class='social-button'
                      onClick={() => signInWithGoogle()}
                    >
                      <img src={Google} alt='' /> Google
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div class='page-image'>
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
