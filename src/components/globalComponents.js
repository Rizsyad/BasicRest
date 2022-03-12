import { Tabs, Tab } from "react-bootstrap";

export const TitleTabs = ({ children }) => (
  <p className="fs-3 text-capitalize text-start fw-bolder">{children}</p>
);

export const InlineTabContent = ({ children }) => (
  <div className="d-flex justify-content-between">{children}</div>
);

export const TabController = ({ listTab }) => (
  <Tabs className="my-3">
    {listTab.map((list, i) => {
      return (
        <Tab eventKey={list.key} title={list.title} key={i}>
          {list.body}
        </Tab>
      );
    })}
  </Tabs>
);
