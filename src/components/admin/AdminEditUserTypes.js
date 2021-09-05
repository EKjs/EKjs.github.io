import { useState, useEffect } from "react";
import { Row,Col,Alert, FloatingLabel,InputGroup,Form, Button,} from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

const AdminEditUserTypes = () => {
    const [userTypeData,setUserTypeData] = useState();
    const [selectedUserType,setSelectedUserType] = useState();
    const [typeDesc,setTypeDesc] = useState('');
    const [typeId,setTypeId] = useState('');
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [updateTypes,setUpdateTypes] = useState(false);

    useEffect(() => {
        const getTypesData = async () => {
            try {
                setLoading(true);
                const {data} = await axios.get(`${process.env.REACT_APP_BE}usertypes/`,axiosConfig);
                setUserTypeData(data);
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
        getTypesData()
    }, [updateTypes]);

    useEffect(() => {
        if(userTypeData && selectedUserType){
            const typeDesc = userTypeData.find(item=>item.id===selectedUserType);
            setTypeDesc(typeDesc.typeDescription);
            setTypeId(typeDesc.id);
        }
    }, [selectedUserType,userTypeData])

    const sendReq = async (reqType) => {
        try {
            setLoading(true);
            let data;
            if (reqType==='put'){
                data = await axios.put(`${process.env.REACT_APP_BE}usertypes/${selectedUserType}`,{userTypeId:typeId,userType:typeDesc},axiosConfig);
            }else if(reqType==='delete'){
                data = await axios.delete(`${process.env.REACT_APP_BE}usertypes/${selectedUserType}`,axiosConfig);
            }else if(reqType==='new'){
                data = await axios.post(`${process.env.REACT_APP_BE}usertypes/`,{userTypeId:typeId,userType:typeDesc},axiosConfig);
            };
            console.log(data);
            setUpdateTypes(!updateTypes)
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
    }
    if (loading) return <LoadingSpinner/>
    return (<Row>
        <Col>
        <Row className="py-4 bg-warning my-4">
            {error && <Col><Alert>{error}</Alert></Col>}
            <Col>
            <FloatingLabel controlId="floatingSelectType" label="Choose type">
                    <Form.Select aria-label="Types list" value={selectedUserType} onChange={(e)=>setSelectedUserType(parseInt(e.target.value,10))}>
                        {userTypeData.map((utype,idx)=>(
                            <option key={`uTk${idx}`} value={utype.id}>{utype.typeDescription}</option>    
                        ))}
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col>
            <InputGroup>
        <FloatingLabel controlId="floatingInputDescription" label="Type description" className="mb-1">
            <Form.Control type="text" placeholder="Type description" value={typeDesc} onChange={(e)=>setTypeDesc(e.target.value)} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInputTypeId" label="Type id" className="mb-1">
            <Form.Control type="text" placeholder="Type id" value={typeId} onChange={(e)=>setTypeId(parseInt(e.target.value,10))} required />
        </FloatingLabel>
          
          </InputGroup>
            </Col>
        </Row>
        <Row>
<Col sm={5}>
<Row>
<Col>
            <Button onClick={()=>sendReq('new')} variant="outline-dark" disabled={typeDesc.length===0}>Add New</Button>
            </Col>
            <Col>
          <Button onClick={()=>sendReq('put')} variant="outline-dark" disabled={typeDesc.length===0 || !selectedUserType}>Rename</Button>
            </Col>
          <Col>
          <Button onClick={()=>sendReq('delete')} variant="danger" disabled={typeDesc.length===0 || !selectedUserType}>Delete</Button>  
          </Col>
</Row>
</Col>
        </Row>
        </Col>
    </Row>
        )
}

export default AdminEditUserTypes
