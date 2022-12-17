import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelData: {
    channels: {},
    currentChannelId: null,
  },
  messagesData: {
    messages: [],
  },
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setAllData: (state, { payload }) => {
      const { channels, currentChannelId, messages } = payload;
      channels.forEach((channel) => {
        state.channelData.channels[channel.id] = channel;
      });
      state.channelData.currentChannelId = currentChannelId;
      state.messagesData.messages = messages;
    },
    setMessage: (state, { payload }) => {
      state.messagesData.messages.push(payload);
    },
  },
});

export const { actions } = homePageSlice;
export default homePageSlice.reducer;
