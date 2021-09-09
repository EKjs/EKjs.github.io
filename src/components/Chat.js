import { useState,useEffect,useRef } from 'react';
import { Button,Form,InputGroup, Row,Col,Modal,Container,Toast,ToastContainer } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useChat from '../hooks/_useChat';
import { CameraVideo } from 'react-bootstrap-icons';

const Chat = () => {
    const {withUserId} = useParams();
    const messagesEndRef = useRef(null)
    const {messages,sendMessage,getChat, callUser, setStream, answerCall,leaveCall,userVideoRef,myVideoRef,callAccepted,callEnded,recievingCall} = useChat();
    const [text,setText] = useState('');

    const [videoModalShow, setVideoModalShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleVideoModalClose = () =>{
      if(recievingCall || callAccepted){
        leaveCall(withUserId);
      }
      setVideoModalShow(false);
    };
    const initVideo = () => {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
            frameRate:24,
            width:{
                min:480,ideal:720,max:1280
            },
            aspectRatio:1.33333
        },
    })
    .then((stream4) => {
        console.log('stream',stream4);
        setStream(stream4);
        myVideoRef.current.srcObject=stream4;
        //addVideoStream(myVideo, stream);
    })
    .catch(err=>console.log(err));
    };
    const handleButtonAnswerCall = () =>{
      setShowToast(false);
      handleButtonShowVideoCall();
    };

    const handleButtonCancelCall = () =>{
      setShowToast(false);
    };

    const handleButtonShowVideoCall = () =>{
      initVideo();
      setVideoModalShow(true);
    }
    const handleButtonCallUser = () =>{
      console.log('call');
      callUser(withUserId);
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect(() => {if (recievingCall)setShowToast(true)}, [recievingCall]);
    useEffect(() => {if (callEnded)handleVideoModalClose()}, [callEnded]);

    useEffect(() => {if(withUserId)getChat(withUserId)}, [withUserId,getChat]);
    useEffect(() => scrollToBottom(),[messages])
    const handlSend = (e) =>{
        e.preventDefault();
        sendMessage({toUser:parseInt(withUserId,10),message:text});
        setText('');
    }
    return (<>
      <Row className="mt-3">
      <ToastContainer className="p-3" position={'middle-center'}>
      <Toast bg='light' onClose={() => setShowToast(false)} show={showToast}>
      <Toast.Header closeButton={false}>
        <strong className="me-auto">Incoming call</strong>
      </Toast.Header>
          <Toast.Body> 
            {recievingCall && !callAccepted && <>
            <Button variant='outline-success' onClick={()=>handleButtonAnswerCall()}>Open window</Button>{" "}
            <Button variant='outline-secondary' onClick={()=>handleButtonCancelCall()}>Cancel call</Button> 
            </>}
            </Toast.Body>
        </Toast>
      </ToastContainer>
        <Col>
          <Row>
            <Col>
            <h4>Chat</h4>
            </Col>
          </Row>
          <Row className='mt-2 border-top'>
            <Col>
              <div className="overflow-auto" style={{ height: "40vh" }}>
                {messages &&
                  messages.map((msg, idx) => (
                    <div key={`msgind${idx}`}>
                      <p>
                        <span className="h5">{msg.senderName} </span>{" "}
                        <em>
                          <small>
                            {new Date(msg.msgTimeStamp).toLocaleString()}
                          </small>
                        </em>
                      </p>
                      <p>{msg.message}</p>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>

            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
            <Form onSubmit={handlSend}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter your message here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Button type="submit">Send</Button>
                  <Button variant="outline-info" onClick={()=>handleButtonShowVideoCall()}><CameraVideo size={30}/></Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
            
            </Col>
            <Col>
            
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
      size="lg"
      show={videoModalShow}
      onHide={handleVideoModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Video chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col sm={3}>
              <video style={{height:'5rem', width:'auto'}} playsInline ref={myVideoRef} autoPlay></video>
            </Col>
          </Row>
          <Row className='justify-content-center'>
          
          {callAccepted &&
            <video style={{maxHeight:'18rem', maxWidth:'18rem'}} playsInline ref={userVideoRef} autoPlay></video>
            }
          
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
      {recievingCall && !callAccepted && <Button variant="danger" onClick={()=>answerCall(withUserId)}>Answer call</Button>}
      {!recievingCall && !callAccepted && <Button variant="danger" onClick={()=>handleButtonCallUser()}>Call user</Button>}
      
        <Button variant="danger" onClick={()=>handleVideoModalClose()}>Leave call</Button>
      </Modal.Footer>
    </Modal>
    </>);
}

export default Chat
