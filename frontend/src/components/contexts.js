import React from 'react';
import { io } from 'socket.io-client';

export const AuthContext = React.createContext(false);

export const socket = io();
export const SocketContext = React.createContext();
