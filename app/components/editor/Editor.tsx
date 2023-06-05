"use client";

import dynamic from "next/dynamic";

import { useTextStore } from "../../stores/textStore";
import "../../styles/editor.css";
import { AddFileButton } from "./AddFileButton";
import { SubmitButton } from "./SubmitButton";

const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor").then((mod) => mod.default), { ssr: true });

function Editor() {
  const { text, setText } = useTextStore();

  const scrollView = (e: any) => {
    /* @ts-ignore */
    previewRef.current?.scrollTo(
      0,
      (e.target.scrollTop / e.target.scrollTopMax) *
        /* @ts-ignore */
        previewRef.current.scrollTopMax
    );
  };

  return (
    <div>
      <input
        className="mb-4 w-full rounded-md border border-slate-300 px-3 py-[0.35rem] text-sm outline-0 placeholder:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500  dark:border-smoke-500 dark:bg-smoke-900 dark:text-smoke-50 dark:placeholder:text-smoke-400"
        type="text"
        list="filetypes"
        placeholder="Note description..."
        // value={filetype}
        // onChange={(e) => setFiletype(e.target.value)}
      />

      <div className="rounded-md border border-slate-300 dark:border-smoke-500">
        <div className="flex items-center justify-between gap-2 border-b border-slate-300 bg-slate-100 p-2 dark:border-smoke-500 dark:bg-smoke-700">
          <input
            className="w-60 rounded-md border border-slate-300 px-3 py-[0.40rem] text-sm outline-0 placeholder:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-blue-500 dark:border-smoke-500 dark:bg-smoke-800 dark:text-slate-100 dark:placeholder:text-smoke-400"
            type="text"
            list="filetypes"
            placeholder="Filename including extension..."
            // value={filetype}
            // onChange={(e) => setFiletype(e.target.value)}
          />
        </div>
        <div className="flex h-[22rem] flex-col md:flex-row">
          <div className="flex h-full w-full flex-col overflow-auto" onScroll={scrollView}>
            <div className="flex grow flex-col overflow-auto">
              <div className="flex grow flex-col">
                <CodeEditor
                  className="min-h-full w-full p-3 outline-none"
                  value={text}
                  language="jsx"
                  autoCapitalize="none"
                  placeholder="Enter your note..."
                  onChange={(evn) => setText(evn.target.value)}
                  padding={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <AddFileButton />
        <SubmitButton />
      </div>
    </div>
  );
}

export default Editor;
