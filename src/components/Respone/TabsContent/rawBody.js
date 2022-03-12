import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getSelector } from "@utilities/redux";
import { outputFormat } from "@utilities/function";

const RawBody = () => {
  const state = useSelector((state) => state);
  const bodyRaw = getSelector(state, "response", "responseBody");
  const resultData = outputFormat(bodyRaw);

  return (
    <Form.Control
      as="textarea"
      rows={15}
      value={resultData}
      disabled={true}
      className="mb-5"
    />
  );
};

export default RawBody;
