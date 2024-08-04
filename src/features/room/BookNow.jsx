import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function BookNow({date, time}) {
  // const date = '30/11/23';
  // const time = '4:20pm';
  return (
    <Link to="/bookings">
      <section className="flex h-full w-full items-center justify-center gap-2 p-2">
        <p className="w-44 font-coplette text-3xl text-blue-700">
          Next Available
        </p>
        <div className="flex flex-col items-center gap-1 rounded-xl bg-blue-600 px-4 py-4 font-coplette text-slate-100">
          <p className="text-2xl sm:text-4xl md:text-4xl">{date}</p>
          <p className="text-base sm:text-lg md:text-xl">{time}</p>
        </div>
      </section>
    </Link>
  );
}

BookNow.propTypes = {
  date: PropTypes.any,
  time: PropTypes.any
}

export default BookNow;
