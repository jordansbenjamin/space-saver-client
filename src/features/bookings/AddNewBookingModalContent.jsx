import PropTypes from 'prop-types';
import {Autocomplete, Button, TextField} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {Controller, useForm} from 'react-hook-form';
import {createBooking} from '../../services/apiBookings';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import {LoadingButton} from '@mui/lab';
import {useState} from 'react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

function AddNewBookingModalContent({
  heading,
  handleClose,
  roomOptions,
  userOptions,
  onNewBooking
}) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const {room_id, date, startTime, endTime, ...rest} = data;

      // Combine date and time for startTime and endTime
      const startDateTime = new Date(date);
      const [startHours, startMinutes] = [
        new Date(startTime).getHours(),
        new Date(startTime).getMinutes(),
      ];
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(date);
      const [endHours, endMinutes] = [
        new Date(endTime).getHours(),
        new Date(endTime).getMinutes(),
      ];
      endDateTime.setHours(endHours, endMinutes);

      const newBooking = {
        ...rest,
        room_id: room_id.roomId, // extract roomId from room_id object
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      };

      const res = await createBooking(newBooking);
      // console.log("response:", res);
      if (res.status === 400) {
        const errMsg = res.data.error.split(' ').slice(0, 3).join(' ');
        if (errMsg.includes('Overlapping')) {
          throw new Error(errMsg + '. Please try again.' || 'Booking failed');
        } else {
          throw new Error(res.data.error || 'Booking failed');
        }
      } else {
        handleClose();
        onNewBooking();
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred during booking.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h4 className="mb-2 mt-[.6rem] font-coplette text-3xl">{heading}</h4>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[38rem] flex-col items-center gap-3 px-8"
      >
        <div className="flex w-full gap-3">
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{required: 'Booking title is required'}}
            render={({field}) => (
              <div className="flex w-[18.2rem] flex-col gap-1">
                <label className="self-start text-lg" htmlFor="booking-title">
                  Booking Title
                </label>
                <TextField
                  {...field}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  id="booking-title"
                  placeholder="title"
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
          />

          <Controller
            name="room_id"
            control={control}
            defaultValue={null}
            rules={{required: 'Room is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <div className="flex w-[15rem] flex-col gap-1">
                <label className="self-start text-lg" htmlFor="room">
                  Room
                </label>
                <Autocomplete
                  id="room"
                  options={roomOptions}
                  getOptionLabel={(option) => option.identifier || ''}
                  onChange={(event, item) => {
                    // onChange(item.roomId || '');
                    onChange(item);
                  }}
                  // value={
                  //   value
                  //     ? roomOptions.find(
                  //         (option) => option.identifier === value.identifier
                  //       ) || ''
                  //     : ''
                  // }
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="room to book"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </div>
            )}
          />
        </div>

        <div className="flex w-full gap-3">
          <Controller
            name="date"
            control={control}
            defaultValue=""
            rules={{required: 'Date is required'}}
            render={({field, fieldState: {error}}) => (
              <div className="mt-1 flex flex-col gap-1">
                <label className="self-start text-lg" htmlFor="date">
                  Date
                </label>
                <DatePicker
                  {...field}
                  id="date"
                  format="DD/MM/YY"
                  minDate={dayjs()}
                  value={field.value || null}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  className="self-start"
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error ? error?.message : null,
                    },
                  }}
                />
              </div>
            )}
          />

          <Controller
            name="startTime"
            control={control}
            defaultValue=""
            rules={{required: 'Start time is required'}}
            render={({field, fieldState: {error}}) => (
              <div className="mt-1 flex flex-col gap-1">
                <label className="self-start text-lg" htmlFor="start-time">
                  Start Time
                </label>
                <TimePicker
                  {...field}
                  id="start-time"
                  value={field.value || null}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  className="w-[10rem] self-start"
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error ? error?.message : null,
                    },
                  }}
                />
              </div>
            )}
          />

          <Controller
            name="endTime"
            control={control}
            defaultValue=""
            rules={{required: 'End time is required'}}
            render={({field, fieldState: {error}}) => (
              <div className="mt-1 flex flex-col gap-1">
                <label className="self-start text-lg" htmlFor="end-time">
                  End Time
                </label>
                <TimePicker
                  {...field}
                  id="end-time"
                  value={field.value || null}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error ? error?.message : null,
                    },
                  }}
                  className="w-[10rem] self-start"
                />
              </div>
            )}
          />
        </div>

        <Controller
          name="invited_user_ids"
          control={control}
          defaultValue={[]}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <div className="flex w-full flex-col gap-1">
              <label className="self-start text-lg" htmlFor="invite">
                Invite
              </label>
              <Autocomplete
                multiple
                id="invite"
                options={userOptions}
                getOptionLabel={(option) => option.identifier || ''}
                onChange={(event, items) => {
                  onChange(items.map((item) => item.userId));
                }}
                value={
                  value
                    ? userOptions.filter((option) =>
                        value.includes(option.userId)
                      )
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="invite users"
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </div>
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({field}) => (
            <div className="flex w-full flex-col gap-1">
              <label className="self-start text-lg" htmlFor="description">
                Description
              </label>
              <TextField
                {...field}
                // error={!!errors.description}
                // helperText={errors.description?.message}
                id="description"
                placeholder="booking description"
                variant="outlined"
                fullWidth
                sx={{mb: '0.5rem'}}
                multiline
                maxRows={6}
              />
            </div>
          )}
        />

        <div className="ml-auto mr-5 flex gap-4">
          <Button variant="contained" color="error" disabled={isLoading} onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            Confirm Booking
          </LoadingButton>
        </div>
      </form>
    </>
  );
}

AddNewBookingModalContent.propTypes = {
  heading: PropTypes.string,
  handleClose: PropTypes.func,
  userOptions: PropTypes.array,
  roomOptions: PropTypes.array,
  onNewBooking: PropTypes.func
};

export default AddNewBookingModalContent;
