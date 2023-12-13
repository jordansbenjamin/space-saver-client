import {Button, Modal} from '@mui/material';
import DashItem from '../components/dashboard/DashItem';
import ListContent from '../components/dashboard/ListContent';
import {AddRounded} from '@mui/icons-material';
import useModal from '../contexts/useModal.js';
import ModalBox from '../components/modal/ModalBox.jsx';
import {createData} from '../helpers/createData.js';
import {useState} from 'react';
import Calendar from '../features/bookings/Calendar.jsx';

function Bookings() {
  const {open, handleOpen, handleClose} = useModal();
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle((t) => !t);
  }

  const roomsColumn = ['Room #', 'Next Available', 'Capacity'];

  const roomsRow = Array.from(Array(15), () =>
    createData(10310, '28/11/23', 4)
  );

  return (
    <section className="grid h-full gap-5 md:grid-cols-23 md:grid-rows-18">
      <div className="col-start-1 col-end-[15] row-span-1 flex flex-col items-center justify-center">
        <Button variant="contained" onClick={handleToggle}>
          {toggle ? 'My Bookings' : 'All Bookings'}
        </Button>
      </div>

      <section className="col-start-1 col-end-[15] row-span-full row-start-2 bg-white border-2 rounded-xl shadow-xl">
        {/* TODO: Calendar logic is separated into its own component */}
        <Calendar/>
      </section>

      <DashItem
        heading="Upcoming Bookings"
        content={<ListContent columns={roomsColumn} rows={roomsRow} />}
        styling="col-span-full col-start-[15] row-end-[17] row-start-1 rounded-xl"
      />

      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBox content="content" height="h-auto" width="w-[30rem]" />
        </Modal>
      )}

      <div className="col-span-full col-start-[15] row-span-2 row-start-[17] flex flex-col items-center justify-center">
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={handleOpen}
        >
          Add New Room
        </Button>
      </div>
    </section>
  );
}

export default Bookings;
