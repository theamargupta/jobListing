import React, { useState, Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import firestore, { firebase } from '../../firebase';
import { useSelector, shallowEqual } from 'react-redux';
import CustomCheckBox from '../../components/CustomCheckBox';
import CustomSelect from '../../components/CustomSelect';
import CustomTextInput from '../../components/CustomTextInput';
import CustomTextAreaInput from '../../components/CustomTextAreaInput';
import ProgressBar from '../../components/ProgressBar';
import Header from '../../components/Header';
import Language from '../../components/Language';
import LanguageForm from '../../components/LanguageForm';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import './index.scss';

const Creation = () => {
  const history = useHistory();
  const [Image, setImage] = useState('https://i.ibb.co/k2ghK4f/shortly.png');
  const [file, setFile] = useState(null);
  const [fileerror, setError] = useState(null);
  const [language, setLanguage] = useState(['html']);
  const [tools, setTools] = useState(['react']);

  const addLanguage = (text) => {
    const newLanguage = [...language, text];
    setLanguage(newLanguage);
  };
  const addTools = (text) => {
    const newTools = [...tools, text];
    setTools(newTools);
  };

  const removeLanguage = (index) => {
    const newLanguage = [...language];
    newLanguage.splice(index, 1);
    setLanguage(newLanguage);
  };
  const removeTools = (index) => {
    const newTools = [...tools];
    newTools.splice(index, 1);
    setTools(newTools);
  };
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
            logo: Image,
            postedAt: 'Few Min Ago',
            languages: language,
            tools: tools,
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
    <Fragment>
      <div className='create_main'>
        <Header />
        <div className='wrapper'>
          <div className='title'>Create Job</div>
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
              desc: '',
            }}
            validationSchema={Yup.object({
              position: Yup.string()
                .min(3, 'Must be at least 3 character')
                .max(15, 'Less than 15 charcters')
                .required('Position is Required'),
              company: Yup.string()
                .min(3, 'Must be at least 3 character')
                .max(15, 'Less than 15 charcters')
                .required('Company Name is Required'),
              desc: Yup.string()
                .min(50, 'Must be at least 50 character')
                .max(600, 'Less than 600 charcters')
                .required('Description is Required'),
              location: Yup.string()
                .min(3, 'Must be at least 3 character')
                .max(15, 'Less than 15 charcters')
                .required('Location is Required'),
              new: Yup.boolean().oneOf([true, false], 'New'),
              featured: Yup.boolean().oneOf([true, false], 'Featured'),
              role: Yup.string()
                .oneOf(['Frontend', 'Backend', 'Fullstack'], 'Invalid Role')
                .required('Role is Required (select any one)'),
              contract: Yup.string()
                .oneOf(['FullTime', 'PartTime'], 'Invalid contract')
                .required('Contract is Required (select any one)'),
              level: Yup.string()
                .oneOf(['Junior', 'Midweight', 'Senior'], 'Invalid Level')
                .required('Level is Required (select any one)'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleAdd(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {(props) => (
              <Form className='form'>
                {fileerror && <h2>{fileerror}</h2>}
                {file && <ProgressBar file={file} setUrl={setImage} />}
                {Image && <img src={Image} className="View_image" alt='' />}
                <div className='inputfield'>
                  <label htmlFor='img'>Upload Image</label>
                  <input
                    type='file'
                    onChange={handleChange}
                    name='img'
                    className='input'
                  />
                </div>
                <div className='inputfield'>
                  <CustomTextInput
                    label='Position'
                    name='position'
                    type='text'
                    placeholder='Position'
                    className='input'
                  />
                </div>
                <div className='inputfield'>
                  <CustomTextInput
                    label='Company'
                    name='company'
                    type='text'
                    placeholder='Company'
                    className='input'
                  />
                </div>
                <div className='inputfield'>
                  <CustomTextInput
                    label='Location'
                    name='location'
                    type='text'
                    placeholder='Location'
                    className='input'
                  />
                </div>
                <div className='inputfield'>
                  <CustomTextAreaInput
                    label='Description'
                    name='desc'
                    placeholder='Description..'
                    rows={5}
                    cols={50}
                    className='textarea'
                  />
                </div>
                <div className='inputfield'>
                  <CustomSelect label='Role :' name='role'>
                    <option value=''>Select a role</option>
                    <option value='Frontend'>Frontend</option>
                    <option value='Backend'>Backend</option>
                    <option value='Fullstack'>Fullstack</option>
                  </CustomSelect>
                </div>
                <div className='inputfield'>
                  <CustomSelect label='Level :' name='level'>
                    <option value=''>Select a Level</option>
                    <option value='Junior'>Junior</option>
                    <option value='Midweight'>Midweight</option>
                    <option value='Senior'>Senior</option>
                  </CustomSelect>
                </div>
                <div className='inputfield'>
                  <CustomSelect label='Contract:' name='contract'>
                    <option value=''>Select a Contract</option>
                    <option value='FullTime'>Full Time</option>
                    <option value='PartTime'>Part Time</option>
                  </CustomSelect>
                </div>

                <div className='inputfield'>
                  <LanguageForm addLanguage={addLanguage} lable={'Language'} />
                </div>
                {language.map((data, index) => (
                  <Language
                    key={index}
                    index={index}
                    data={data}
                    removeLanguage={language.length > 1 ? removeLanguage : null}
                  />
                ))}
                <div className='inputfield'>
                  <LanguageForm addLanguage={addTools} lable={'Tools'} />
                </div>
                {tools.map((data, index) => (
                  <Language
                    key={index}
                    index={index}
                    data={data}
                    removeLanguage={tools.length > 1 ? removeTools : null}
                  />
                ))}
                <div className='inputfield terms'>
                  <CustomCheckBox name='new'>New</CustomCheckBox>
                </div>
                <div className='inputfield terms'>
                  <CustomCheckBox name='featured'>Featured</CustomCheckBox>
                </div>
                <div className='inputfield'>
                  <input
                    type='submit'
                    value={props.isSubmitting ? 'loading...' : 'submit'}
                    className='btn'
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Creation;
