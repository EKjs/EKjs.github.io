import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Row,Col,ToastContainer,Toast,Table,Modal,Alert,Button,Form,FloatingLabel } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import { PencilSquare,Trash } from "react-bootstrap-icons";
import axios from "axios";
const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
const AdminListUsers = () => {
    const [usersList,setUsersList] = useState();
    const [userTypeData,setUserTypeData] = useState();
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [showToast,setShowToast] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [showModalEditor,setShowModalEditor] = useState(false);
    const [editDeleteId,setEditDeleteId] = useState();
    const [updateUserList,setUpdateUserList] = useState(true);
    
    const [userName,setUserName] = useState();
    const [userEmail,setUserEmail] = useState();
    const [userPhone,setUserPhone] = useState();
    const [selectedUserType,setSelectedUserType] = useState();
    

    const handleModalClose = () => setShowModal(false);
    const handleModalEditorClose = () => setShowModalEditor(false);
    const handleDeleteUser = async() => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`${process.env.REACT_APP_BE}users/${editDeleteId}`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
            console.log(data);
            setShowModal(false);
            if (data.id===editDeleteId){
              setShowToast(true);
            }
            setLoading(false);
            setUpdateUserList(prev=>!prev)
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
    const handleSaveChanges = async() => {
        const newUserData = {
            userName: userName,
            email: userEmail,
            phone: userPhone,
            userType:selectedUserType,
        }
        try {
            setLoading(true);
            const { data } = await axios.put(`${process.env.REACT_APP_BE}users/${editDeleteId}`,newUserData,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
            console.log(data);
            setShowModalEditor(false);
            if (data.id===editDeleteId){
              setShowToast(true);
            }
            setLoading(false);
            setUpdateUserList(prev=>!prev)
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
        const getUserTypeData = async () => {
            try {
                //setLoading(true);
                const {data} = await axios.get(`${process.env.REACT_APP_BE}usertypes/`,axiosConfig);
                setUserTypeData(data);
                console.log(data);
                //setLoading(false);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.error);
                    //setTimeout(() => setError(null), 3000);
                    //setLoading(false);
                  } else {
                    setError(error.message);
                    //setTimeout(() => setError(null), 3000);
                    //setLoading(false);
                  }
            }
        };
        getUserTypeData()
    }, [])
    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const {data} = await axios.get(`${process.env.REACT_APP_BE}users/`,axiosConfig);
                setUsersList(data);
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
        getUserData();
    }, [updateUserList])

    if (loading) return <LoadingSpinner />;
    if (error) return <Alert variant="danger">{error}</Alert>;

 return (<>
                <Row>
          <Col>
            <Row className='mb-4'>
              <Col className='text-center'>
                <h4>Users: </h4>
              </Col> 
            </Row>
      <Row>
      <ToastContainer className="p-3" position={'middle-center'}>
      <Toast bg='warning' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body> Action on user ID # {editDeleteId} was performed! </Toast.Body>
        </Toast>
      </ToastContainer>
        <Table responsive="sm">
    <thead>
      <tr>
        <th>User name</th>
        <th>E-mail</th>
        <th>Registered</th>
        <th>Was online</th>
        <th>Phone</th>
        <th>Store</th>
        <th>Type</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
            {usersList.map((user,idx)=>(
            <tr key={`usrK${idx}`}>
              <td><Link to={`/byuser/${user.id}`} style={{textDecoration:'none'}}>{user.name}</Link></td>
              <td>{user.email}</td>
              <td>{new Date(user.registerDate).toLocaleString()}</td>
              <td>{new Date(user.wasOnline).toLocaleString()}</td>
              <td>{user.phone}</td>
              <td><Link to={`/viewstore/${user.storeId}`} style={{textDecoration:'none'}}>{user.storeTitle}</Link></td>
              <td>{user.userType}</td>
              <td><PencilSquare size={24} style={{cursor:'pointer'}} onClick={()=>{
                //setEditFavText(fav.description);
                setEditDeleteId(user.id);
                setSelectedUserType(user.userTypeId);
                setUserName(user.name);
                setUserEmail(user.email);
                setUserPhone(user.phone);
                setShowModalEditor(true);
              }}/>{" "}<Trash size={24} style={{cursor:'pointer'}} onClick={()=>{
                setEditDeleteId(user.id);
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
        Do you really want to delete user with ID # {editDeleteId} ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleModalClose}>
          No, missclicked!
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>Yes, pls delete!</Button>
      </Modal.Footer>
    </Modal>
    <Modal
      show={showModalEditor}
      onHide={handleModalEditorClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control value={userName} cols={40} onChange={(e)=>setUserName(e.target.value)} type="text" className='mb-2' />
        <Form.Control value={userEmail} cols={40} onChange={(e)=>setUserEmail(e.target.value)} type="text" className='mb-2' />
        <Form.Control value={userPhone} cols={40} onChange={(e)=>setUserPhone(e.target.value)} type="text" className='mb-2' />
        <FloatingLabel controlId="floatingSelectType" label="Choose type">
                    <Form.Select aria-label="Types list" value={selectedUserType} onChange={(e)=>setSelectedUserType(parseInt(e.target.value,10))}>
                        {userTypeData && userTypeData.map((utype,idx)=>(
                            <option key={`uTk${idx}`} value={utype.id}>{utype.typeDescription}</option>    
                        ))}
                    </Form.Select>
                </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleModalEditorClose}>
          No, missclicked!
        </Button>
        <Button variant="danger" onClick={handleSaveChanges}>Save changes</Button>
      </Modal.Footer>
    </Modal> 
    </>
    )
}

export default AdminListUsers
