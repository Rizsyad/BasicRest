import { useState } from "react";
import { Form, Table, Stack, Button, Modal } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useSelector, useDispatch } from "react-redux";

import { getSelector, setSelector } from "@utilities/redux";
import { BodyRequest } from "@utilities/constants";
import { TitleTabs, InlineTabContent } from "@components/globalComponents";

const BodyRequestTabs = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [methodBody, setMethodBody] = useState("");
  const [bodyJson, setBodyJson] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [nameOld, setNameOld] = useState("");
  const [tempBody, setTempBody] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const state = useSelector((state) => state);
  const headerRedux = getSelector(state, "request", "headers");
  const dispatch = useDispatch();

  const resetAll = () => {
    setName("");
    setValue("");
  };

  const handleChangeBody = (e) => {
    const value = e.target.value.toLocaleLowerCase();

    const contentType =
      value === "json"
        ? "application/json"
        : "application/x-www-form-urlencoded";

    let data;

    if (value !== "") {
      data = { ...headerRedux, "Content-Type": contentType };
    } else {
      data = { ...headerRedux };
      delete data["Content-Type"];
      setSelector(dispatch, "request", "body", "");
    }

    setSelector(dispatch, "request", "header", data);
    setMethodBody(e.target.value.toLocaleLowerCase());
  };

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeValue = (e) => setValue(e.target.value);

  const handleClose = () => setShowModal(false);

  const handleShow = (edit = false, name = "", value = "") => {
    if (edit) {
      setName(name);
      setValue(value);
      setNameOld(name);
      setTitleModal("Body Edit");
    } else {
      setName("");
      setValue("");
      setNameOld("");
      setTitleModal("Body Insert");
    }

    setShowModal(true);
  };

  const addToBodyRedux = (newTempBody) => {
    const ChangeAccordingToBody =
      methodBody === "json"
        ? newTempBody.replace(/\s+/g, "").trim()
        : Object.assign({}, ...newTempBody);

    if (methodBody === "json")
      return setSelector(dispatch, "request", "body", ChangeAccordingToBody);

    const formData = new URLSearchParams(ChangeAccordingToBody).toString();
    return setSelector(dispatch, "request", "body", formData);
  };

  const addBody = () => {
    if (name === "" || value === "") return;

    const dataBody = {
      [name]: value,
    };

    let newTempBody = [...tempBody, dataBody];

    if (nameOld) {
      newTempBody = newTempBody.filter(
        (tempBody) => Object.keys(tempBody).toString() !== nameOld.toString()
      );
      setNameOld("");
    }

    setTempBody(newTempBody);
    addToBodyRedux(newTempBody);

    handleClose();
    resetAll();
  };

  const addBodyJson = (e) => {
    const { value } = e.target;
    setBodyJson(value);
    addToBodyRedux(value);
  };

  const removeBody = (index) => {
    const newTempBody = tempBody.filter((header, i) => i !== index);
    setTempBody(newTempBody);
    addToBodyRedux(newTempBody);
  };

  return (
    <>
      <InlineTabContent>
        <TitleTabs>Body</TitleTabs>
        {methodBody === "form-encode" && (
          <Button size="sm" className="h-50" onClick={() => handleShow(false)}>
            Add New Body Request
          </Button>
        )}
      </InlineTabContent>
      <Form>
        <Form.Group className="mb-3" controlId="select-body">
          <Form.Label>Select Body Request</Form.Label>
          <Form.Select onChange={handleChangeBody} value={methodBody}>
            <option value="">None</option>
            {BodyRequest.map((rb, i) => {
              return (
                <option key={i} value={rb.toLocaleLowerCase()}>
                  {rb}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        {methodBody === "json" && (
          <Form.Group className="mb-3" controlId="bearer-token">
            <Form.Label>Json Content</Form.Label>

            <CodeEditor
              autoFocus
              value={bodyJson}
              language="json"
              placeholder="Please enter json."
              onChange={addBodyJson}
              padding={15}
              style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </Form.Group>
        )}
        {methodBody === "form-encode" && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Body Name</th>
                <th>Body Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tempBody.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan={3}>There are no body to display.</td>
                </tr>
              ) : (
                tempBody.map((header, i) => {
                  const keys = Object.keys(header);
                  const values = Object.values(header);

                  return (
                    <tr key={i}>
                      <td>{keys}</td>
                      <td>{values}</td>
                      <td>
                        <Stack direction="horizontal" gap={2}>
                          <Button
                            variant="danger"
                            size="sm"
                            title="Delete Body"
                            onClick={() => removeBody(i)}
                          >
                            <BsTrashFill />
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            title="Edit Body"
                            onClick={() => handleShow(true, keys, values)}
                          >
                            <RiEditBoxFill />
                          </Button>
                        </Stack>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        )}
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="username"
                onChange={handleChangeName}
                value={name}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="value">
              <Form.Label>Value</Form.Label>
              <Form.Control
                placeholder="ex: admin"
                onChange={handleChangeValue}
                value={value}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addBody}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BodyRequestTabs;
