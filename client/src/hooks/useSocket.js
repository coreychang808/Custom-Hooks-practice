// import { useState } from 'react';
// import io from 'socket.io-client';
// import Q from '@nmq/q/client';

// function useSockets(){
//     // Connect outside of the render cycle ...
//     const queue = new Q('deeds');
//     const socket = io.connect('http://localhost:3000');

//     function useEffect( (event) => {

//         queue.subscribe('work', message => {
//           setQueueMessage(message);
//         });
    
//         socket.on('incoming', message => {
//           setSocketMessage(message);
//         });
    
//       }, []);

//     function stuff (values){
//         Q.publish('deeds', 'work', values);
//         socket.emit('words', values);
//       }
//       return [ stuff, useEffect];
// }

// export default useSockets;

