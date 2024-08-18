import {useEffect, useState} from 'react';
import {getAllRooms} from '../services/apiRooms';
import {getAvailableTimeSlots, getBookings} from '../services/apiBookings';
import MainSectionSpinner from '../components/spinner/MainSectionSpinner';
import useAuth from '../auth/useAuth';
import NoMeetingRoomRoundedIcon from '@mui/icons-material/NoMeetingRoomRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import DashItem from '../components/dashboard/DashItem';
import Analytic from '../features/home/Analytic';
import Book from '../features/home/Book';
import ListContent from '../components/dashboard/ListContent';
import EmptyDashContent from '../components/dashboard/EmptyDashContent';

function Home() {
  const {user} = useAuth();
  const userId = user?._id;
  const [isLoading, setIsLoading] = useState(true); // Unified loading state
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [mostUsedRoom, setMostUsedRoom] = useState('');
  const [roomsInUse, setRoomsInUse] = useState(0);
  const [usersInRooms, setUsersInRooms] = useState(0);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [fetchedRooms, fetchedBookings, availableTimeSlots] = await Promise.all([
        getAllRooms(),
        getBookings(),
        getAvailableTimeSlots(),
      ]);

      // Process rooms
      if (fetchedRooms) setRooms(fetchedRooms);

      // Process bookings
      if (fetchedBookings) setBookings(fetchedBookings);

      // Process analytics data
      if (availableTimeSlots) {
        setMostUsedRoom(availableTimeSlots.mostUsedRoom);
        setRoomsInUse(availableTimeSlots.numberOfRoomsInUse);
        setUsersInRooms(availableTimeSlots.numberOfUsersInRooms.totalNumberOfUsers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false); // Set loading to false only after all data has been fetched
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const userBookings = bookings.filter(
    (booking) => booking.primary_user_id?._id === userId
  );

  const getUpcomingBookings = () => {
    const upcomingUserBookings = userBookings.filter((booking) => {
      const bookedTime = new Date(booking.start_time).toISOString().slice(0, 10);
      const currentTime = new Date().toISOString().slice(0, 10);
      return currentTime <= bookedTime;
    });
    return upcomingUserBookings.length > 1;
  };

  let mostUsedRoomName = '';
  if (rooms && mostUsedRoom) {
    const foundRoom = rooms.find((room) => room._id === mostUsedRoom);
    if (foundRoom) mostUsedRoomName = foundRoom.name;
  }

  let bookAgainName;
  let bookAgainDate;
  if (bookings && bookings.length > 0) {
    const lastBooking = bookings.at(-1);
    if (lastBooking) {
      bookAgainName = lastBooking.room_id?.name;
      bookAgainDate = new Date(lastBooking.start_time).toLocaleDateString();
    }
  }

  const roomsUpdated = rooms.map((room) => ({
    name: room.name,
    nextAvailable: '28/11/23',
    capacity: room.capacity,
  }));

  return (
    <section className={isLoading ? 'h-full w-full' : `grid h-full gap-5 md:grid-cols-23 md:grid-rows-18`}>
      {isLoading ? (
        <MainSectionSpinner />
      ) : (
        <>
          <DashItem
            heading="Book Again"
            styling="col-start-1 col-end-[15] row-span-6"
            content={
              !bookAgainName ? (
                <EmptyDashContent message="No booking found" />
              ) : (
                <Book bookAgainName={bookAgainName} bookAgainDate={bookAgainDate} />
              )
            }
          />

          <DashItem
            heading="Available Rooms"
            content={
              rooms.length < 1 ? (
                <EmptyDashContent message="No rooms found" />
              ) : (
                <ListContent contentType="rooms" rooms={roomsUpdated} />
              )
            }
            styling="col-span-full col-start-[15] row-span-full row-start-1 rounded-xl"
          />

          <DashItem
            heading="Upcoming Bookings"
            content={
              !getUpcomingBookings() ? (
                <EmptyDashContent message="No upcoming bookings" />
              ) : (
                <ListContent
                  contentType="upcomingBookings"
                  bookings={userBookings.filter(
                    (booking) => new Date(booking.start_time) > new Date()
                  )}
                />
              )
            }
            styling="col-start-1 col-end-[15] row-start-7 row-end-[14]"
          />

          <section className="col-start-1 col-end-[15] row-span-5 grid grid-cols-3 gap-5">
            <DashItem
              heading={<NoMeetingRoomRoundedIcon sx={{ fontSize: '2.4rem', color: 'rgb(30 64 175)' }} />}
              content={<Analytic text="Rooms in use" roomsInUse={roomsInUse} />}
            />

            <DashItem
              heading={<PeopleRoundedIcon sx={{ fontSize: '2.4rem', color: 'rgb(30 64 175)' }} />}
              content={<Analytic text="Users in rooms" usersInRooms={usersInRooms} />}
            />

            <DashItem
              heading={<EqualizerRoundedIcon sx={{ fontSize: '2.4rem', color: 'rgb(30 64 175)' }} />}
              content={<Analytic text="Most used room" size="text-lg" mostUsedRoom={mostUsedRoomName} />}
            />
          </section>
        </>
      )}
    </section>
  );
}

export default Home;
