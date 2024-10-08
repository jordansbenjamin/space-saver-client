import {useEffect, useState} from 'react';
import DashItem from '../components/dashboard/DashItem';
import useModal from '../contexts/useModal';
import {Button, Modal} from '@mui/material';
import ModalBox from '../components/modal/ModalBox';
import JoinSpaceModalContent from '../features/spaces/JoinSpaceModalContent';
import CreateSpaceModalContent from '../features/spaces/CreateSpaceModalContent';
import {Link} from 'react-router-dom';
import {getAllSpaces} from '../services/apiSpaces';
import useAuth from '../auth/useAuth';
import MainSectionSpinner from '../components/spinner/MainSectionSpinner';
import useSpaceStore from '../store/spaceStore';

/**
 * Spaces is a component that displays a list of all spaces the user is associated with.
 * It differentiates between spaces owned by the user and spaces where the user is a member.
 * Users can toggle between viewing owned or joined spaces.
 */
function Spaces() {
  const {user} = useAuth();
  const {isOpen, handleOpen, handleClose} = useModal();
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ownedSpaces, setOwnedSpaces] = useState([]);
  const [joinedSpaces, setJoinedSpaces] = useState([]);
  // const [refresh, setRefresh] = useState(false);

  const refresh = useSpaceStore((state) => state.refresh);
  const setRefresh = useSpaceStore((state) => state.toggleRefresh);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const spaces = await getAllSpaces();
        setOwnedSpaces(
          spaces.filter((space) => user._id === space.admin_id._id)
        );
        setJoinedSpaces(
          spaces.filter((space) => user._id !== space.admin_id._id)
        );
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getSpaces();
  }, [user._id, refresh]);

  const handleCreateSpace = () => {
    // console.log(newSpace);
    // setOwnedSpaces((prevSpaces) => [...prevSpaces, newSpace]);
    setRefresh(p => !p)
  };

  function handleToggle() {
    setToggle((toggled) => !toggled);
  }

  return (
    <section className="flex h-full w-full flex-col gap-6">
      <div className="flex justify-center">
        <Button variant="contained" onClick={handleToggle}>
          {toggle ? 'Joined Spaces' : 'Owned Spaces'}
        </Button>
      </div>

      {/* TODO: Fix flex card item alignment, not with justify-center, figure something out
                might be an issue with the section or main container
      */}
      {/* TODO: This might be a grid container rather than flex, fix this last */}

      {isLoading ? (
        <MainSectionSpinner />
      ) : (
        <section className="flex flex-wrap gap-5">
          {/* joined vs owned spaces */}
          {toggle
            ? joinedSpaces.map((space) => (
                <Link to={`/spaces/${space.name}/${space._id}`} key={space._id}>
                  <DashItem
                    key={space._id}
                    styling="w-[18rem] h-[14.5rem]"
                    heading={space.name}
                    headingStyling="self-center my-auto"
                    allowHoverEffect
                  />
                </Link>
              ))
            : ownedSpaces.map((space) => (
                <Link to={`/spaces/${space.name}/${space._id}`} key={space._id}>
                  <DashItem
                    key={space._id}
                    styling="w-[18rem] h-[14.5rem]"
                    heading={space.name}
                    headingStyling="self-center my-auto"
                    allowHoverEffect
                  />
                </Link>
              ))}

          {/* CONDITIONAL BTNS */}
          {toggle ? (
            <button onClick={() => handleOpen('joinSpace')}>
              <DashItem
                styling="w-[18rem] h-[14.5rem]"
                heading="Join Space +"
                bgColor="bg-slate-300"
                headingStyling="self-center my-auto"
                allowHoverEffect
              />
            </button>
          ) : (
            <button onClick={() => handleOpen('createSpace')}>
              <DashItem
                styling="w-[18rem] h-[14.5rem] mb-10"
                heading="Create Space +"
                bgColor="bg-slate-300"
                headingStyling="self-center my-auto"
                allowHoverEffect
              />
            </button>
          )}

          {/* CONDITIONAL MODALS */}
          {isOpen('joinSpace') && toggle ? (
            <Modal
              open={isOpen('joinSpace')}
              onClose={() => handleClose('joinSpace')}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalBox
                content={<JoinSpaceModalContent heading="Join Space" onSpaceJoined={handleCreateSpace} />}
                height="h-auto"
                width="w-[27rem] p-3"
              />
            </Modal>
          ) : (
            <Modal
              open={isOpen('createSpace')}
              onClose={() => handleClose('createSpace')}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalBox
                content={<CreateSpaceModalContent heading="Create New Space" onSpaceCreated={handleCreateSpace} />}
                height="h-auto"
                width="w-[33rem] p-4"
              />
            </Modal>
          )}
        </section>
      )}
    </section>
  );
}

export default Spaces;
