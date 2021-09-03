/*   const { setError,setLoading } = useContext(AppContext);
  const userType = localStorage.getItem("userType");


  const adminDeleteAd = async (adId) => {
    console.log(adId);
    try {
      setLoading(true);
      const { data } = await axios.delete(`${process.env.REACT_APP_BE}ads/${adId}`,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
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
  } */

{/* <Link to={`/editad/${adId}`}>edit</Link> 

{userType==='999' && <Card.Header><Pencil  style={{ cursor: "pointer" }} /><Trash  style={{ cursor: "pointer" }} onClick={()=>adminDeleteAd(adId)} /></Card.Header> }

*/}
/*         <Modal
          show={showModal}
          onHide={handleModalClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Do you really want to delete your profile?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            All your ads, your favotites and all your data will be deleted.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleModalClose}>
              No, missclicked!
            </Button>
            <Button variant="danger" onClick={handleDeleteProfile}>
              Yes, pls delete!
            </Button>
          </Modal.Footer>
        </Modal> */