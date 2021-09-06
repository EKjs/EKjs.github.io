import axios from "axios";
import { useState,useEffect } from "react";
import { Row, Col,Alert,Table,Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const MyChats = () => {
    const [chatsData, setChatsData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError]= useState(null);

    useEffect(() => {
        const getMyChats = async () => {
            try {
                setLoading(true);
                console.log(process.env.REACT_APP_BE);
                const { data } = await axios.get(`${process.env.REACT_APP_BE}chats/mychats/`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
                setChatsData(data);
                console.log(data);
                setLoading(false);
              } catch (error) {
                if (error.response) {
                  setError(error.response.data.error);
                  // setTimeout(() => setError(null), 3000);
                  setLoading(false);
                } else {
                  setError(error.message);
                  // setTimeout(() => setError(null), 3000);
                  setLoading(false);
                }
              }
        }
        getMyChats();
    }, [])

    if (loading) return <LoadingSpinner />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
<Row>
          <Col>
            <Row className='mb-4'>
              <Col className='text-center'>
                <h4>Your recent chats</h4>
              </Col> 
            </Row>
            <Row className='mb-4'>
              <Col>
              <Table responsive="sm">
    <thead>
      <tr>
        <th>Date</th>
        <th>User</th>
        <th>Last message</th>
      </tr>
    </thead>
    <tbody>
            {chatsData.map((chat,idx)=>(
            <tr key={`chtk${idx}`}>
              <td><Link to={`/chat/${chat.idToChat}`} style={{textDecoration:'none'}}>{new Date(chat.msgTimeStamp).toLocaleString()}</Link></td>
              <td><Link to={`/chat/${chat.idToChat}`} style={{textDecoration:'none'}}>{chat.nameToChat}</Link>
              {chat.markUnread && <Badge pill bg="warning" text="dark"> NEW</Badge>}
              </td>
              <td><p><span className='text-muted'><small>{chat.senderName}: </small></span> <em> {chat.message}</em></p></td>
            </tr> ))}
      </tbody>
      </Table>
              </Col> 
            </Row>
        </Col>
</Row>
    )
}

export default MyChats
