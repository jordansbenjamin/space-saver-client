import Divider from '../Divider';
import StyledNavLink from './StyledNavLink';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Tooltip } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import useModal from '../../contexts/useModal';

function MainNav() {
  const { handleOpen } = useModal();
  return (
    <nav className="h-full px-10 py-6">
      <ul className="flex h-full list-none flex-col items-start gap-6">
        <li>
          <StyledNavLink
            path="/home"
            linkName="Home"
            icon={<HomeRoundedIcon />}
          />
        </li>
        <li>
          <StyledNavLink
            path="/bookings"
            linkName="Bookings"
            icon={<CalendarMonthRoundedIcon />}
          />
        </li>
        <li>
          <StyledNavLink
            path="/spaces"
            linkName="Spaces"
            icon={<ApartmentRoundedIcon />}
          />
        </li>
        <li>
          <StyledNavLink
            path="/rooms"
            linkName="Rooms"
            icon={<MeetingRoomRoundedIcon />}
          />
        </li>
        <li className="flex grow"></li>
        <li
          className="nav-hover flex w-[13rem] items-center rounded-lg px-3 py-3 pr-20 mb-6 transition-all duration-200 ease-custom hover:shadow-custom-hover hover:scale-95 hover:cursor-pointer"
          onClick={() => handleOpen('aboutModal')}
        >
          <Tooltip title={"About"}>
            <InfoRoundedIcon />
          </Tooltip>
          <span className="pl-3 text-lg">About</span>
        </li>
        <Divider />
        <li>
          <StyledNavLink
            path="/settings"
            linkName="Settings"
            icon={<SettingsRoundedIcon />}
          />
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
