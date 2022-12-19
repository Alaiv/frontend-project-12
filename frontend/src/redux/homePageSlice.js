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
    setCurrentChat: (state, { payload }) => {
      state.channelData.currentChannelId = payload;
    },
    addNewChannel: (state, { payload }) => {
      const { id } = payload;
      state.channelData.channels[id] = payload;
      state.channelData.currentChannelId = id;
    },
    renameTheChannel: (state, { payload }) => {
      const { id, name } = payload;
      state.channelData.channels[id].name = name;
    },
    removeChannel: (state, { payload }) => {
      const newChannels = Object.values(state.channelData.channels)
        .filter((channel) => payload.id !== channel.id)
        .reduce((acc, val) => {
          const { id } = val;
          acc[id] = val;
          return acc;
        }, {});

      const newComments = state.messagesData.messages
        .filter((msg) => payload.id !== msg.channelId);

      if (state.channelData.currentChannelId === payload.id) {
        state.channelData.currentChannelId = 1;
      }

      state.channelData.channels = newChannels;
      state.messagesData.messages = newComments;
    },
  },
});

export const { actions } = homePageSlice;
export default homePageSlice.reducer;
