import { Card, Col, Row, Container } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import AddToFavsButton from "./AddToFavsButton";

const AdCard = ({
  photo,
  title,
  address,
  price,
  created,
  catId,
  adId,
  views,
  cityName,
  cityId,
  category,
  subCategory,
  subCategoryId,
}) => {
  return (
    <Col>
      <Card
        style={{ width: "18rem", minHeight: "36rem" }}
        border={catId === 13 ? "success" : "secondary"}
      >
        <Link to={`/view/${adId}`}>
          <Card.Img
            className="p-3"
            style={{ objectFit: "cover", height: "20rem" }}
            variant="top"
            src={
              photo && photo.length > 0
                ? `${process.env.REACT_APP_BE}images/${photo[0]}`
                : "/images/noimg.png"
            }
          />
        </Link>
        <Card.Body>
          <Card.Title>{price} €</Card.Title>

          <Card.Text>
            <Link to={`/view/${adId}`} style={{ textDecoration: "none" }}>
              {title.substring(0, 100)}
              {title.length > 100 && "..."}
            </Link>
          </Card.Text>
        </Card.Body>

        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  <AddToFavsButton targetId={adId} description={title} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link
                    className="fs-6 text-muted"
                    to={`/bysubcategory/${subCategoryId}`}
                    style={{ textDecoration: "none" }}
                  >
                    {subCategory}{" "}
                  </Link>
                  <Link
                    className="fs-6 text-muted"
                    to={`/bycity/${cityId}`}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    in {cityName}
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col xs={9}>
                  <p className="fs-6">{new Date(created).toLocaleString()}</p>
                </Col>
                <Col xs={3}>
                  <p className="fs-6">
                    <Eye /> {views}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Card>
    </Col>
  );
};

export default AdCard;