import {TextField} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import LogoDesktop from '../components/LogoDesktop';
import {Controller, useForm} from 'react-hook-form';
import {loginUser, registerUser} from '../services/apiUsers';
import useAuth from '../auth/useAuth';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

/**
 * Register is a component for user registration.
 * It uses the useForm hook from react-hook-form for handling form data and validation.
 * Upon successful registration, it navigates the user to the login page.
 */
function Register() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    let user = {
      email: data.email,
      password: data.password,
    };
    let userRegister = await registerUser(data);
    
    if (userRegister) {
      let jwt = await loginUser(user);
      if (jwt) {
        await login(jwt);
        navigate('/');
        toast.success(`Welcome to SpaceSaver ${data.first_name}!`);
        setIsLoading(false);
      }
    }
    // navigate('/login');
  };

  return (
    // TODO: Finish off responsive for mobile and tablet views
    <main className="flex p-4 h-screen flex-col items-center justify-center bg-slate-100 overflow-auto">

      <section className='flex items-center flex-col gap-6 mt-10'>
          <div className="flex h-[.1rem] w-[23rem] flex-col justify-center mb-6">
            <LogoDesktop NoDivider />
          </div>
      <div className="flex h-auto w-[28rem] flex-col gap-3 rounded-xl border-2 bg-white px-9 py-10 shadow-xl md:w-[40rem]">
        <h2 className="font-coplette text-4xl">Create an account</h2>
        <p className="text-[1.05rem] text-gray-700">
          To access the awesome features SpaceSaver has to offer, login to start
          managing spaces or book rooms to streamline your workday.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex justify-between">
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              rules={{
                required: 'First name is required',
              }}
              render={({field}) => (
                <div className="mt-5 flex h-20 w-[17rem] flex-col gap-2">
                  <label htmlFor="first-name">First Name</label>
                  <TextField
                    {...field}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    id="first-name"
                    placeholder="Mary"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>
              )}
            />

            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              rules={{
                required: 'Last name is required',
              }}
              render={({field}) => (
                <div className=" mt-5 flex h-20 w-[17rem] flex-col gap-2">
                  <label htmlFor="last-name">Last Name</label>
                  <TextField
                    {...field}
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    id="last-name"
                    placeholder="Smith"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>
              )}
            />
          </div>

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
              <div className="flex h-20 flex-col gap-2">
                <label htmlFor="email">Your email</label>
                <TextField
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  id="email"
                  placeholder="maysmith@example.com"
                  variant="outlined"
                  size="small"
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
              <div className=" flex h-20 flex-col gap-2">
                <label htmlFor="password">Your password</label>
                <TextField
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  id="password"
                  type='password'
                  placeholder="notpassword123"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </div>
            )}
          />

          <div className="flex justify-between">
            <Controller
              name="post_code"
              control={control}
              defaultValue=""
              rules={{
                required: 'Postcode is required',
              }}
              render={({field}) => (
                <div className=" flex h-20 w-[17rem] flex-col gap-2">
                  <label htmlFor="postcode">Post Code</label>
                  <TextField
                    {...field}
                    error={!!errors.post_code}
                    helperText={errors.post_code?.message}
                    id="postcode"
                    placeholder="2000"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>
              )}
            />

            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: 'Country is required',
              }}
              render={({field}) => (
                <div className=" flex h-20 w-[17rem] flex-col gap-2">
                  <label htmlFor="country">Country</label>
                  <TextField
                    {...field}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                    id="country"
                    placeholder="Australia"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </div>
              )}
            />
          </div>

          <Controller
            name="position"
            control={control}
            defaultValue=""
            rules={{
              required: 'Position is required',
            }}
            render={({field}) => (
              <div className="mb-4 flex h-20 flex-col gap-2">
                <label htmlFor="position">Position</label>
                <TextField
                  {...field}
                  error={!!errors.position}
                  helperText={errors.position?.message}
                  id="position"
                  placeholder="Manager"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </div>
            )}
          />

          <div className="mb-3">
            {/* <Button variant="contained" size="large" type="submit">
              Create account
            </Button> */}
            <LoadingButton loading={isLoading} variant="contained" size="large" type="submit">
              Create account
            </LoadingButton>
          </div>
        </form>

        <div>
          <p className="text-gray-700">
            Already have an account?{' '}
            <span className="text-blue-700 hover:underline">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </div>
      </div>
      </section>
      
      <div className='absolute bottom-2 left-3'>
        <p className='text-sm text-gray-600'>Version 1.1.1</p>
      </div>
    </main>
  );
}

export default Register;
