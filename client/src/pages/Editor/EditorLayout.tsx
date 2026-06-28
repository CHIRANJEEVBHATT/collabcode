import type { ReactNode } from "react";

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
    <div className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      {navbar}

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="w-full border-b border-slate-800 lg:w-72 lg:border-b-0 lg:border-r">
          {sidebar}
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
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