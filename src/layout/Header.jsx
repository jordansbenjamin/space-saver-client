// import {Avatar} from '@mui/material';
import {usePageHeading} from '../contexts/usePageHeading';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import AccountMenu from '../components/menu/AccountMenu';
import useAuth from '../auth/useAuth';

function Header() {
  const {user} = useAuth();
  const {heading, setHeading} = usePageHeading();
  const {pathname} = useLocation();
  const pathnameArr = pathname.split('/');
  let pageHeading;
  let fullName = null;
  let firstName = null;

  // TODO: user fetch on mount null
  if (user) {
    fullName = `${user.first_name} ${user.last_name}`;
    firstName = user.first_name;
  }

  if (pathnameArr.length <= 2) {
    pageHeading = pathname.slice(1);
  } else if (pathnameArr.length > 2) {
    pageHeading = decodeURI(pathname.split('/').at(2));
  }

  // Morning, afternoon and evening
  // eslint-disable-next-line no-unused-vars
  const getCurrentPeriod = () => {
    const currentTime = new Date().getHours();
    console.log(currentTime)
    if (currentTime >= 12 && currentTime < 18) {
      return 'Afternoon'
    } else if (currentTime >= 18) {
      return 'Evening'
    } else {
      return 'Morning'
    }
  }

  useEffect(() => {
    const period = getCurrentPeriod();
    switch (pageHeading) {
      case 'home':
        setHeading(`Good ${period}, ${firstName}!`);
        break;
      case 'bookings':
        setHeading('Bookings');
        break;
      case 'spaces':
        setHeading('Spaces');
        break;
      case 'rooms':
        setHeading('Rooms');
        break;
      case 'settings':
        setHeading('Settings');
        break;
      default:
        setHeading(pageHeading);
    }
  }, [setHeading, pageHeading, firstName]);

  return (
    <div className="col-span-full col-start-2 flex items-center justify-between px-8 font-coplette text-5xl">
      {/* <h1>Good %timeOfDay%, %firstName%</h1> */}
      <h1 className="tracking-wide">{heading}</h1>
      {/* <Avatar {...stringAvatar('Alex Holder')} /> */}
      <AccountMenu name={fullName} />
    </div>
  );
}

export default Header;
