import { useState,useEffect,useRef } from 'react';
import { Button,Form,InputGroup, Row,Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useChat from '../hooks/_useChat';

const Chat = () => {
    const {withUserId} = useParams();
    const messagesEndRef = useRef(null)
    const {messages,sendMessage,getChat} = useChat();
    const [text,setText] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect(() => {if(withUserId)getChat(withUserId)}, [withUserId,getChat]);
    useEffect(() => scrollToBottom(),[messages])
    const handlSend = (e) =>{
        e.preventDefault();
        sendMessage({toUser:parseInt(withUserId,10),message:text});
        setText('');
    }
    return (
      <Row className="mt-3">
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
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
}

export default Chat
