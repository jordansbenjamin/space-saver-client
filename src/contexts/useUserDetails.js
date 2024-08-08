import {useContext} from 'react';
import {UserContext} from './UserContext';

export default function useUserDetails() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('UserContext was used outside of UserProvider');
  }
  return context;
}
