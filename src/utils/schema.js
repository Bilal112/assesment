import * as yup from 'yup';

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
// var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

export const loginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      // .email('Enter a valid email')
      .optional('Email or username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain attest 8 characters')
      .max(30, 'Password must contain maximum 30 characters'),
  })
  .required();

export const forgetSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

export const registerSchema = yup.object().shape({
  // arabicName: yup.string().required('Arabic Name is required').max(35),
  firstName: yup.string().required('English Name is required').max(35),
  lastName: yup.string().required('English Name is required').max(35),
  userName: yup.string().required('User Name is required').max(35),
  emailAddress: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain attest 8 characters')
    .max(30, 'Password must contain maximum 30 characters'),
  confirmPassword: yup
    .string()
    .required('confirm Password is required')
    .min(8, 'Password must contain attest 8 characters')
    .max(30, 'Password must contain maximum 30 characters'),
  // mobileExt: yup.string().required('extension is required'),
  // mobile: yup.number().required('number is required'),
  // .matches(phoneRegExp, 'Phone number is not valid'),
});

export const editProfile = yup.object().shape({
  firstName: yup.string().required('English Name is required').max(20),
  lastName: yup.string().required('English Name is required').max(20),
  username: yup.string().required('User Name is required').max(15),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  location: yup.string().required('Location is Required').min(10).max(200),
  gender: yup.string().required('Gender is Required').max(18),
  dob: yup.string().required('Date of Birth Required').max(40),
  bio: yup.string().max(150),
  contact: yup.string().min(7).max(10),
  companyId: yup.string().required('Select Company is Required').max(35),
});

export const appointmentSchema = yup.object().shape({
  guestEmail: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  mobileExt: yup.string().required('extension is required'),
  mobile: yup.string().required('number is required'),
  name: yup.string().required('Name is required').max(35),
  date: yup.string().required('Date is required'),
  time: yup.string(),
  sectorCode: yup.string().required('Sector is required'),
  appliedVoucherId: yup.string().max(300),
  comments: yup.string().max(300),
});

export const AddSportSchema = yup.object().shape({
  sportId: yup.string().required('Sport is required'),
  position: yup.string().max(50),
  level_of_play: yup.number().required('Mention the level of sport'),
});

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain attest 8 characters')
    .max(30, 'Password must contain maximum 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain attest 8 characters')
    .max(30, 'Password must contain maximum 30 characters'),
  confirmPassword: yup
    .string()
    .required('confirm Password is required')
    .min(8, 'Password must contain attest 8 characters')
    .max(30, 'Password must contain maximum 30 characters'),
});

export const AddPostSchema = yup.object().shape({
  sports_id: yup.string().required('Sport is required'),
  description: yup.string().max(150),
  activity: yup.string(),
  packageId: yup.string(),
});

export const AddActivitySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  fees: yup.number().max(1000),
  no_of_players: yup.number(),
  no_of_team: yup.number(),
  gender: yup.string(),
  sports_id: yup.string().required('Sport is required'),
  complete_address: yup.string().required('Address is required'),
  description: yup.string().max(100),
  date: yup
    .string()
    .required('Date is required')
    .test('future-date', 'Date must be in the future', function (value) {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      return selectedDate >= currentDate;
    }),
  startTime: yup.string().required('Time is required'),
  endTime: yup.string().required('Time is required'),
  status: yup.string().max(10).required('Status is required'),
});
