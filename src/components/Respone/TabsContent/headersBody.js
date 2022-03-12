import CodeEditor from "@uiw/react-textarea-code-editor";
import { useSelector } from "react-redux";
import { getSelector } from "@utilities/redux";

const HeadersBody = () => {
  const state = useSelector((state) => state);
  const bodyJson = JSON.stringify(
    getSelector(state, "response", "responseHeader"),
    null,
    2
  );
  return (
    <CodeEditor
      autoFocus
      value={bodyJson}
      language="json"
      disabled={true}
      padding={15}
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
};

export default HeadersBody;
