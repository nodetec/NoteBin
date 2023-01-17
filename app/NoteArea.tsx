"use client";
import { useContext, useState } from "react";
import { RELAYS } from "./constants";
import Button from "./Button";
import { NostrService } from "./utils/NostrService";
import { RelayContext } from "./context/relay-provider";
import { EventContext } from "./context/event-provider";
import { KeysContext } from "./context/keys-provider.jsx";
import { TipContext } from "./context/tip-provider.jsx";
import { useRouter } from "next/navigation";
import Editor from "./Editor";

const NoteArea = () => {
  // @ts-ignore
  const { keys, setKeys } = useContext(KeysContext);
  // @ts-ignore
  const { setEvent } = useContext(EventContext);
  // @ts-ignore
  const { relays, setRelays } = useContext(RelayContext);
  // @ts-ignore
  const { tipInfo, setTipInfo } = useContext(TipContext);

  const router = useRouter();
  const [filetype, setFiletype] = useState("markdown");
  const [text, setText] = useState("");
  const [tagInputValue, setTagInputValue] = useState<string>("");
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [postLoading, setPostLoading] = useState(false);

  const post = async (e: any) => {
    e.preventDefault();
    setPostLoading(true);

    let localRelays = relays;

    if (!localRelays) {
      localRelays = await NostrService.connect(RELAYS);
      setRelays(localRelays);
    }

    // const privateKey = null;
    // const publicKey = null;
    // const publicKey = await nostr.getPublicKey();
    const publicKey = keys.publicKey;
    let event = NostrService.createEvent(
      publicKey,
      text,
      filetype,
      tipInfo.noteAddress,
      tipInfo.customValue,
      tagsList
    );
    event = await NostrService.addEventData(event);

    let eventId: any = null;
    eventId = event?.id;

    // TODO: publish to all relays
    let pub = localRelays[0].publish(event);
    pub.on("ok", () => {
      console.debug(`${localRelays[0].url} has accepted our event`);
    });

    pub.on("seen", async () => {
      console.debug(`we saw the event on ${localRelays[0].url}`);
      // @ts-ignore
      const retrieved_event = await NostrService.getEvent(
        eventId,
        localRelays[0]
      );
      console.log("got event:", retrieved_event);
      await setEvent(retrieved_event);
      console.log("did it");
      router.push("/note/" + eventId);
    });

    pub.on("failed", (reason: any) => {
      setPostLoading(false);
      console.error(`failed to publish to ${localRelays[0].url}: ${reason}`);
    });
  };

  return (
    <div className="w-full mx-auto">
      <Editor
        filetype={filetype}
        setFiletype={setFiletype}
        text={text}
        setText={setText}
        tagsList={tagsList}
        setTagsList={setTagsList}
        tagInputValue={tagInputValue}
        setTagInputValue={setTagInputValue}
      />
      <div className="pt-2">
        <Button
          color="blue"
          variant="solid"
          size="sm"
          className="ml-auto"
          loading={postLoading}
          onClick={post}
        >
          {postLoading ? "Sending..." : "Create Note"}
        </Button>
      </div>
    </div>
  );
};

export default NoteArea;
