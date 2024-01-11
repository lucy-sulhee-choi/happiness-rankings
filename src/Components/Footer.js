import { Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="text-bg-light mt-auto p-3">
      <row>
        <Col md={3}>
          <p>Sources</p>
          <ul>
            <li>
              <a href="http://oes-qut-ifq715-bucket-prod-public.s3-website-ap-southeast-2.amazonaws.com/">Swagger Document</a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/World_Happiness_Report">Wikipedia World Happiness Report</a>
            </li>
          </ul>
        </Col>
        <Col md={6}>
          <p>&copy; 2023, QUT Web Development Bootcamp Assignment 2 </p>
          <p className="fw-light">
            This website is purely for demo purposes.
          </p>
        </Col>
      </row>
    </footer>
  );
}