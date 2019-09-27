import React, {useState, useEffect} from 'react';

import useForm from './hooks/useForms.js';
import useSocket from './hooks/useSocket.js';
import useQ from './hooks/q.js';


const App = (props) => {

  const handlePublish = (vals) => {
    queuePublish('deeds', 'work', vals);
    socketPublish('words', vals);
  }

  const [handleChange, handleSubmit, values] = useForm(handlePublish);
  const [queueMessage, setQueueMessage] = useState({});
  const [socketMessage, setSocketMessage] = useState({});
  const [socketPublish, socketSubscribe] = useSocket();
  const [queuePublish, queueSubscribe] = useQ('deeds');

  useEffect(() => {
    queueSubscribe('work', message => {
      setQueueMessage(message);
    });

    socketSubscribe('incoming', message => {
      setSocketMessage(message);
    });

  }, []);


  return (
    <>
      <pre>Form Values: {JSON.stringify(values)}</pre>
      <pre>Queue Values: {JSON.stringify(queueMessage)}</pre>
      <pre>Socket Values: {JSON.stringify(socketMessage)}</pre>
      <form onSubmit ={handleSubmit}>
        <input name='firstName' placeholder="First Name" onChange={handleChange} />
        <input name='lastName' placeholder="Last Name" onChange={handleChange} />
        <button>Save</button>
      </form>
    </>
  );
}

export default App;

