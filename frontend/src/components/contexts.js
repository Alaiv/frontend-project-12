import React from 'react';
import { io } from 'socket.io-client';

export default React.createContext(false);

export const socket = io();
export const SocketContext = React.createContext();
