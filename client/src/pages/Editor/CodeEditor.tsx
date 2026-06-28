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
      beforeMount={(monaco) => {
        monaco.editor.defineTheme("collabcode-bw", {
          base: "vs-dark",
          inherit: false,
          rules: [
            { token: "", foreground: "ffffff", background: "000000" },
            { token: "comment", foreground: "8a8a8a", fontStyle: "italic" },
            { token: "keyword", foreground: "ffffff", fontStyle: "bold" },
            { token: "string", foreground: "d4d4d4" },
            { token: "number", foreground: "eeeeee" },
            { token: "type", foreground: "f5f5f5" },
            { token: "delimiter", foreground: "bdbdbd" },
            { token: "operator", foreground: "ffffff" },
          ],
          colors: {
            "editor.background": "#000000",
            "editor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#6f6f6f",
            "editorLineNumber.activeForeground": "#ffffff",
            "editorCursor.foreground": "#ffffff",
            "editor.selectionBackground": "#3f3f3f",
            "editor.inactiveSelectionBackground": "#262626",
            "editor.lineHighlightBackground": "#111111",
            "editorGutter.background": "#000000",
          },
        });
      }}
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
