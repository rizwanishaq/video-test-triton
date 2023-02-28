import React from "react";
import CanvasFeed from "./components/CanvasFeed";
import DisplayResponse from "./components/DisplayResponse";
import VideoFeed from "./components/VideoFeed";
import { AppContext } from "./contexts/appContext";
import { Container, Row } from "react-bootstrap";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { start } = AppContext();
  return (
    <Router>
      <Header />
      <Container>
        {start && <VideoFeed />}
        <Row>
          {start && <CanvasFeed />}
          {start && <DisplayResponse />}
        </Row>
      </Container>
    </Router>
  );
}

export default App;
