import {createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useAuth from '../auth/useAuth';

export const UserContext = createContext(null);

export default function UserProvider({children}) {
  const {user} = useAuth();
  const [userDetails, setUserDetails] = useState(user || {});

  useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  },[user])

  const updateUserDetails = (updatedUserDetails) => {
    setUserDetails(updatedUserDetails);
  };

  return (
    <UserContext.Provider value={{userDetails, updateUserDetails}}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
};
