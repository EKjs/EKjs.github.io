import axios from 'axios';
import { Alert,Row,Col,Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { Map, Marker } from "pigeon-maps";
import { TelephoneFill } from 'react-bootstrap-icons';
import AddToFavsButton from './AddToFavsButton';
import UserRating from './UserRating';
import StartChatButton from './StartChatButton';

const ViewSingleAd = () => {
    const {adId}=useParams();
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adData, setAdData] = useState({});
   
    useEffect(()=>{
       const loadAdDetails = async ()=>{
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_BE}ads/${adId}`);
            setAdData(data);
            console.log(data);
            setLoading(false);
          } catch (error) {
            if (error.response) {
              setError(error.response.data.error);
              setTimeout(() => setError(null), 5000);
              setLoading(false);
            } else {
              setError(error.message);
              setTimeout(() => setError(null), 5000);
              setLoading(false);
            }
          }
       };
       loadAdDetails()
    },[adId]);
if (loading)return <LoadingSpinner/>
    return ( <Row>
        {/*  <Row className="mb-5">
            <Col>
           <Breadcrumb>
                <Breadcrumb.Item><Link to="/">All ads</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to={`/categories/${adData.catId}`}>
                    {adData.category}
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                <Link to={`/subcategories/${adData.subCategoryId}`}>
                    {adData.subcategory}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{adData.subcategory} in {adData.cityName}</Breadcrumb.Item>
            </Breadcrumb> 
            </Col>
        </Row>*/}
        
            {error && <Alert>{error}</Alert>}
            <Col>
            <Row>
            <Col>
            <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Main page</Link></li>
            <li className="breadcrumb-item"><Link to={`/bycategory/${adData.catId}`}>{adData.category}</Link></li>
            <li className="breadcrumb-item"><Link to={`/bysubcategory/${adData.subCategoryId}`}>{adData.subCategory}</Link></li>
            <li className="breadcrumb-item"><Link to={`/bycity/${adData.cityId}`}> in {adData.cityName}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">View article</li>
{/*             <Route exact path="/bycategory/:catId" component={MainPage} />
              <Route exact path="/bycity/:cityId" component={MainPage} />
              <Route exact path="/byuser/:adsByUserId" component={MainPage} />
              <Route exact path="/bystore/:adsByStoreId" component={MainPage} /> */}
          </ol>
        </nav>
            </Col>
          </Row>
            <Row>
            <Col className="m-3 p-3" style={{backgroundColor:'#faf9f9'}}>
                <Carousel variant="dark">
                  {adData.photos && adData.photos.length>0 ? adData.photos.map((photo, idx) => (
                    <Carousel.Item key={`photoK${idx}`} >
                      <img  style={{objectFit:'scale-down',height:'25rem'}}
                        className="d-block w-100"
                        src={`${process.env.REACT_APP_BE}/images/${photo}`}
                        alt="Something interesting"
                      />
                    </Carousel.Item>
                  )) : <Carousel.Item><img  style={{objectFit:'scale-down',height:'25rem'}} className="d-block w-100" src='/images/noimg.png' alt="Nothing here" /></Carousel.Item>}
                </Carousel>
            </Col>
            </Row>
            <Row>
<Col className="m-3 p-3"  style={{backgroundColor:'#faf9f9'}}>
<Row>
<Col>
                  <h4>{adData.title}</h4>
                  <h3>{adData.price=='0' ? 'Free' : `${adData.price} €`}</h3>
                  <p className="mt-3" style={{whiteSpace:'pre-line'}}>{adData.description}</p>
              </Col>

</Row>
<Row className="mt-4">
            <Col>
                 <p className='fs-6 text-muted'>Views: {adData.views}</p> 
                  
              </Col>
              <Col>
                 <p className='fs-6 text-muted'>Status: {adData.currentStateDesc}</p> 
                  
              </Col>
              <Col className='text-center'>
              <AddToFavsButton targetId={adData.adId} description={adData.title} />
              </Col>
              <Col>
              <p className="fs-6 text-muted text-end">ID: {adData.adId}</p>
              </Col>
            </Row>
</Col>
             
            </Row>
            
            </Col>
              <Col sm={4} >
                  <Row>
                  <Col className="m-3 p-3"  style={{backgroundColor:'#faf9f9'}}>
                    {adData.storeId && (<Row><Col><Link to={`/viewstore/${adData.storeId}`} style={{textDecoration:'none'}}><h4 className="secondary">{adData.storeName}</h4></Link><br/></Col></Row>)}
                  <Row>
                  <Col sm={9}>
                    <Link className="fs-6 text-muted" to={`/byuser/${adData.ownerId}`} style={{textDecoration:'none'}}><h4>{adData.userName}</h4></Link>
                  </Col>
                  <Col className='text-end'>
                    <AddToFavsButton targetId={adData.ownerId} description={adData.userName} path='user' />
                  </Col>
                  </Row>                      
                  <Row className='mt-2'>
                    <Col>
                      <h5><TelephoneFill size={24}/> {adData.userPhone}</h5><br/>
                    
                    </Col>  
                  </Row>
                  <Row>
                    <Col>
                    <UserRating userId={adData.ownerId} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <p className='fs-5'>{adData.userType}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <p className='fs-6 text-muted'>Member since {new Date(adData.created).toLocaleString()}<br/>
                      Was online {new Date(adData.wasOnline).toLocaleString()}</p>
                    </Col>
                  </Row>
                  
                  </Col>
                  </Row>
                  <Row>
                  <Col className="m-3 p-3"  style={{backgroundColor:'#faf9f9'}}>
                  <h5>{adData.cityName}</h5>
                  <p>{adData.address}</p>
                  <Map height={300} center={adData.coords} defaultZoom={11}>
                    {adData.coords && <Marker width={50} anchor={adData.coords} />}
                  </Map>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="m-3 p-3"  style={{backgroundColor:'#faf9f9'}}>
                    <StartChatButton ownerId={adData.ownerId} />
                    {/* {adData.ownerId !== parseInt(localStorage.getItem('userId'),10) && <Button as={Link} to={`/chat/${adData.ownerId}`}>Chat</Button>} */}
                    
                  </Col>
                  </Row>
              </Col>

        </Row>



    )
}

export default ViewSingleAd
