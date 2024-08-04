import PropTypes from 'prop-types';

function Capacity({roomsCount, peopleCount}) {
  return (
    <section className="flex h-full w-full items-center justify-center gap-4">
      {/* <p className="rounded-xl bg-blue-600 p-3 font-coplette text-3xl text-slate-100 sm:text-4xl md:text-7xl">
        {roomsCount}
      </p> */}
      <div className="flex flex-col items-center rounded-xl  bg-blue-600 px-5 py-4 font-coplette text-slate-100">
        <p className="md:text-xl">Rooms</p>
        <p className="md:text-4xl">{roomsCount}</p>
      </div>
      <div className="flex flex-col items-center rounded-xl  bg-blue-600 px-5 py-4 font-coplette text-slate-100">
        <p className="md:text-xl">People</p>
        <p className="md:text-4xl">{peopleCount}</p>
      </div>
    </section>
  );
}

Capacity.propTypes = {
  roomsCount: PropTypes.number,
  peopleCount: PropTypes.number,
};

export default Capacity;
