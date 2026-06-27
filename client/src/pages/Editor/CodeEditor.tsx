import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  onChange: (value: string) => void;
};

function CodeEditor({ code, onChange }: Props) {
  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={code}
      onChange={(value) => onChange(value || "")}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 15,
        automaticLayout: true,
      }}
    />
  );
}

export default CodeEditor;