import {Alert, Button, Fade, Modal, TextField} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import LogoDesktop from '../components/LogoDesktop';
import {Controller, useForm} from 'react-hook-form';
import useAuth from '../auth/useAuth';
import {loginUser} from '../services/apiUsers';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import ModalBox from '../components/modal/ModalBox';
import AboutModalContent from '../components/modal/AboutModalContent';

/**
 * LogIn is a component for user authentication.
 * It uses the useAuth hook to access the login functionality and useForm for form handling.
 * Upon submitting valid credentials, it logs the user in and navigates to the home page.
 */
function LogIn() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    setAlertVisible(true);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    const jwt = await loginUser(data);

    if (jwt) {
      await login(jwt);
      navigate('/');
      toast.success('Logged in! Welcome to SpaceSaver.');
    }
  };

  return (
    // TODO: Finish off responsive for mobile and tablet views
    <main className="flex h-screen flex-col items-center justify-center gap-6 bg-slate-100">
      <Fade in={alertVisible} timeout={2000}>
        <Alert
          severity="info"
          icon={false}
          action={
            <Button color="inherit" size="small" variant='outlined' onClick={handleOpen}>
              READ ME
            </Button>
          }
          sx={{ position: 'absolute', top: 10, border: '1px solid #D3D3D3' }}
        >
          Welcome to SpaceSaver! To begin, please read this:
        </Alert>
      </Fade>
      <div className="flex h-[.1rem] w-[23rem] flex-col justify-center mb-8">
        <LogoDesktop NoDivider />
      </div>

      <section className="flex h-auto w-[40rem] flex-col gap-4 rounded-xl border-2 bg-white px-9 py-10 shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-3 font-coplette text-4xl">
            Sign in to your account
          </h2>
          <p className="text-[1.05rem] text-gray-700">
            Login to start accessing the awesome features SpaceSaver has to offer, and
            start managing spaces or book rooms to streamline your workday.
          </p>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({field}) => (
              <div className="mb-8 mt-5 flex h-20 flex-col gap-2">
                <label htmlFor="email">Your email</label>
                <TextField
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  // required
                  id="email"
                  // label="email"
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{required: 'Password is required'}}
            render={({field}) => (
              <div className="mb-10 flex h-20 flex-col gap-2">
                <label htmlFor="password">Your password</label>
                <TextField
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  // required
                  id="password"
                  type='password'
                  // label="password"
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
          />

          <div className="my-2">
            <Button variant="contained" size="large" type="submit">
              Sign in to account
            </Button>
          </div>
        </form>

        <div>
          <p className="text-gray-700">
            Not registered?{' '}
            <span className="text-blue-700 hover:underline">
              <Link to="/register">Create an account.</Link>
            </span>
          </p>
        </div>

      </section>
      <div className='absolute bottom-2 left-3'>
        <p className='text-sm text-gray-600'>Version 1.1.1</p>
      </div>

      {open && <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalBox
            content={<AboutModalContent />}
            height="h-auto"
            width="w-[60rem]"
            topVal='50%'
            handleCloseMod={handleClose}
          />
        </Modal>}
    </main>
  );
}

export default LogIn;
