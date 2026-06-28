import Editor from "@monaco-editor/react";

type Props = {
  code: string;
  language: string;
  theme: string;
  fontSize: number;
  onChange: (value: string) => void;
  onRun: () => void;
};

function CodeEditor({
  code,
  language,
  theme,
  fontSize,
  onChange,
  onRun,
}: Props) {
  return (
    <Editor
      height="100%"
      language={language}
      theme={theme}
      value={code}
      onChange={(value) => onChange(value || "")}
      onMount={(editor) => {
        editor.addCommand(2048 | 3, () => {
          onRun();
        });
      }}
      options={{
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize,
      }}
    />
  );
}

export default CodeEditor;