import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { api } from './api';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: import.meta.env.VITE_REVERB_PORT,

    forceTLS: false,

    enabledTransports: ['ws'],

    authorizer: (channel) => ({
        authorize: (socketId, callback) => {
            api.post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
            })
                .then((response) => callback(null, response.data))
                .catch((error) => callback(error));
        },
    }),
});

window.Echo = echo;

window.Echo.connector.pusher.connection.bind('connected', () => {
    console.log('WEBSOCKET CONECTADO');
});

window.Echo.connector.pusher.connection.bind('error', (err) => {
    console.log('ERRO WEBSOCKET');

    console.log(err);
});

export default echo;