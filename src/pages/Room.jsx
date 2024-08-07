import {Button, Modal} from '@mui/material';
import DashItem from '../components/dashboard/DashItem';
import ListContent from '../components/dashboard/ListContent';
import Description from '../features/space/Description';
import useModal from '../contexts/useModal.js';
import ModalBox from '../components/modal/ModalBox.jsx';
import BookNow from '../features/room/BookNow.jsx';
import CapacityRoom from '../features/room/CapacityRoom.jsx';
import EditUsersModalContent from '../features/space/EditUsersModalContent.jsx';
import EditRoomModalContent from '../features/room/EditRoomModalContent.jsx';
import {Navigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {deleteSingleRoom, getSingleRoom} from '../services/apiRooms.js';
import useAuth from '../auth/useAuth.js';
import MainSectionSpinner from '../components/spinner/MainSectionSpinner.jsx';
import {getAvailableTimeSlots, getBookings} from '../services/apiBookings.js';
import EmptyDashContent from '../components/dashboard/EmptyDashContent.jsx';
import ConfirmModal from '../components/modal/ConfirmModal.jsx';

function Room() {
  const {handleOpen, handleClose, modalName, isOpen} = useModal();
  const {roomId} = useParams();
  const {user} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [capacity, setCapacity] = useState(0);
  const [description, setDescription] = useState('');
  const [admin, setAdmin] = useState('');
  const [availabilities, setAvailabilities] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // const [users, setUsers] = useState([]);
  const isAdmin = admin === user._id;
  // TODO: update this placeholder
  const isWoo = true;

  useEffect(() => {
    const getRoom = async () => {
      try {
        const fetchedRoom = await getSingleRoom(roomId);
        const fetchedAvailabilities = await getAvailableTimeSlots();

        if (fetchedRoom) {
          setCapacity(fetchedRoom.capacity);
          setDescription(fetchedRoom.description);
          setAdmin(fetchedRoom.space_id.admin_id._id);
          // console.log("Fetch room",fetchedRoom.space_id.user_ids)
          // setUsers(fetchedRoom)
        }

        if (fetchedAvailabilities) {
          // console.log(fetchedAvailabilities)
          const currentRoomTimeSlot =
            fetchedAvailabilities.availableTimeSlots.filter(
              (room) => room.room_id === roomId
            );

          if (currentRoomTimeSlot && currentRoomTimeSlot.length > 0) {
            // console.log(currentRoomTimeSlot)
            setAvailabilities(currentRoomTimeSlot[0].time_slots || []);
          } else {
            setAvailabilities([]);
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const fetchedBookings = await getBookings();

        if (fetchedBookings) {
          // console.log(fetchedBookings)
          const usersInRoom = fetchedBookings.filter(
            (booking) => booking.room_id._id === roomId
          );
          // console.log("Fetch users",usersInRoom)
          return usersInRoom;
        }
      } catch (err) {
        console.error(err);
      }
    };

    getRoom();
    fetchBookings();
  }, [roomId, refresh]);

  const formattedAvailabilities = availabilities?.map((availability) => {
    const startTime = new Date(availability.available_start_time);
    const endTime = new Date(availability.available_end_time);

    const dateOptions = {day: '2-digit', month: '2-digit', year: '2-digit'};
    const date = startTime.toLocaleDateString('en-AU', dateOptions);

    const timeOptions = {hour: 'numeric', minute: '2-digit', hour12: true};
    const time = startTime.toLocaleTimeString('en-AU', timeOptions);

    const durationInMilliseconds = endTime - startTime;
    const durationInHours = Math.round(
      durationInMilliseconds / (1000 * 60 * 60)
    );
    const duration = `${durationInHours}hr`;

    return {
      date,
      time,
      duration,
    };
  });

  function handleEditRoom() {
    handleOpen('Edit Room');
  }

  function createUsersData(
    id,
    firstName,
    lastName,
    email,
    dateJoined,
    postCode,
    position
  ) {
    return {
      id,
      firstName,
      lastName,
      email,
      dateJoined,
      postCode,
      position,
    };
  }

  const usersEditRows = Array.from(Array(13), (_, idx) =>
    createUsersData(
      Number(`${idx + 1}`),
      'John',
      'Doe',
      'johndoe@gmail.com',
      '28/11/23',
      2001,
      'Web Developer'
    )
  );

  const handleConfirmDeleteRoom = async () => {
    try {
      await deleteSingleRoom(roomId);
      setTimeout(() => {
        Navigate('/rooms');
      }, 800);
    } catch(err) {
      console.error(err);
    }
  };

  const renderModalContent = (modalName) => {
    switch (modalName) {
      case 'Edit Users':
        return (
          <EditUsersModalContent heading="Edit Users" rows={usersEditRows} />
        );
      case 'Edit Room':
        return <EditRoomModalContent heading="Edit Room" onRoomEdited={() => setRefresh(p => !p)} />;
      case 'Confirm':
        return (
          <ConfirmModal
            heading="Are you sure?"
            handleYes={handleConfirmDeleteRoom}
          />
        );
      default:
        return null;
    }
  };

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
          <DashItem
            heading="Book Now"
            styling="col-start-1 col-end-12 row-span-5"
            content={
              <BookNow
                date={formattedAvailabilities?.[0]?.date}
                time={formattedAvailabilities?.[0]?.time}
              />
            }
          />

          <DashItem
            heading="Availabilities Today"
            styling={`col-span-full col-start-[16] ${
              isAdmin ? 'row-end-[19]' : 'row-span-full'
            } row-start-1 rounded-xl`}
            content={
              <ListContent
                contentType="roomAvailabilities"
                toolTipTitle="Go to bookings"
                roomAvailabilities={formattedAvailabilities}
              />
            }
          />

          {isAdmin && (
            <section className="col-start-1 col-end-[15] row-span-full row-start-[17] flex flex-col items-center justify-center">
              <Button variant="contained" onClick={handleEditRoom}>
                Edit Room
              </Button>
            </section>
          )}

          <DashItem
            heading="Description"
            styling={`col-start-1 col-end-[16] ${
              isAdmin ? 'row-start-6 row-span-4' : 'row-start-6 row-span-5'
            }`}
            isScroll
            content={<Description descriptionText={description} />}
          />

          <DashItem
            heading="Capacity"
            styling={'col-span-4 row-span-5'}
            content={<CapacityRoom capacityAmount={capacity} />}
          />

          <DashItem
            heading="Current Users"
            styling={`col-start-1 col-end-[16] ${
              isAdmin
                ? 'row-start-[10] row-end-[17]'
                : 'row-start-[11] row-span-full'
            }`}
            content={
              isWoo ? (
                <EmptyDashContent message="No users currently in room" />
              ) : (
                <ListContent contentType="roomUsers" />
              )
            }
          />
        </>
      )}

      <Modal
        open={isOpen(modalName)}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox
          content={renderModalContent(modalName)}
          height="h-auto"
          width="w-auto"
        />
      </Modal>
    </section>
  );
}

export default Room;
