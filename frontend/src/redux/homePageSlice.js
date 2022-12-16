import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelData: {
    channels: {},
    currentChannelId: null,
  },
  messagesData: {
    messages: [
      { channelId: 1, text: 'hello there' },
    ],
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
      const msgs = messages.length ? messages : [{ channelId: 1, id: 1, text: 'hello there' }, { channelId: 1, id: 2, text: 'hello there2' }];
      state.messagesData.messages = msgs;
    },
  },
});

export const { actions } = homePageSlice;
export default homePageSlice.reducer;
