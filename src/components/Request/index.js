import { TabController } from "@components/globalComponents";
import HttpHeaderTabs from "@tabContentRequest/httpHeader";
import AuthTabs from "@tabContentRequest/auth";
import BodyRequestTabs from "@tabContentRequest/bodyRequest";
import InputUrlRequest from "@componentsRequest/inputUrl";

const Request = () => {
  const listTab = [
    { key: "headers", title: "Headers", body: <HttpHeaderTabs /> },
    { key: "auth", title: "Auth", body: <AuthTabs /> },
    { key: "body", title: "Body", body: <BodyRequestTabs /> },
  ];

  return (
    <>
      <InputUrlRequest />
      <TabController listTab={listTab} />
    </>
  );
};

export default Request;
