import i18n from '@assets/localization/i18n';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {saveData} from '@utils/apiService';

const INITIAL_STATE = {
  gander: [
    {
      code: 'Male',
      englishName: 'Male',
      arabicName: 'ذكر',
      label: i18n.t('Male'),
    },
    {
      code: 'Female',
      englishName: 'Female',
      arabicName: 'أنثى',
      label: i18n.t('Female'),
    },
  ],
  sports: [],

  dark: false,
  lang: 'en',
  notificationCount: 0,
  RTL: false,
  notificationPermission: false,
  headerText: '',

  defaultLoading: {
    loading: false,
  },
  appNotification: {
    status: false,
    data: {},
  },
};

const utilSlice = createSlice({
  name: 'utils',
  initialState: INITIAL_STATE,
  reducers: {
    setNotificationCount: (state, action) => {
      const {payload} = action;
      state.notificationCount = payload;
    },
    setAllSports: (state, action) => {
      const {payload} = action;
      state.sports = payload;
    },
    setLang: (state, action) => {
      const {payload} = action;
      state.lang = payload.lang;
      state.RTL = payload.RTL;
    },
    switchDark: state => {
      state.dark = !state.dark;
    },
    showDefaultLoading: (state, action: any) => {
      const {payload} = action;
      state.defaultLoading = payload;
    },
    setNotificationPermission: (state, action) => {
      const {payload} = action;
      state.notificationPermission = payload;
    },
  },
});

const {
  switchDark,
  setLang,
  setNotificationCount,
  showDefaultLoading,
  setNotificationPermission,
  setAllSports,
} = utilSlice.actions;
const UtilsReducer = utilSlice.reducer;

export {
  switchDark,
  setLang,
  setNotificationCount,
  showDefaultLoading,
  setNotificationPermission,
  setAllSports,
  UtilsReducer,
};
export default utilSlice;
