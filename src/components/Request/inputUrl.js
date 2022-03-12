import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  InputGroup,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import axios from "axios";
import { IoSend } from "react-icons/io5";

import { getSelector, setSelector } from "@utilities/redux";
import { MethodRequest, statusText } from "@utilities/constants";

const InputUrlRequest = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const urlRedux = getSelector(state, "request", "url");
  const methodRedux = getSelector(state, "request", "method");
  const optionsRedux = getSelector(state, "request");
  const response = getSelector(state, "response");

  useEffect(() => {}, [response]);

  // handle change
  const handleClickMethod = (mtd) =>
    setSelector(dispatch, "request", "method", mtd);

  const handleChangeUrl = (e) =>
    setSelector(dispatch, "request", "url", e.target.value);

  const setResponse = (headers, data, status) => {
    setSelector(dispatch, "response", "url", urlRedux);
    setSelector(dispatch, "response", "method", methodRedux);
    setSelector(dispatch, "response", "header", headers);
    setSelector(dispatch, "response", "body", data);
    setSelector(dispatch, "response", "code", status);
    setSelector(dispatch, "response", "codeText", statusText[status]);
  };

  const resetAll = () => {
    setSelector(dispatch, "response", "url", "");
    setSelector(dispatch, "response", "method", "");
    setSelector(dispatch, "response", "header", "");
    setSelector(dispatch, "response", "body", "");
    setSelector(dispatch, "response", "code", 0);
    setSelector(dispatch, "response", "codeText", "");
  };

  const handleClickSend = async () => {
    await resetAll();
    let startTime = new Date();
    await axios(optionsRedux)
      .then(({ headers, data, status }) => {
        setResponse(headers, data, status);
        axiosTimerFunc(startTime);
      })
      .catch(({ response }) => {
        const { headers, data, status } = response;
        setResponse(headers, data, status);
        axiosTimerFunc(startTime);
      });
  };

  const axiosTimerFunc = (startTime) => {
    let now = Date.now();
    let seconds = Math.floor((now - startTime) / 1000);
    let milliseconds = Math.floor((now - startTime) % 1000);
    let merge = `${seconds}.${milliseconds}`;
    setSelector(dispatch, "response", "time", merge);
  };

  return (
    <InputGroup className="mb-3 shadow-lg">
      <DropdownButton
        variant="outline-secondary"
        title={methodRedux}
        id="input-group-dropdown-1"
        className="shadow-lg"
      >
        {MethodRequest.map((mtd, i) => {
          return (
            <Dropdown.Item
              key={i}
              href="#"
              onClick={() => handleClickMethod(mtd)}
            >
              {mtd}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>

      <FormControl
        placeholder="Enter Url"
        onChange={handleChangeUrl}
        value={urlRedux}
      />

      <Button variant="warning" id="send" onClick={handleClickSend}>
        Send <IoSend />
      </Button>
    </InputGroup>
  );
};

export default InputUrlRequest;
