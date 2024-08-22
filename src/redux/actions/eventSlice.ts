import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  allEvents: [],
  allVendors: [],
  eventsLoading: true,
};

const eventSlice = createSlice({
  name: 'event',
  initialState: INITIAL_STATE,
  reducers: {
    eventsLoading: (state, action) => {
      const {payload} = action;
      state.eventsLoading = payload;
    },
    addEvents: (state, action) => {
      const {payload} = action;
      state.allEvents = payload;
      state.eventsLoading = false;
    },
    addVendors: (state, action) => {
      const {payload} = action;
      state.allVendors = payload;
      state.eventsLoading = false;
    },
    updateEvents: (state, action) => {
      const {payload} = action;
      state.allEvents = payload;
    },
  },
});

const {addEvents, addVendors, updateEvents, eventsLoading} = eventSlice.actions;
const EventReducer = eventSlice.reducer;

export {addEvents, addVendors, updateEvents, eventsLoading, EventReducer};
export default eventSlice;
