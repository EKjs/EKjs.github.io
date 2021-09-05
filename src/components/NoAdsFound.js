import { Row,Col } from "react-bootstrap";
const NoAdsFound = () => {
    return (
      <Row className="d-flex align-items-center justify-content-center my-5" style={{minHeight:'30vh'}}>
            <Col className='text-center'>
                <h4>Nothing found...</h4>
                <p>Choose another category or change your search options...</p>
            </Col>
      </Row>
    );
}

export default NoAdsFound
