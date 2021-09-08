import { useContext } from "react";
import { OverlayTrigger,Tooltip,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const StartChatButton = ({ownerId}) => {
    const { isAuthenticated } = useContext(AppContext);
    if (!isAuthenticated)
    return (
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">Sign in to send a message</Tooltip>
        }
      >
        <span className="d-inline-block">
            <Button disabled>Chat</Button>
        </span>
      </OverlayTrigger>
    );

    if (ownerId === parseInt(localStorage.getItem('userId'),10))return <Button disabled>Chat</Button>
    return <Button as={Link} to={`/chat/${ownerId}`}>Chat</Button>
}

export default StartChatButton