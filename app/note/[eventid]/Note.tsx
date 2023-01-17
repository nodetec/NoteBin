"use client";

import { useNostrEvents, useProfile } from "nostr-react";
import { useEffect, useState } from "react";
import Editor from "../../Editor";
import { Event } from "../../utils/NostrService";

export default function Note({ eventId, keys }: any) {
  const { events } = useNostrEvents({
    filter: {
      ids: [eventId],
      since: 0,
      kinds: [2222],
    },
  });

  let pubkey = "";
  if (keys.publicKey) {
    pubkey = keys.publicKey;
  }

  const { data } = useProfile({
    pubkey,
  });
  console.log("events", events);
  const [markdown, setMarkdown] = useState("");
  const [isMarkdown, setIsMarkdown] = useState(false);
  const [event, setEvent] = useState<Event>();

  function setupMarkdown(event: string) {
    var md = require("markdown-it")();
    var result = md.render(event);
    setIsMarkdown(true);
    setMarkdown(result);
  }

  useEffect(() => {
    setEvent(events[0]);
    if (event?.tags[0][1] === "markdown") {
      setupMarkdown(event?.content);
    }
  }, [events]);

  const shortenHash = (hash: string | undefined) => {
    if (hash) {
      return (
        " " + hash.substring(0, 4) + "..." + hash.substring(hash.length - 4)
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 justify-start items-stretch flex-1">
        {event &&
          (isMarkdown || event?.tags[0][1] === "markdown" ? (
            <div className="container flex flex-row w-full justify-between border-t border-zinc-700">
              <div className="basis-2/3 w-2/3 prose prose-zinc dark:prose-invert p-10 flex-shrink-0">
                <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
              </div>
              <div className="flex flex-col basis-1/3 w-1/3">
                <div className="p-10 border-l overflow-hidden border-zinc-700 h-full">
                  <img className="rounded-full w-20" src={data?.picture} />
                  <p className="text-lg font-bold pt-4 text-zinc-200">{data?.name}</p>
                  <p className="text-lg text-zinc-400">{shortenHash(data?.npub)}</p>
                  <p className="text-sm text-zinc-400 pt-4">{data?.about}</p>
                  {/* <p className="text-zinc-600">kind: {event?.kind}</p> */}
                  {/* <p className="text-zinc-600"> */}
                  {/*   pubkey: */}
                  {/*   {shortenHash(event?.pubkey)} */}
                  {/* </p> */}
                  {/* <p className="text-slate-600">tags: {event?.tags}</p> */}
                  {/* <p className="text-zinc-600"> */}
                  {/*   sig: */}
                  {/*   {shortenHash(event?.sig)} */}
                  {/* </p> */}
                  {/* <p className="text-zinc-600"> */}
                  {/*   event id: */}
                  {/*   {shortenHash(event?.id)} */}
                  {/* </p> */}
                  {/* <p className="text-zinc-600"> */}
                  {/*   created_at: {event?.created_at} */}
                  {/* </p> */}
                </div>
                <div></div>
              </div>
            </div>
          ) : (
            <Editor event={event} />
          ))}
      </div>
    </div>
  );
}
