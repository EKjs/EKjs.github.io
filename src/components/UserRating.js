import { useEffect,useState,useContext } from 'react';
import { Rating,RatingView } from 'react-simple-star-rating';
import axios from 'axios';
import { AppContext } from "../context/AppContext";

const UserRating = ({userId}) => {
    const {isAuthenticated } = useContext(AppContext);
    const [rating, setRating] = useState(0); // initial rating value
    
    useEffect(()=>{
        const loadUserRating = async ()=>{
         try {
             //setLoading(true);
             const { data } = await axios.get(`${process.env.REACT_APP_BE}rate/${userId}/rating`);
             setRating(data.avg);
             console.log(data);
             //setLoading(false);
           } catch (error) {
             if (error.response) {
            //   setError(error.response.data.error);
            //   setTimeout(() => setError(null), 5000);
            //   setLoading(false);
             } else {
            //   setError(error.message);
            //   setTimeout(() => setError(null), 5000);
            //   setLoading(false);
             }
           }
        };
        loadUserRating()
     },[userId]);

       // Catch Rating value
  const handleRating = async(rate) => {
      
      if(userId!==parseInt(localStorage.getItem('userId'),10)){
          setRating(rate);
          const ratingData={
              targetUser: userId,
              rating: rate,
          }
          try {
              //setLoading(true);
              const { data } = await axios.post(`${process.env.REACT_APP_BE}rate/`,ratingData,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
              if (data.targetUser===userId){
      
              }
              console.log(data);
              //setLoading(false);
            } catch (error) {
                console.log('imerer',error.response.data.error);
                if (error.response.data.error.endsWith('"uniqrating"')){
                    console.log('You have already rated this user!');
                }
              if (error.response) {
             //   setError(error.response.data.error);
             //   setTimeout(() => setError(null), 5000);
             //   setLoading(false);
              } else {
             //   setError(error.message);
             //   setTimeout(() => setError(null), 5000);
             //   setLoading(false);
              }
            }
      }
  }

    return (
        <div>{isAuthenticated &&  userId!==parseInt(localStorage.getItem('userId'),10) ? <Rating onClick={handleRating} ratingValue={rating} /> : <RatingView ratingValue={rating} />}
            
        </div>
    )
}

export default UserRating