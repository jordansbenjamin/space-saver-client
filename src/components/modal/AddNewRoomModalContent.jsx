import PropTypes from 'prop-types';
// import Button from '../../components/buttons/Button';
import {Button, TextField} from '@mui/material';
import useModal from '../../contexts/useModal';
import {Controller, useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {createRoom} from '../../services/apiRooms';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

function AddNewRoomModalContent({heading, spaceIdFromRooms, onAddNewRoom}) {
  const {handleClose} = useModal();
  const {spaceId} = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const handleReset = () => {
    reset({
      name: '',
      capacity: '',
      description: '',
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const updatedData = {...data, space_id: spaceId || spaceIdFromRooms};

      const res = await createRoom(updatedData);

      if (res) {
        onAddNewRoom();
        handleClose();
      }

    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <>
      <h4 className="mb-2 mt-[-.6rem] pt-4 font-coplette text-3xl">
        {heading}
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
        className="flex w-[23rem] flex-col items-center gap-1 p-4"
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{required: 'Room name is required'}}
          render={({field}) => (
            <>
              <label className="self-start text-lg" htmlFor="room-name">
                Room Name
              </label>
              <TextField
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
                id="room-name"
                label="required"
                variant="outlined"
                fullWidth
                sx={{mb: '0.5rem'}}
              />
            </>
          )}
        />

        <Controller
          name="capacity"
          control={control}
          defaultValue=""
          rules={{required: 'Capacity is required'}}
          render={({field}) => (
            <>
              <label className="self-start text-lg" htmlFor="capacity">
                Capacity
              </label>
              <TextField
                {...field}
                error={!!errors.capacity}
                helperText={errors.capacity?.message}
                id="capacity"
                label="required"
                variant="outlined"
                fullWidth
                sx={{mb: '0.5rem'}}
              />
            </>
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{required: 'Description is required'}}
          render={({field}) => (
            <>
              <label className="self-start text-lg" htmlFor="description">
                Description
              </label>
              <TextField
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
                id="description"
                label="required"
                variant="outlined"
                fullWidth
                sx={{mb: '0.5rem'}}
                multiline
                maxRows={6}
              />
            </>
          )}
        />

        <div className="mb-[-1rem] ml-6 mr-5 mt-2 flex gap-4">
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={() => handleClose('newRoom')}
          >
            Cancel
          </Button>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Add Room
          </LoadingButton>
        </div>
      </form>
    </>
  );
}

AddNewRoomModalContent.propTypes = {
  heading: PropTypes.string,
  spaceIdFromRooms: PropTypes.string,
  onAddNewRoom: PropTypes.func
};

export default AddNewRoomModalContent;
