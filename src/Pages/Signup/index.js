import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { SignUpUser, authState } from '../../redux/actionGenerator';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import ContentLoader from '../../components/ContentLoader';
import CircularLoader from '../../components/circularLoader';
import CustomCheckBox from '../../components/CustomCheckBox';
import CustomTextInput from '../../components/CustomTextInput';
import { auth, signInWithGoogle } from '../../firebase';
import { Redirect, useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
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
    dispatch(SignUpUser(value));
  };
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(authState(user));
      }
    });
  }, [dispatch]);
  // console.log(user, isLoading, error);
  return user.displayName ? (
    <Redirect to='/home' />
  ) : !isLoading ? (
    <div>
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
          <Form>
            <h1>Signup Form</h1>

            <CustomTextInput
              label='Name'
              name='name'
              type='text'
              placeholder='Amar'
            />
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
            <CustomCheckBox name='acceptedTerms'>
              I accept he terms and condition
            </CustomCheckBox>
            <button type='submit'>
              {props.isSubmitting ? 'loading...' : 'submit'}
            </button>
            <p>
              Already Signed Up ?{' '}
              <span onClick={() => history.push('/')}>Login</span>
            </p>
            <div onClick={() => signInWithGoogle()}>
              <p>Login with Google</p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <CircularLoader />
  );
};

export default Signup;
