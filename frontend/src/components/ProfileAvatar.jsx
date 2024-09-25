import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
export default function ProfileAvatar({ width = '70px' }) {
  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('Himanshu Upadhyay');

  useEffect(() => {
    if (user) {
      setProfile(user.profile || '');
      setName(user.fullName || 'Himanshu Upadhyay');
    }
    console.log('inside useEffect', name);
    console.log(user);
  }, [user]);

  return (
    <Link to={'/Profile'}>
      {profile ? (
        <Avatar alt={name} src={profile} sx={{ width, height: width }} />
      ) : (
        <Avatar {...stringAvatar(name)} sx={{ width, height: width }}/>
      )}
    </Link>
  );
}
