import { LANGUAGES } from "./utils/constants";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import TextInput from "./TextInput";
import Button from "./Button";
import { BsLightningChargeFill } from "react-icons/bs";
import { Fragment, useContext, useRef, useState } from "react";
import Popup from "./Popup";
import { TipContext } from "./context/tip-provider.jsx";
import PopupInput from "./PopupInput";
import { HiOutlineClipboardCheck, HiOutlineClipboardCopy } from "react-icons/hi";
import { TbClipboardX } from "react-icons/tb";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { RiLayoutColumnFill } from "react-icons/ri";
import { BsFillTagFill } from "react-icons/bs";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: true }
);

const Editor = ({
  filetype,
  setFiletype,
  text,
  setText,
  title,
  setTitle,
  tagsList,
  setTagsList,
  tagInputValue,
  setTagInputValue,
  event,
}: any) => {
  const [tagsInputError, setTagsInputError] = useState("");
  const [{ copied, error }, setClipboard] = useState({ copied: false, error: false });
  const [mdPreviewMode, setMdPreviewMode] = useState<
    "off" | "preview" | "split"
  >("off");

  const [isOpen, setIsOpen] = useState(false);
  // @ts-ignore
  const { tipInfo, setTipInfo } = useContext(TipContext);
  const previewRef = useRef(null);

  const handleSetTagsList = (list: string[]) => {
    if (list.length > 5) {
      setTagsInputError("You can only have up to 5 tags");
      return;
    }
    setTagsInputError("");
    setTagsList(list);
  };

  const validateTagsInputKeyDown = (event: any) => {
    const TAG_KEYS = ["Enter", ",", " "];
    if (TAG_KEYS.some((key) => key === event.key)) {
      event.preventDefault();
      if (tagInputValue) {
        if (tagsList.length < 5) {
          setTagsList(Array.from(new Set([...tagsList, tagInputValue])));
          setTagInputValue("");
        } else {
          setTagsInputError("You can only have up to 5 tags");
        }
      }
    }
  };

  const handleTip = async () => {
    // @ts-ignore
    if (typeof window.webln !== "undefined") {
      const nodeAddress = event.tags[2][1];
      const customRecord = event.tags[3][1];
      // @ts-ignore
      const result = await webln.keysend({
        destination: nodeAddress,
        amount: 1,
        customRecords: {
          696969: customRecord,
        },
      });
      console.log("Tip Result:", result);
    }
  };

  const setupMarkdown = (text: string) => {
    const md = require("markdown-it")();
    const result = md.render(text);
    return result;
  }

  const scrollView = (e: any) => {
    /* @ts-ignore */
    previewRef.current?.scrollTo(0, e.target.scrollTop /e.target.scrollTopMax * previewRef.current.scrollTopMax)
  }

  return (
    <div>
      <div className="rounded-md border-2 border-zinc-400 dark:border-neutral-700">
        <div className="bg-zinc-300 dark:bg-neutral-800 p-2 flex items-center justify-between">
          <div className="flex gap-2">
            <input
              className="bg-zinc-200 text-neutral-900 dark:bg-neutral-900 dark:text-zinc-300 border-0 outline-0 focus:ring-0 text-sm rounded-md"
              type="text"
              list="filetypes"
              placeholder="filetype"
              value={filetype || event?.tags[0][1]}
              disabled={!!event}
              onChange={(e) => setFiletype(e.target.value)}
            />
            <datalist id="filetypes">
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </datalist>
            {
              filetype === "markdown" &&
                (
                  <Fragment>
                    <Button
                      color="zincDark"
                      variant="ghost"
                      className="hover:text-neutral-900 dark:hover:text-zinc-300"
                      title={mdPreviewMode === "off" ? "Preview" : "Edit"}
                      onClick={() =>
                        setMdPreviewMode(
                          mdPreviewMode === "preview" ? "off" : "preview"
                        )
                      }
                      icon={
                        mdPreviewMode === "preview" ? <AiFillEdit /> : <AiFillEye />
                      }
                    />
                    <Button
                      color="zincDark"
                      variant="ghost"
                      title="Split Preview"
                      className="hover:text-neutral-900 dark:hover:text-zinc-300"
                      onClick={() => setMdPreviewMode(mdPreviewMode === "split" ? "off" : "split")}
                      icon={<RiLayoutColumnFill className={mdPreviewMode === "split" ?  "rotate-[270deg] md:rotate-0" : "rotate-90 md:rotate-180"} />}
                    />
                  </Fragment>
                )
            }
          </div>
          {event ? (
            <div className="flex items-center gap-4">
              <Button
                color="neutralLight"
                variant="ghost"
                className={copied  ? "text-green-600 dark:text-green-400" : error ? "text-red-600 dark:text-red-400" : ""}
                icon={ copied ? 
                  <HiOutlineClipboardCheck /> :
                  error ? <TbClipboardX /> :
                    <HiOutlineClipboardCopy />}
                onClick={() => {
                  navigator.clipboard.writeText(event.content).then(() => {
                    setClipboard({ copied: true, error: false });
                  }).catch((_) => {
                      setClipboard({ copied: false, error: true });
                    }).finally(() => {
                      setTimeout(() => {
                        setClipboard({ copied: false, error: false });
                      }, 2000);
                    })
                }}
              />
              <Button
                color="yellow"
                variant="outline"
                onClick={handleTip}
                size="sm"
                icon={<BsLightningChargeFill size="14" />}
              >
                tip
              </Button>
            </div>
          ) : (
            <Button
              color="yellow"
              variant="outline"
              onClick={() => setIsOpen(true)}
              size="sm"
              icon={<BsLightningChargeFill size="14" />}
            >
              Accept Tips
            </Button>
          )}
        </div>
        <div className="flex h-[36rem] overflow-y-auto flex-col md:flex-row" >
          {
            (filetype !== "markdown" || mdPreviewMode !== "preview") &&
              <div className="w-full h-full overflow-auto" onScroll={scrollView}>
                <textarea
                  rows={1}
                  className="bg-neutral-900 border-none focus:border-none resize-none text-4xl px-6 pt-6 pb-0 w-full overflow-hidden focus:ring-0"
                  value={event ? event?.tags[5][1] : title}
                  placeholder="Title..."
                  onChange={(evn) => setTitle(evn.target.value)}
                  disabled={!!event}
                />
                <div
                >
                  <CodeEditor
                    className="w-full focus:border focus:border-blue-500 p-3 outline-none min-h-full"
                    value={event ? event?.content : text}
                    language={event ? event?.tags[0][1] : filetype}
                    placeholder="Enter your note..."
                    autoCapitalize="none"
                    onChange={(evn) => setText(evn.target.value)}
                    disabled={!!event}
                    padding={25}
                    style={{
                      fontSize: 15,
                      fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                  />
                </div>
              </div>
          }
          {
            filetype === "markdown" && mdPreviewMode !== "off" &&
              <div ref={previewRef}
                className={`w-full h-full overflow-y-auto prose prose-zinc dark:prose-invert p-6 
                ${mdPreviewMode === "preview" ? "min-w-full" :
                  mdPreviewMode === "split" ? "border-t-2 md:border-l-2 md:border-t-0 border-neutral-600 md:border-neutral-800" : ""}`}>
                <h1 className="text-4xl font-normal mb-4">{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: setupMarkdown(text) }}></div>
              </div>
          }
        </div>
        <div className="bg-zinc-300 dark:bg-neutral-900 border-t border-zinc-800 px-2">
          <TextInput
            icon={<BsFillTagFill className="w-4 h-4" />}
            placeholder={event ? "" : "Enter tags"}
            tagsList={
              event?.tags[4][1] ? event?.tags[4][1].split(",") : tagsList
            }
            setTagsList={event ? () => {} : handleSetTagsList}
            value={tagInputValue}
            disabled={!!event}
            error={tagsInputError}
            onKeyDown={validateTagsInputKeyDown}
            onChange={(e) => setTagInputValue(e.target.value)}
          />
        </div>
      </div>
      <Popup title="Tip Info" isOpen={isOpen} setIsOpen={setIsOpen}>
        <PopupInput
          value={tipInfo.noteAddress}
          onChange={(e) =>
            setTipInfo((current: any) => ({
              ...current,
              noteAddress: e.target.value,
            }))
          }
          label="Node Address"
        />
        <PopupInput
          value={tipInfo.customValue}
          onChange={(e) =>
            setTipInfo((current: any) => ({
              ...current,
              customValue: e.target.value,
            }))
          }
          label="Custom Record (if applicable)"
        />
        <Button className="w-full" onClick={() => setIsOpen(false)}>
          Done
        </Button>
      </Popup>
    </div>
  );
};

export default Editor;
