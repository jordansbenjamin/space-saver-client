import { Button, Modal } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import useModal from '../contexts/useModal.js';
import ModalBox from '../components/modal/ModalBox.jsx';
import { useState, useEffect } from 'react';
import Calendar from '../features/bookings/Calendar.jsx';
import AddNewBookingModalContent from '../features/bookings/AddNewBookingModalContent.jsx';
import EditBookingModalContent from '../features/bookings/EditBookingModalContent.jsx';
import { getBookings } from '../services/apiBookings.js';
import { getAllRooms } from '../services/apiRooms.js';
import { getUsers } from '../services/apiUsers.js';
import MainSectionSpinner from '../components/spinner/MainSectionSpinner.jsx';
import useAuth from '../auth/useAuth.js';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';

/**
 * Bookings is a component responsible for displaying and managing bookings.
 * It provides functionality for viewing all bookings or filtered "My Bookings",
 * adding new bookings, and editing existing bookings. It also handles fetching and updating
 * bookings, users, and rooms data.
 */
function Bookings() {
  const { user } = useAuth();
  const userId = user._id;
  const { isOpen, handleOpen, handleClose } = useModal();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [isToggleLoading, setIsToggleLoading] = useState(false);

  const roomOptions = rooms.map((room) => {
    return {
      identifier: room.name,
      roomId: room._id,
    };
  });

  const userOptions = users
    .map((user) => {
      return {
        identifier: `${user.first_name} ${user.last_name}`,
        userId: user._id,
      };
    })
    .filter((user) => user.userId !== userId);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();

        if (fetchedUsers) {
          setUsers(fetchedUsers);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Toggle between "My Bookings" and "All Bookings"
  function handleToggle() {
    // setRefresh((p) => !p);
    setToggle((t) => !t);
  }

  const handleConfirmNewBooking = () => {
    setRefresh(p => !p);
    toast.success('Booking successfully created!');
  }

  // Open the modal for adding a new booking
  function handleAddNewBooking() {
    if (rooms.length < 1) {
      toast.error("You need to join a Space with rooms before you can make a booking.")
    } else {
      setSelectedBooking(null);
      handleOpen('addNewBookingModal');
    }
  }

  // Open the modal for editing a booking
  function handleEditBooking(booking) {
    setSelectedBooking(booking);
    handleOpen('editBookingModal');
  }

  const handleConfirmEditBooking = () => {
    setRefresh(p => !p);
  }

  // Refresh bookings list
  // function handleRefreshBookings() {
  //   setRefresh(p => !p);
  // }

  // Fetch bookings when toggle or refresh state changes
  useEffect(() => {
    setIsToggleLoading(true);
    const fetchBookings = async () => {
      try {
        const fetchedBookings = await getBookings(toggle);
        setBookings(fetchedBookings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsToggleLoading(false);
      }
    };
    fetchBookings();
    // setRefresh(false);
  }, [toggle, refresh]);

  // Fetch rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await getAllRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <section
      className={
        isLoading
          ? 'h-full w-full'
          : `grid h-full gap-5 md:grid-cols-23 md:grid-rows-18`
      }
    >
      {isLoading ? (
        <MainSectionSpinner />
      ) : (
        <>
          <div className="col-span-full col-start-1 row-span-1 flex flex-col items-center justify-center">
            <LoadingButton loading={isToggleLoading} variant="contained" onClick={handleToggle}>
              {toggle ? 'My Bookings' : 'All Bookings'}
            </LoadingButton>
          </div>

          <section className="col-span-full col-start-1 row-start-2 row-end-[17] rounded-xl border-2 bg-white shadow-xl">
            <Calendar
              myBookingFilter={toggle}
              bookings={bookings}
              onEditBooking={handleEditBooking}
            />
          </section>

          {isOpen('editBookingModal') && selectedBooking && (
            <Modal
              open={isOpen('editBookingModal')}
              onClose={() => handleClose('editBookingModal')}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalBox
                content={
                  <EditBookingModalContent
                    heading="Booking Details"
                    booking={selectedBooking}
                    handleClose={() => {
                      setSelectedBooking(null);
                      handleClose('editBookingModal');
                    }}
                    roomOptions={rooms}
                    // handleRefreshBookings={handleRefreshBookings}
                    onEditBooking={handleConfirmEditBooking}
                  />
                }
                height="h-auto"
                width="w-[37rem]"
              />
            </Modal>
          )}

          {isOpen('addNewBookingModal') && !selectedBooking && (
            <Modal
              open={isOpen('addNewBookingModal')}
              onClose={() => handleClose('addNewBookingModal')}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalBox
                content={
                  <AddNewBookingModalContent
                    heading="Add New Booking"
                    handleClose={() => {
                      setSelectedBooking(null);
                      handleClose('addNewBookingModal');
                    }}
                    roomOptions={roomOptions}
                    userOptions={userOptions}
                    onNewBooking={handleConfirmNewBooking}
                  />
                }
                height="h-auto"
                width="w-[40rem]"
              />
            </Modal>
          )}

          <div className="col-span-full col-start-1 row-span-2 row-start-[17] flex flex-col items-center justify-center">
            <Button
              variant="contained"
              startIcon={<AddRounded />}
              onClick={handleAddNewBooking}
            >
              Add New Booking
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

export default Bookings;
