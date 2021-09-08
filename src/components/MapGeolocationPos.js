import { useEffect,useState } from 'react';
import { Map, Marker } from "pigeon-maps";

const MapGeolocationPos = ({setCoords,coords}) => {
    const [gotCoords,setGotCoords] = useState(false);
    const mapClick = ({ latLng }) => {
        setCoords(latLng);
    };
    useEffect(()=>{
        if (!gotCoords){
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
                };
            const success=pos=>setCoords([pos.coords.latitude,pos.coords.longitude]);
            const error=err=>console.warn(`ERROR(${err.code}): ${err.message}`);
            console.log('coords in map comp',coords);
            if (!coords)navigator.geolocation.getCurrentPosition(success, error, options);
            setGotCoords(true);
        }
    },[setCoords,coords,gotCoords])
    return (
        <Map
            height={300}
            center={coords}
            defaultZoom={11}
            onClick={mapClick}
        >
            {coords && <Marker width={50} anchor={coords} />}
        </Map>
    )
}

export default MapGeolocationPos
