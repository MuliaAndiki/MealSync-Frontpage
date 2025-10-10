import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocketConnection = (): Socket => {
  if (!socket) {
    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinRestaurantRoom = (restaurantId: string): void => {
  if (socket && socket.connected) {
    socket.emit('join:restaurant', restaurantId);
    console.log('Joined restaurant room:', restaurantId);
  }
};
