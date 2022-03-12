import { Container } from "react-bootstrap";

import Navbar from "@components/Navbar";
import Request from "@components/Request";
import ResponseBody from "@components/Respone";

const App = () => {
  return (
    <>
      <Navbar />
      <Container mt={5} className="mt-5">
        <Request />
        <ResponseBody />
      </Container>
    </>
  );
};

export default App;
