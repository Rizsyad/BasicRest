import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Buffer } from "buffer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { getSelector, setSelector } from "@utilities/redux";
import { AuthRequest } from "@utilities/constants";
import { TitleTabs } from "@components/globalComponents";

const AuthTabs = () => {
  const [methodAuth, setMethodAuth] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const state = useSelector((state) => state);
  const headerRedux = getSelector(state, "request", "headers");

  const dispatch = useDispatch();

  const toBase64 = (text) => Buffer.from(text, "utf8").toString("base64");
  const setToHeader = (data) =>
    setSelector(dispatch, "request", "header", data);

  const setToken = (token) => {
    const data = {
      ...headerRedux,
      Authorization: token,
    };
    setToHeader(data);
  };

  const handleChangeBearerToken = (e) => {
    const { value } = e.target;
    let valueBearerToken;

    valueBearerToken = methodAuth === "custom" ? value : `Bearer ${value}`;
    setToken(valueBearerToken);
  };

  const handleChangeUsername = (e) => {
    const valueUsername = e.target.value;
    setUsername(valueUsername);

    const valueBasicToken = `Basic ${toBase64(`${valueUsername}:${password}`)}`;
    setToken(valueBasicToken);
  };

  const handleChangePassword = (e) => {
    const valuePassword = e.target.value;
    setPassword(valuePassword);

    const valueBasicToken = `Basic ${toBase64(`${username}:${valuePassword}`)}`;
    setToken(valueBasicToken);
  };

  const handleChangeAuth = (e) => {
    const value = e.target.value.toLowerCase();
    let data;

    if (value === "") {
      data = { ...headerRedux };
      delete data["Authorization"];
    } else {
      data = { ...headerRedux };
    }

    setToHeader(data);
    setMethodAuth(value);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <TitleTabs>Authentication</TitleTabs>
      <Form>
        <Form.Group className="mb-3" controlId="select-auth">
          <Form.Label>Select Authentication</Form.Label>
          <Form.Select onChange={handleChangeAuth} value={methodAuth}>
            <option value="">None</option>
            {AuthRequest.map((auth, i) => {
              return (
                <option key={i} value={auth.toLocaleLowerCase()}>
                  {auth}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        {methodAuth === "bearer" && (
          <Form.Group className="mb-3" controlId="bearer-token">
            <Form.Label>Bearer Token</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              onChange={handleChangeBearerToken}
            />
          </Form.Group>
        )}
        {methodAuth === "custom" && (
          <Form.Group className="mb-3" controlId="bearer-token">
            <Form.Label>Custom Token</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              onChange={handleChangeBearerToken}
            />
          </Form.Group>
        )}
        {methodAuth === "basic" && (
          <>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Username"
                onChange={handleChangeUsername}
                value={username}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChangePassword}
                  value={password}
                />
                <InputGroup.Text
                  id="show-password"
                  onClick={handleClickShowPassword}
                  className="bg-transparent"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </>
        )}
      </Form>
    </>
  );
};

export default AuthTabs;
