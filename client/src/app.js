import React, {useState, useEffect} from 'react';

import io from 'socket.io-client';
import Q from '@nmq/q/client';
import useForm from './hooks/useForms.js'

// Connect outside of the render cycle ...
const queue = new Q('deeds');
const socket = io.connect('http://localhost:3000');

const App = (props) => {
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});
  const [values, handleChange, handleSubmit] = useForm({})



  function stuff (values){
    Q.publish('deeds', 'work', values);
    socket.emit('words', values);
  }


  useEffect( () => {
    queue.subscribe('work', message => {
      setQueueMessage(message);
    });

    socket.on('incoming', message => {
      setSocketMessage(message);
    });

  }, []);


  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit={(e) => handleSubmit(e, stuff)}>
        <input name='firstName' placeholder="First Name" onChange={handleChange} />
        <input name='lastName' placeholder="Last Name" onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
}

export default App;

