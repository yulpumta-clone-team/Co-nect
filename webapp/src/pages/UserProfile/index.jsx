import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserProfile(props) {
  return (
    <div>
      <Link to="./edit" state={{ userId: 'temp' }}>
        Edit
      </Link>
      MyProfile
    </div>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
