import CodeEditor from "@uiw/react-textarea-code-editor";
import { useSelector } from "react-redux";
import { getSelector } from "@utilities/redux";
import { outputFormat } from "@utilities/function";

const JsonBody = () => {
  const state = useSelector((state) => state);
  const bodyRaw = getSelector(state, "response", "responseBody");
  const isJSON = typeof bodyRaw === "object";
  const resultData = outputFormat(bodyRaw);

  return (
    <CodeEditor
      autoFocus
      value={resultData}
      language={isJSON ? "json" : "html"}
      disabled={true}
      padding={15}
      className="mb-5"
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
};

export default JsonBody;
