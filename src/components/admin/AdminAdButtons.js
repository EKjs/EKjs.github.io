import axios from "axios";
import { useState } from "react";
import { Card,Modal,Button,Toast,ToastContainer } from "react-bootstrap";
import { Pencil,Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const AdminAdButtons = ({adId}) => {
  const [showModal,setShowModal] = useState(false);
  const [showToast,setShowToast] = useState(false);
  const userType = localStorage.getItem("userType");
  const handleModalClose = () => setShowModal(false);
  const handleDeleteArticle = async () => {
    
    try {
      //setLoading(true);
      const { data } = await axios.delete(`${process.env.REACT_APP_BE}ads/${adId}`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
      console.log(data);
      setShowModal(false);
      if (data.id===adId){
        setShowToast(true)
      }
      //setLoading(false);
      //setUpdateMyAdsList(prev=>!prev);
      
    } catch (error) {
      if (error.response) {
        //setError(error.response.data.error);
        // setTimeout(() => setError(null), 5000);
        //setLoading(false);
      } else {
        //setError(error.message);
        // setTimeout(() => setError(null), 5000);
        //setLoading(false);
      }
    }
  }
  
  if (userType==='999')return (<>
        <Card.Header>
        <Link to={`/editad/${adId}`} style={{textDecoration:'none'}}><Pencil  style={{ cursor: "pointer" }} /></Link>
          <Trash  style={{ cursor: "pointer" }} onClick={()=>setShowModal(true)} />
        </Card.Header>
        <Modal
          show={showModal}
          onHide={handleModalClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Confirmation needed!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to delete this article?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleModalClose}>
              No, missclicked!
            </Button>
            <Button variant="danger" onClick={handleDeleteArticle}>
              Yes, pls delete!
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer className="p-3" position={'middle-center'}>
      <Toast bg='warning' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body> Article # {adId} was deleted! </Toast.Body>
        </Toast>
      </ToastContainer>
        </>
    )
    else return null
}

export default AdminAdButtons