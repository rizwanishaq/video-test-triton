import React from "react";
import { AppContext } from "../contexts/appContext";
import { Row, Col } from "react-bootstrap";

const DisplayResponse = () => {
  const { responseData } = AppContext();

  return (
    <Row>
      <Col>
        {responseData && (
          <img
            src={`data:image/jpeg;base64,${responseData.image}`}
            alt={"something"}
          />
        )}
      </Col>
    </Row>
  );
};

export default DisplayResponse;
