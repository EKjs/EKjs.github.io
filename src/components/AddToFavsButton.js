import axios from "axios";
import { useState,useContext } from "react";
import { OverlayTrigger,Tooltip } from "react-bootstrap";
import { AppContext } from "../context/AppContext";
import { Heart,HeartFill,Star,StarFill } from "react-bootstrap-icons";

const AddToFavsButton = ({targetId,description,path}) => {
    const { isAuthenticated } = useContext(AppContext);
    const [addedToFavs,setAddedToFavs] = useState(false);

    const addToFavors = async(id,descr) => {
        let url=`${process.env.REACT_APP_BE}favads/`;
        let favData = {
            favAdId: targetId,
            description: description,
          };
        if (path==='user'){
            url=`${process.env.REACT_APP_BE}favusers/`;
            favData = {
                favUserId: targetId,
                description: description,
              };
        }
        try {
            const { data } = await axios.post(url,favData,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
            console.log(data);
            setAddedToFavs(true);
          } catch (error) {
            if (error.response) console.log(error.response.data.error);
            else console.log(error.message);
          }
      }

      if (!isAuthenticated)
        return (
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">Sign in to add to favs</Tooltip>
            }
          >
            <span className="d-inline-block">
              {path==='user' ? <Star style={{ pointerEvents: "none" }}/>:<Heart style={{ pointerEvents: "none" }} />}
            </span>
          </OverlayTrigger>
        );
      if (addedToFavs){
        if (path==='user')return <StarFill  color="red" />;
        return <HeartFill  color="red" />;
      }
      else{
        if (path==='user')return <Star  color="red" style={{ cursor: "pointer" }} onClick={() => addToFavors()} />;
        return (
          <Heart
            
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => addToFavors()}
          />
        );
      }

}

export default AddToFavsButton
