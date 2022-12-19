export const checkForDuplicate = (createdCname, stateChannels) => (
  stateChannels.every(({ name }) => name !== createdCname)
);

export const stuff = (act) => () => {
  console.log('hi');
};

export const myHandleSubmitWithSocket = (
  values,
  setErrors,
  socket,
  resetForm,
  channelData,
  f,
) => {
  if (!values.channelName.length) {
    setErrors({ channelName: 'Поле обязательно' });
    return false;
  }

  if (checkForDuplicate(values.channelName, Object.values(channelData.channels))) {
    f(socket, values);
    resetForm({ channelName: '' });
  } else {
    setErrors({ channelName: 'Имя должно быть уникальным' });
    return false;
  }
  return true;
};
