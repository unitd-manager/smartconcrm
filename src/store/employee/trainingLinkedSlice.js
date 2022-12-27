import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createTrainingLinked = createAsyncThunk(
  'trainingLinked/createTrainingLinked',
  async (trainingLinkedData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/inserttrainingLinked',trainingLinkedData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const gettrainingsLinked = createAsyncThunk(
  'trainingLinked/gettrainingsLinked',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeModule/getTabTrainingLinked');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTrainingLinked = createAsyncThunk(
  'trainingLinked/getTrainingLinked',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeModule/getTabTrainingLinkedById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTrainingLinked = createAsyncThunk(
  'trainingLinked/deleteTrainingLinked',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/deleteTrainingLinked',{employee_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTrainingLinked = createAsyncThunk(
  'trainingLinked/updateTrainingLinked',
  async (updatedTrainingLinkedData, { rejectWithValue }) => {
    try {
      console.log(updatedTrainingLinkedData);
      const response = await api.post('/employeeModule/edit-trainingLinked',
        // updatedTrainingLinkedData.id,
        updatedTrainingLinkedData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const trainingLinkedSlice = createSlice({
  name: 'trainingLinked',
  initialState: {
    trainingLinked: {},
    trainingsLinked: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createTrainingLinked.pending]: (state) => {
      state.loading = true;
    },
    [createTrainingLinked.fulfilled]: (state, action) => {
      state.loading = false;

      state.trainingsLinked = [...state.trainingsLinked, action.payload];
    },
    [createTrainingLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [gettrainingsLinked.pending]: (state) => {
      state.loading = true;
    },
    [gettrainingsLinked.fulfilled]: (state, action) => {
      state.loading = false;
      state.trainingsLinked = action.payload;
      state.trainingLinked = {};
    },
    [gettrainingsLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTrainingLinked.pending]: (state) => {
      state.loading = true;
    },
    [getTrainingLinked.fulfilled]: (state, action) => {
      state.loading = false;
      state.trainingLinked = action.payload;
    },
    [getTrainingLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTrainingLinked.pending]: (state) => {
      state.loading = true;
    },
    [deleteTrainingLinked.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.trainingsLinked = state.trainingsLinked.filter((item) => item.id !== id);
      }
    },
    [deleteTrainingLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTrainingLinked.pending]: (state) => {
      state.loading = true;
    },
    [updateTrainingLinked.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.trainingsLinked.findIndex(
          (trainingLinked) => trainingLinked.id === action.payload.id
        );
        state.trainingsLinked[index] = {
          ...state.trainingsLinked[index],
          ...action.payload,
        };
      }
    },
    [updateTrainingLinked.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default trainingLinkedSlice.reducer;