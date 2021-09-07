import { useState,useEffect,useRef, useCallback } from "react";
import socketIOClient from "socket.io-client";

const _useChat = () => {
    const [messages,setMessages]=useState()
    const sendMessage = ({toUser,message}) =>{
        socketRef.current.emit('newChatMessage',{toUser,message})
    }
    const socketRef = useRef();

    const getChat = useCallback((withUserId) => {
        socketRef.current.emit('getMessagesFromOneChat',withUserId);
    },[])

    useEffect(() => {
        socketRef.current = socketIOClient(process.env.REACT_APP_BE,{
            reconnection:true,
            reconnectionAttempts:5,
            auth:{token:localStorage.getItem('token')},
        });
        
        socketRef.current.on("messagesFromChat", (data) => {
            setMessages(data);
            console.log('msgs',data);
          });
        socketRef.current.on("connect_error",(err)=>{
            console.log('Connection error...',err.data.content);
            //console.log('error',err);
        });
        socketRef.current.on("error", (error) => {
            // ...
            console.log('erro1234321',error);
          });

        socketRef.current.on("disconnect", () => {
            console.log('Disconnected!');
          });
        socketRef.current.on("newChatMessage",(message)=>{
            setMessages(prev=>[...prev,message])
            console.log('msg',message);
        });

        socketRef.current.onAny((evt, ...args)=>{
            console.log(evt,args);
        })
        return ()=>socketRef.current.disconnect();
    }, []);
    return {messages,sendMessage,getChat}
};

export default _useChat
