import PropTypes from 'prop-types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useModal from '../../contexts/useModal';

function ModalBox({content, width, height, topVal, handleCloseMod, padX}) {
  const {handleClose} = useModal();
  // TODO: Update and remove this, default is better at 50 than 40
  // const topValue = `${topVal ? topVal : '40%'}`
  const topValue = `${topVal ? topVal : '50%'}`

  return (
    <div
    style={{top: topValue}}
      className={`absolute left-[50%] translate-x-[-50%] translate-y-[-50%] ${width} ${height} rounded-lg border-2 bg-slate-100 p-2 overflow-y-auto`}
    >
      <section className={`mt-[1rem] flex flex-col items-center justify-center gap-5 ${padX ? padX : "px-14"}`}>
        {content}
      </section>
      <button onClick={handleCloseMod ? handleCloseMod : handleClose}>
        <CloseRoundedIcon
          className="absolute right-5 top-5 hover:bg-slate-200 transition-all rounded-full"
          sx={{fontSize: 30}}
          color="action"
        />
      </button>
    </div>
  );
}

ModalBox.propTypes = {
  content: PropTypes.any,
  width: PropTypes.string,
  height: PropTypes.string,
  topVal: PropTypes.string,
  handleCloseMod: PropTypes.func,
  padX: PropTypes.string
};

export default ModalBox;
