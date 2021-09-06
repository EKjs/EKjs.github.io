import React, { useState } from 'react';
import SocketIOClient from 'socket.io-client';
import { Button } from 'react-bootstrap';

const myWs = new WebSocket('ws://localhost:8080');

myWs.onmessage = function (message) {
    console.log('Message: %s', message.data);
};

const Chat = () => {
    const [text,setText] = useState('');
    const handlOpenCon = () =>{
        myWs.onopen = function () {
            console.log('подключился');
        };
    };
    const handlEcho = () =>{
        myWs.send();
    }
    return (
            <div>
                <Button onClick={handlOpenCon} >open conn</Button><br/>
                <input type='text' value={text} onChange={(e)=>setText(e.target.value)} />
                <Button onClick={handlEcho} >open conn</Button>
            </div>
    )
}

export default Chat
