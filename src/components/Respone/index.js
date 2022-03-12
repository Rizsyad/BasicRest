import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { TabController } from "@components/globalComponents";
import { useSelector } from "react-redux";

import { getSelector } from "@utilities/redux";
import JsonBody from "@tabContentRespone/jsonBody";
import RawBody from "@tabContentRespone/rawBody";
import HeadersBody from "@tabContentRespone/headersBody";

const ResponseBody = () => {
  const [isDone, setIsDone] = useState(false);

  const state = useSelector((state) => state);

  const urlRedux = getSelector(state, "response", "responseUrl");
  const methodRedux = getSelector(state, "response", "responseMethod");
  const responseCode = getSelector(state, "response", "statusCode");
  const responseCodeText = getSelector(state, "response", "statusText");
  const time = getSelector(state, "response", "time");

  const listTab = [
    { key: "json", title: "Respone Body", body: <JsonBody /> },
    { key: "raw", title: "Respone Body (RAW)", body: <RawBody /> },
    { key: "header", title: "Respone Headers", body: <HeadersBody /> },
  ];

  useEffect(() => {
    if (responseCode) return setIsDone(true);
    return setIsDone(false);
  }, [responseCode]);

  return (
    <>
      {isDone && (
        <div className="my-5">
          <Card body style={{ backgroundColor: "#d3d3d3", color: "#666666" }}>
            <b>Request URL:</b>{" "}
            <a href={urlRedux} target="__blank">
              {urlRedux}
            </a>
            <br />
            <b>Request Method:</b> {methodRedux}
            <br />
            <b>Response Time:</b> {time} seconds <br />
            <b>Response Status:</b> {responseCode} - {responseCodeText}
          </Card>
          <TabController listTab={listTab} />
        </div>
      )}
    </>
  );
};

export default ResponseBody;
