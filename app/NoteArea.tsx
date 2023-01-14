"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import NoteOptions from "./NoteOptions";
import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: true }
);
export default function NoteArea() {
  const [text, setText] = useState("");
  const [syntaxOption, setSyntaxOption] = useState("markdown");
  const { theme, systemTheme } = useTheme();
  const isDarkTheme = (theme === "system" ? systemTheme : theme) === "dark";

  return (
    <div className="flex flex-row gap-1">
      {/* <div className="w-2/3 h-[20rem] overflow-auto"> */}
      <div className="w-2/3 h-[34rem] overflow-auto">
        <CodeEditor
          className="w-full min-h-full focus:border focus:border-blue-500 rounded-md p-3 outline-none"
          value={text}
          language={syntaxOption}
          placeholder="Please enter text."
          onChange={(evn) => setText(evn.target.value)}
          padding={25}
          style={{
            fontSize: 15,
            backgroundColor: `${isDarkTheme ? "rgb(38 38 38)" : "rgb(228 228 231)"}`,
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
      <div className="dark:bg-neutral-800 bg-zinc-200 rounded-md w-1/3">
        <NoteOptions text={text} onSetSyntaxOption={setSyntaxOption} />
      </div>
    </div>
  );
}
