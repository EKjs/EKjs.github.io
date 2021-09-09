import { useState,useEffect,useRef, useCallback } from "react";
import socketIOClient from "socket.io-client";
import Peer from 'simple-peer';

const _useChat = () => {
    const [messages,setMessages]=useState();
    const [recievingCall,setRecievingCall]=useState(false);
    const [callerSignal,setCallerSignal]=useState();
    const [callAccepted,setCallAccepted]=useState();
    const [callEnded,setCallEnded]=useState(false);
    
    const [stream,setStream]=useState();
    const myVideoRef = useRef();
    const userVideoRef = useRef();
    const connectionRef = useRef();

    const sendMessage = ({toUser,message}) =>{
        socketRef.current.emit('newChatMessage',{toUser,message})
    }
    const socketRef = useRef();

    const getChat = useCallback((withUserId) => {
        socketRef.current.emit('getMessagesFromOneChat',withUserId);
    },[]);

    const callUser = (id) => {
        const peer = new Peer({
            initiator:true,
            trickle:false,
            stream:stream
        });
        peer.on('signal',(data)=>{
            socketRef.current.emit('callUser',{
                userToCall: id,
                signalData:data
            })
        });
        peer.on('stream',(stream2)=>{
            console.log('gotstream',stream2);
            userVideoRef.current.srcObject=stream2;
        });

        socketRef.current.on('callAccepted',(signal6)=>{
            console.log('call accepted (signal)',signal6);
            setCallAccepted(true);
            peer.signal(signal6);
        });

        connectionRef.current=peer;
    };

    const answerCall = (id) =>{

        setCallAccepted(true);
        const peer = new Peer({
            initiator:false,
            trickle:false,
            stream:stream
        });
        peer.on('signal',(data)=>{
            console.log('signal answer call',data);
            socketRef.current.emit('answerCall',{
                signal:data,
                userToAnswer:id
            })
        });
        peer.on('stream',(stream3)=>{
            console.log('got stream',stream3);
            userVideoRef.current.srcObject=stream3;
        });
        console.log('caller signal',callerSignal);
        peer.signal(callerSignal);
        connectionRef.current=peer;
    };
    const leaveCall = (id) =>{
        console.log('leaving call');
        setCallEnded(true);
        socketRef.current.emit('endCall',{endCallWithUser:id})
        connectionRef.current.destroy()
    };



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

        socketRef.current.on("callUser",(data)=>{
            setRecievingCall(true);
            console.log('user is calling',data);
            setCallerSignal(data.signal);
        });
        socketRef.current.on("endCall",()=>{
            setCallEnded(true);
        });
        /* socketRef.current.onAny((evt, ...args)=>{
            console.log(evt,args);
        }) */
        return ()=>socketRef.current.disconnect();
    }, []);
    return {messages,sendMessage,getChat, setStream, callUser, answerCall,leaveCall,userVideoRef,myVideoRef,callAccepted,callEnded,recievingCall}
};

export default _useChat
