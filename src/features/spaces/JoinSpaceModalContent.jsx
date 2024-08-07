import PropTypes from 'prop-types';
import {TextField} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import {joinSpace} from '../../services/apiSpaces';
import useModal from '../../contexts/useModal';
import {useState} from 'react';
import { LoadingButton } from '@mui/lab';
// import toast from 'react-hot-toast';
// import api from '../../services/api';

function JoinSpaceModalContent({heading, onSpaceJoined}) {
  const {handleClose} = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const handleReset = () => {
    reset({
      code: '',
    });
  };

  // TODO: Keep note: Good error handling format
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await joinSpace(data.code);

      if (res) {
        onSpaceJoined();
        handleClose('joinSpace');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h4 className="mt-[-.6rem] font-coplette text-3xl">{heading}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
        className="flex w-[17rem] flex-col items-center gap-2"
      >
        <Controller
          name="code"
          control={control}
          defaultValue=""
          rules={{required: 'Access code is required'}}
          render={({field}) => (
            <>
              <label className="text-lg" htmlFor="code">
                Enter Access Code
              </label>
              <TextField
                {...field}
                error={!!errors.code}
                helperText={errors.code?.message}
                id="code"
                label="access code"
                variant="outlined"
                fullWidth
                sx={{mb: '.6rem'}}
              />
            </>
          )}
        />
        <div className="mb-[-1rem]">
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Join
          </LoadingButton>
        </div>
      </form>
    </>
  );
}

JoinSpaceModalContent.propTypes = {
  heading: PropTypes.string,
  onSpaceJoined: PropTypes.func,
};

export default JoinSpaceModalContent;
