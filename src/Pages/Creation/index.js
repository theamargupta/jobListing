import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import firestore, { firebase } from '../../firebase';
import { useSelector, shallowEqual } from 'react-redux';
import CustomCheckBox from '../../components/CustomCheckBox';
import CustomMultipleCheckbox from '../../components/CustomMultipleCheckbox';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import ProgressBar from '../../components/ProgressBar';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import './index.scss';

const Creation = () => {
  const history = useHistory();
  const [Image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const [fileerror, setError] = useState(null);
  const { jobs } = useSelector(
    ({ jobs: { jobs } }) => ({
      jobs: jobs,
    }),
    shallowEqual
  );
  const handleChange = (e) => {
    const types = ['image/png', 'image/jpeg'];
    const selected = e.target.files[0];
    return selected && types.includes(selected.type)
      ? (setFile(selected), setError(''))
      : (setFile(null), setError('please select an image file (png/jpeg)'));
  };
  const handleAdd = (value) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Job Profile will be added!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add it!',
    }).then(async (result) => {
      if (result.value) {
        await firestore
          .collection('jobslist')
          .add({
            ...value,
            id: jobs[0].id + 1,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            img: Image,
            postedAt: 'Few Min Ago',
          })
          .then(() => {
            Swal.fire({
              showConfirmButton: false,
              icon: 'success',
              timer: 1000,
              title: 'Job Profile has been Added.',
            });
            history.push('/');
          });
      }
    });
  };
  return (
    <div className='create'>
      <div className='container'>
        <div className='create-page'>
          <Formik
            initialValues={{
              position: '',
              company: '',
              location: '',
              new: false,
              featured: false,
              role: '',
              level: '',
              contract: '',
              language: [],
              tools: [],
              desc: '',
            }}
            validationSchema={Yup.object({
              position: Yup.string()
                .min(3, 'Must be at least 3 character')
                .max(15, 'Less than 15 charcters')
                .required('Required'),
              company: Yup.string()
                .min(3, 'Must be at least 3 character')
                .max(15, 'Less than 15 charcters')
                .required('Required'),
              desc: Yup.string()
                .min(50, 'Must be at least 50 character')
                .max(600, 'Less than 600 charcters')
                .required('Required'),
              location: Yup.string()
                .min(3, 'Must be at least 3 character')
                .max(15, 'Less than 15 charcters')
                .required('Required'),
              new: Yup.boolean().oneOf([true, false], 'New'),
              featured: Yup.boolean().oneOf([true, false], 'Featured'),
              role: Yup.string()
                .oneOf(['Frontend', 'Backend', 'Fullstack'], 'Invalid Role')
                .required('Required'),
              contract: Yup.string()
                .oneOf(['FullTime', 'PartTime'], 'Invalid contract')
                .required('Required'),
              level: Yup.string()
                .oneOf(['Junior', 'Midweight', 'Senior'], 'Invalid Level')
                .required('Required'),
              language: Yup.array()
                .min(2, 'Must be at least 2 langauges')
                .required('Required'),
              tools: Yup.array()
                .min(2, 'Must be at least 2 tools')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleAdd(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <h3>Create Job</h3>
                {fileerror && <h2>{fileerror}</h2>}
                {file && <ProgressBar file={file} setUrl={setImage} />}
                {Image && <img src={Image} alt='' />}
                <button>
                  upload
                  <input type='file' onChange={handleChange} name='img' />
                </button>
                <CustomTextInput
                  label='Position'
                  name='position'
                  type='text'
                  placeholder='Position'
                />
                <CustomTextInput
                  label='Company'
                  name='company'
                  type='text'
                  placeholder='Company'
                />
                <CustomTextInput
                  label='Location'
                  name='location'
                  type='text'
                  placeholder='Location'
                />
                <label htmlFor='desc'>Description :</label>
                <Field
                  name='desc'
                  as='textarea'
                  placeholder='Description..'
                  rows={5}
                  cols={50}
                />
                <div>
                  <CustomSelect label='role' name='role'>
                    <option value=''>Select a role</option>
                    <option value='Frontend'>Frontend</option>
                    <option value='Backend'>Backend</option>
                    <option value='Fullstack'>Fullstack</option>
                  </CustomSelect>
                  <CustomSelect label='level' name='level'>
                    <option value=''>Select a Level</option>
                    <option value='Junior'>Junior</option>
                    <option value='Midweight'>Midweight</option>
                    <option value='Senior'>Senior</option>
                  </CustomSelect>
                  <CustomSelect label='Contract:' name='contract'>
                    <option value=''>Select a Contract</option>
                    <option value='FullTime'>Full Time</option>
                    <option value='PartTime'>Part Time</option>
                  </CustomSelect>
                </div>
                <div>
                  <label htmlFor='tools'>Tools :</label>
                  <CustomMultipleCheckbox name='tools' value='React'>
                    React
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='tools' value='Sass'>
                    Sass
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='tools' value='Vue'>
                    Vue
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='tools' value='Django'>
                    Django
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='tools' value='RoR'>
                    RoR (Ruby on Rails)
                  </CustomMultipleCheckbox>
                </div>
                <div>
                  <label htmlFor='language'>Language :</label>
                  <CustomMultipleCheckbox name='language' value='Python'>
                    Python
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='language' value='Ruby'>
                    Ruby
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='language' value='JavaScript'>
                    JavaScript
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='language' value='HTML'>
                    HTML
                  </CustomMultipleCheckbox>
                  <CustomMultipleCheckbox name='language' value='CSS'>
                    CSS
                  </CustomMultipleCheckbox>
                </div>
                <CustomCheckBox name='new'>New</CustomCheckBox>
                <CustomCheckBox name='featured'>Featured</CustomCheckBox>
                <button type='submit'>
                  {props.isSubmitting ? 'loading...' : 'submit'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Creation;

// .collection("jobslist")
// .where("contract", "==", "Part Time")
