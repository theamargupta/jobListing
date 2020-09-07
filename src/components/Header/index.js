import React from 'react';
import './index.scss';
import { useSelector, shallowEqual } from 'react-redux';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const { user } = useSelector(
    ({ user: { user } }) => ({
      user: user,
    }),
    shallowEqual
  );
  return (
    <div className='header'>
      <ul>
        <div className='header__left'>
          <li onClick={() => history.push('/')}>
            <button>Home</button>
          </li>
        </div>
        <div className='header__right'>
          <li onClick={() => history.push('/creation')}>
            <button>Create Jobs</button>
          </li>
          <li>
            Hi,{' '}
            <span role='img' aria-label='shakehand'>
              👋🏻
            </span>{' '}
            {user.displayName}
          </li>
          <li onClick={() => auth.signOut()}>
            <button>Sign Out</button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Header;
