import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Row,Col,ToastContainer,Toast,Table,Modal,Alert,Button } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import { PencilSquare,Trash } from "react-bootstrap-icons";
import axios from "axios";
const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
const AdminListStores = () => {
    const [storesList,setStoresList] = useState();
    
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [showToast,setShowToast] = useState(false);
    const [showModal,setShowModal] = useState(false);
    
    const [editDeleteId,setEditDeleteId] = useState();
    const [updateStoresList,setUpdateStoresList] = useState(true);

    const handleModalClose = () => setShowModal(false);

    const handleDeleteStore = async() => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`${process.env.REACT_APP_BE}stores/${editDeleteId}`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
            console.log(data);
            setShowModal(false);
            if (data.id===editDeleteId){
              setShowToast(true);
            }
            setLoading(false);
            setUpdateStoresList(prev=>!prev)
          } catch (error) {
            if (error.response) {
              setError(error.response.data.error);
              //setTimeout(() => setError(null), 5000);
              setLoading(false);
            } else {
              setError(error.message);
             // setTimeout(() => setError(null), 5000);
              setLoading(false);
            }
          }
    };

    useEffect(() => {
        const getStoresData = async () => {
            try {
                setLoading(true);
                const {data} = await axios.get(`${process.env.REACT_APP_BE}stores/`,axiosConfig);
                setStoresList(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.error);
                    setTimeout(() => setError(null), 3000);
                    setLoading(false);
                  } else {
                    setError(error.message);
                    setTimeout(() => setError(null), 3000);
                    setLoading(false);
                  }
            }
        };
        getStoresData();
    }, [updateStoresList])

    if (loading) return <LoadingSpinner />;
    if (error) return <Alert variant="danger">{error}</Alert>;

 return (<>
                <Row>
          <Col>
            <Row className='mb-4'>
              <Col className='text-center'>
                <h4>Stores: </h4>
              </Col> 
            </Row>
      <Row>
      <ToastContainer className="p-3" position={'middle-center'}>
      <Toast bg='warning' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body> Store ID # {editDeleteId} was deleted! </Toast.Body>
        </Toast>
      </ToastContainer>
        <Table responsive="sm">
    <thead>
      <tr>
        <th>Store</th>
        <th>Description</th>
        <th>Admin</th>
        <th>Address</th>
        <th>City</th>
        <th>Logo</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
            {storesList.map((str,idx)=>(
            <tr key={`sTrK${idx}`}>
              <td><Link to={`/viewstore/${str.id}`} style={{textDecoration:'none'}}>{str.title}</Link></td>
              <td>{str.description && str.description.length>50 ? str.description.substring(0,50)+'...' : str.description}</td>
              <td>{str.storeAdmin} id#{str.adminId}</td>
              <td>{str.address}</td>
              <td><Link to={`/bycity/${str.cityId}`} style={{textDecoration:'none'}}>{str.cityName}</Link></td>
              <td> <img src={str.photo} style={{maxWidth:'30px',height:'auto',maxHeight:'30px'}} alt='store logo' /> </td>

              <td> <Link to={`/editstore/${str.id}`} > <PencilSquare size={24} style={{cursor:'pointer'}} /></Link>{" "}<Trash size={24} style={{cursor:'pointer'}} onClick={()=>{
                setEditDeleteId(str.id);
                setShowModal(true)
              }} /></td>
            </tr> ))}
      </tbody>
      </Table>
        </Row>
        </Col></Row>
        <Modal
      show={showModal}
      onHide={handleModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Please confirm!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you really want to delete store with ID # {editDeleteId} ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleModalClose}>
          No, missclicked!
        </Button>
        <Button variant="danger" onClick={handleDeleteStore}>Yes, pls delete!</Button>
      </Modal.Footer>
    </Modal>
    </>
    )
}

export default AdminListStores
