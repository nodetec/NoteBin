import { Event } from "nostr-tools";
import { getTagValues } from "../lib/utils";
import NoteDisplay from "../NoteDisplay";
import MarkdownDisplay from "./MarkdownDisplay";

interface NoteProps {
  event: Event;
}

export default function Note({ event }: NoteProps) {
  // TODO: get event from context if available instead of using hook everytime
  const tags = event.tags;

  const filetypeTag = getTagValues("filetype", tags);

  let isMarkdown = false;

  if (filetypeTag === "markdown") {
    isMarkdown = true;
  }

  return (
    <>
      {event && (
        <div className="w-full max-w-[70rem]">
          {isMarkdown ? (
            <MarkdownDisplay event={event} />
          ) : (
            <NoteDisplay event={event} filetype={filetypeTag} />
          )}
        </div>
      )}
    </>
  );
}
