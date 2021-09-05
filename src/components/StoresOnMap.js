import { useState,useCallback,useEffect } from "react"
import { Col, Row, InputGroup,FormControl } from "react-bootstrap";
import { Map,Marker,Overlay } from "pigeon-maps";
import { osm } from 'pigeon-maps/providers'
import { GeoAlt } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import CitiesSearchInput from "./CitiesSearchInput";

const StoresOnMap = () => {
    const [storesData,setStoresData] = useState([]);
    const [coords,setCoords] = useState();
    const [radius,setRadius] = useState(10);
    /* const [cityPlaceholder,setCityPlaceholder] = useState(''); */
/*     const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false); */
    
    const loadStores = useCallback(() => {
        console.log(coords);
        const reqData = {
            coords:coords,
            radius:radius,
        };
        console.log(reqData);
            const loadFunc = async () => {
                try {
                    //setLoading(true);
                    const { data } = await axios.post(`${process.env.REACT_APP_BE}stores/bycoords`,reqData);
                    setStoresData(data);
                    console.log(data);
                    //setLoading(false);
                  } catch (error) {
                    if (error.response) {
                      //setError(error.response.data.error);
                      //setTimeout(() => setError(null), 5000);
                      //setLoading(false);
                    } else {
                      //setError(error.message);
                      //setTimeout(() => setError(null), 5000);
                      //setLoading(false);
                    }
                  }
            };
            loadFunc();
        },
    [coords,radius])

    useEffect(() => loadStores(), [coords,radius,loadStores]);

    const setCurCityId = () => {}
    const mapClick = ({ latLng }) => {
        setCoords(latLng);
    };

    useEffect(()=>{
        if (!coords){
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
                };
            const success=pos=>setCoords([pos.coords.latitude,pos.coords.longitude]);
            const error=err=>console.warn(`ERROR(${err.code}): ${err.message}`);
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    },[coords]);

    return (<><Row className='justify-content-center'>
        <Col sm={4}><InputGroup>
        <InputGroup.Text style={{ backgroundColor: "#f7f7f9" }}>
            <GeoAlt />
          </InputGroup.Text>
        <CitiesSearchInput
                  setCoords={setCoords}
                  setCityId={setCurCityId}
                  /* cityPlaceholder={cityPlaceholder} */
                />
<InputGroup.Text style={{ backgroundColor: "#f7f7f9" }}>
            +
          </InputGroup.Text>
          <FormControl
            type="text"
            as="input"
            htmlSize={1}
            placeholder="0 km"
            className="mr-2"
            aria-label="radius"
            onChange={(e)=>{
                const rad=parseInt(e.target.value,10);
                if (Number.isInteger(rad))setRadius(rad)}}
            value={radius}
            list="distance-variants"
          />
        <datalist id="distance-variants">
            <option value="5"/>
            <option value="10"/>
            <option value="15"/>
            <option value="25"/>
            <option value="50"/>
        </datalist>
                </InputGroup>
        </Col>
    </Row>

        <Row className='mt-3' style={{height:'50vh'}}>
        <Col>
        <Map
        provider={osm}
            center={coords}
            defaultZoom={12}
            onClick={mapClick}
        > 
          {storesData && storesData.length>0 && storesData.map((str,idx)=>(<Marker key={`mrK${idx}`} width={50} anchor={str.coords} color='lightgreen' />))}
            {coords && <Marker width={50} anchor={coords} />}
            {storesData && storesData.length>0 && storesData.map((str,idx)=>(<Overlay  key={`ovrlK${idx}`} anchor={str.coords} offset={[0, 50]}>
            <div className='bg-dark' style={{ borderRadius:'10%', padding:'0 10px'}}><Link to={`/viewstore/${str.id}`}> <p className='text-light'>{str.title}</p></Link></div>
          </Overlay>))}
        </Map>  
        </Col>
      </Row>
        
</>    )
}

export default StoresOnMap
