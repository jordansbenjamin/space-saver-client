import {Modal} from '@mui/material';
import SettingsForm from '../features/settings/SettingsForm';
import {useState} from 'react';
import ConfirmModal from '../components/modal/ConfirmModal';
import ModalBox from '../components/modal/ModalBox';
import useModal from '../contexts/useModal';
import { deleteUser } from '../services/apiUsers';
import useAuth from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Settings is a component that provides user-specific or app-wide settings.
 * It might include toggles for themes, account management options, or other configurations.
 */
function Settings() {
  const navigate = useNavigate();
  const {user, logout} = useAuth();
  const {isOpen, handleClose} = useModal();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelAcc, setIsDelAcc] = useState(false);
  const userId = user._id
  function handleToggle() {
    setToggle((toggle) => !toggle);
  }

  // TODO: Logic for deleting account
  async function handleConfirmDeleteUser() {
    setIsLoading(true);
    setIsDelAcc(true);
    try {
      const res = await deleteUser(userId);
      
      if (res) {
        logout();
        navigate('/login');
        handleClose();
        toast.success("Your account has been removed. Thanks for using SpaceSaver!");
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex h-full flex-col items-center justify-center gap-8">
      <SettingsForm
        isDisabled={!toggle}
        onToggle={handleToggle}
        isToggle={toggle}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isDelAcc={isDelAcc}
      />

      <Modal
        open={isOpen('Confirm')}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox
          content={
            <ConfirmModal
              heading="Are you sure?"
              handleYes={handleConfirmDeleteUser}
            />
          }
          height="h-auto"
          width="w-auto"
        />
      </Modal>
    </section>
  );
}

export default Settings;
