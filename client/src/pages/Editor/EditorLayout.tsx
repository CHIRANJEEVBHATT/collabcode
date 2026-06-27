import { ReactNode } from "react";

type Props = {
  navbar: ReactNode;
  sidebar: ReactNode;
  editor: ReactNode;
  output: ReactNode;
};

function EditorLayout({
  navbar,
  sidebar,
  editor,
  output,
}: Props) {
  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      {navbar}

      <div className="flex flex-1 overflow-hidden">
        {sidebar}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            {editor}
          </div>

          {output}
        </div>
      </div>
    </div>
  );
}

export default EditorLayout;