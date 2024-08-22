import {createSlice} from '@reduxjs/toolkit';
import {length, mappingForDropdown} from '@utils/helpers';

const INITIAL_STATE = {
  loading: true,
  weeklyTopMembers: [],
  monthlyTopMembers: [],
  yearlyTopMembers: [],
  all: [],
  allLoading: true,
  sectors: [],
  fetchQuestion: false,
};

const membersSlice = createSlice({
  name: 'members',
  initialState: INITIAL_STATE,
  reducers: {
    addTopMembers: (state, action: any = {}) => {
      const {payload} = action;
      state.loading = payload.loading;
      state.weeklyTopMembers = payload.weekly;
      state.monthlyTopMembers = payload.monthly;
      state.yearlyTopMembers = payload.yearly;
    },
    addTopWeeklyMembers: (state, action: any = {}) => {
      const {payload} = action;
      state.weeklyTopMembers = payload;
    },
    addAllMembers: (state, action: any = {}) => {
      let payload = action?.payload;

      payload = payload.filter(item => item.addresses[0]?.location?.lat);

      state.all = payload;
      state.allLoading = false;
    },
    removeSectors: state => {
      state.sectors = [];
    },
    addSectors: (state, action: any) => {
      const {lang, data} = action.payload;
      let temp: any = [];
      data?.forEach((sec: any) => {
        let row: any = {...sec};
        row.label = lang === 'ar' ? sec.arabicName : sec.englishName;
        row.value = sec.code;
        temp.push(row);
      });
      state.sectors = temp;
    },
    setRefetch: (state, action) => {
      state.fetchQuestion = action.payload;
    },
  },
});

const {
  addTopMembers,
  addTopWeeklyMembers,
  addAllMembers,
  addSectors,
  removeSectors,
  setRefetch,
} = membersSlice.actions;
const membersReducer = membersSlice.reducer;

export {
  addTopMembers,
  addTopWeeklyMembers,
  addAllMembers,
  addSectors,
  removeSectors,
  membersReducer,
  setRefetch,
};
export default membersSlice;
