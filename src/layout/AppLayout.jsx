import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import useAuthToken from '../hooks/useAuthToken';
import FullPageSpinner from '../components/spinner/FullPageSpinner';
import useAuth from '../auth/useAuth';
import ModalBox from '../components/modal/ModalBox';
import { Modal } from '@mui/material';
import AboutModalContent from '../components/modal/AboutModalContent';
import useModal from '../contexts/useModal';

function AppLayout() {
  const { isOpen, handleClose } = useModal();
  const { isLoading } = useAuth();
  useAuthToken();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <div className="grid h-screen w-full grid-cols-[17rem_minmax(0,1fr)] grid-rows-[6.8rem_minmax(0,1fr)] bg-slate-100">
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>

      {isOpen('aboutModal') && (
        <Modal
          open={isOpen('aboutModal')}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBox
            content={<AboutModalContent />}
            height="h-auto"
            width="w-[60rem]"
            topVal='50%'
            padX='px-5'
          />
        </Modal>
      )}
    </div>
  );
}

export default AppLayout;
