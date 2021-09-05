import { useContext,useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const BreadCrumbLine = ({subCatId, catId, cityId, adsByUserId, adsByStoreId}) => {
  const { categoriesList, subCategoriesList } = useContext(AppContext);
  const [curCatInfo,setCurCatInfo] = useState();
  const [curSubCatInfo,setCurSubatInfo] = useState();
  const [curCityInfo,setCurCityInfo] = useState();

  console.log(categoriesList, subCategoriesList);
  useEffect(() => {
    if (subCatId || catId){
      let tempCatId = catId;
      if (subCatId){
        const curSCInfo = subCategoriesList.find(sc=>sc.id===parseInt(subCatId,10));
        tempCatId = curSCInfo.parentId;
        setCurSubatInfo(curSCInfo);
        console.log(curSCInfo);
      }
      const curCInfo = categoriesList.find(c=>c.id===parseInt(tempCatId,10));
      setCurCatInfo(curCInfo);
      console.log(curCInfo);
    };
    if(cityId){
      const getCityInfo = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BE}cities/${cityId}`);
            setCurCityInfo(data);
          } catch (error) {
            console.log(error);
          }
      };
      getCityInfo();
    }

  }, [subCatId, catId,categoriesList, subCategoriesList,cityId ])
  //const {} = show;
  console.log(subCatId, catId, cityId, adsByUserId, adsByStoreId);
  //console.log(show);
    return (
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Main page</Link></li>
            {curCatInfo && <li className="breadcrumb-item"><Link to={`/bycategory/${curCatInfo.id}`}>{curCatInfo.description}</Link></li>}
            {curSubCatInfo && <li className="breadcrumb-item"><Link to={`/bysubcategory/${curSubCatInfo.id}`}>{curSubCatInfo.description}</Link></li>}
            {curCityInfo && <li className="breadcrumb-item"><Link to={`/bycity/${cityId}`}> in {curCityInfo.name}</Link></li>}
            <li className="breadcrumb-item active" aria-current="page">View articles</li>
            {/* {curSubCatInfo && <li className="breadcrumb-item active" aria-current="page">Main page</li>} 
            <li className="breadcrumb-item"><Link to="/">Main page</Link></li>
            {subCatId && !catId && !cityId && !adsByUserId && !adsByStoreId}*/}
          </ol>
        </nav>
    )
}

export default BreadCrumbLine
