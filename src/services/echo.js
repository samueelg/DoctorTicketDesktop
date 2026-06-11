import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,

    wsPort: import.meta.env.VITE_REVERB_PORT,

    forceTLS: false,

    enabledTransports: ['ws'],
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