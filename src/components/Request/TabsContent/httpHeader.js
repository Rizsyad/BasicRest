import { useEffect, useState } from "react";
import { Form, Button, Table, Stack, Modal } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";
import { RiEditBoxFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";

import { getSelector, setSelector } from "@utilities/redux";
import { TitleTabs, InlineTabContent } from "@components/globalComponents";

const HttpHeaderTabs = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [tempHeader, setTempHeader] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [nameOld, setNameOld] = useState("");

  const state = useSelector((state) => state);
  const headerRedux = getSelector(state, "request", "headers");
  const dispatch = useDispatch();

  const toChunk = (data) => {
    const chunk_size = 1,
      chunks = [];

    for (const cols = Object.entries(data); cols.length; ) {
      chunks.push(
        cols.splice(0, chunk_size).reduce((o, [k, v]) => ((o[k] = v), o), {})
      );
    }

    return chunks;
  };

  useEffect(() => {
    const chunks = toChunk(headerRedux);
    setTempHeader(chunks);
  }, [headerRedux]);

  const resetAll = () => {
    setName("");
    setValue("");
  };

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeValue = (e) => setValue(e.target.value);
  const handleClose = () => setShowModal(false);

  const handleShow = (edit = false, name = "", value = "") => {
    if (edit) {
      setName(name);
      setValue(value);
      setNameOld(name);
      setTitleModal("Header Edit");
    } else {
      setName("");
      setValue("");
      setNameOld("");
      setTitleModal("Header Insert");
    }

    setShowModal(true);
  };

  const addToHeaderRedux = (newTempHeader) => {
    const data = Object.assign({}, ...newTempHeader);

    if (nameOld) {
      delete data[nameOld];
      setNameOld("");
    }

    setSelector(dispatch, "request", "header", data);
  };

  const addHeader = () => {
    if (name === "" || value === "") return;

    const dataHeader = {
      [name]: value,
    };

    const newTempHeader = [...tempHeader, dataHeader];

    setAndAddHeader(newTempHeader);
    handleClose();
    resetAll();
  };

  const removeHeader = (index) => {
    const newTempHeader = tempHeader.filter((header, i) => i !== index);
    setAndAddHeader(newTempHeader);
  };

  const setAndAddHeader = (newTempHeader) => {
    setTempHeader(newTempHeader);
    addToHeaderRedux(newTempHeader);
  };

  return (
    <>
      <InlineTabContent>
        <TitleTabs>Http Headers</TitleTabs>
        <Button onClick={() => handleShow(false)} size="sm" className="h-50">
          Add New Header
        </Button>
      </InlineTabContent>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Header Name</th>
            <th>Header Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tempHeader.length <= 0 ? (
            <tr className="text-center">
              <td colSpan={3}>There are no headers to display.</td>
            </tr>
          ) : (
            tempHeader.map((header, i) => {
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
                        title="Delete Header"
                        onClick={() => removeHeader(i)}
                      >
                        <BsTrashFill />
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        title="Edit Header"
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Accept"
                onChange={handleChangeName}
                value={name}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="value">
              <Form.Label>Value</Form.Label>
              <Form.Control
                placeholder="text/plain"
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
          <Button variant="primary" onClick={addHeader}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal show={showUpdate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Header Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Accept"
                onChange={handleChangeName}
                value={name}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="value">
              <Form.Label>Value</Form.Label>
              <Form.Control
                placeholder="text/plain"
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
          <Button variant="primary" onClick={addHeader}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default HttpHeaderTabs;
