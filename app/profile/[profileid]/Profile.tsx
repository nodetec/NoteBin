import { useNostrEvents } from "nostr-react";
import { nip19 } from "nostr-tools";
import { shortenHash } from "../../lib/utils";
import Contacts from "./Contacts";
import LatestNotes from "./LatestNotes";
import UserCard from "./UserCard";

import { useContext } from "react";
import { KeysContext } from "../../context/keys-provider.jsx";

export default function Profile({ pubkey }: any) {
  // @ts-ignore
  const { keys: loggedInUserPublicKey } = useContext(KeysContext);

  const { events } = useNostrEvents({
    filter: {
      kinds: [0, 3],
      authors: [pubkey, loggedInUserPublicKey?.publicKey],
      // authors: [pubkey],
      // limit: 5,
    },
  });

  console.log("EVENTS:", events);

  const npub = nip19.npubEncode(pubkey);
  let contentObj;
  let name;
  let about;
  let picture;

  // console.log("PROFILE PUBLIC KEY", pubkey);

  const userMetaData = events.filter(
    (event) => event.kind === 0 && pubkey === event.pubkey
  );

  try {
    const content = userMetaData[0]?.content;
    contentObj = JSON.parse(content);
    name = contentObj?.name;
    about = contentObj?.about;
    picture = contentObj?.picture;
  } catch (e) {
    console.log("Error parsing content");
  }

  const userContactEvent = events.filter(
    (event) => event.kind === 3 && event.pubkey === pubkey
  );
  const currentContacts = userContactEvent[0]?.tags;

  const loggedInUserEvent = events.filter(
    (event) =>
      event.kind === 3 && event.pubkey === loggedInUserPublicKey?.publicKey
  );
  const loggedInUsersContacts = loggedInUserEvent[0]?.tags;

  // console.log("CONTACTS:", userContacts);

  // npub: string;
  // name?: string | undefined;
  // display_name?: string | undefined;
  // picture?: string | undefined;
  // about?: string | undefined;
  // website?: string | undefined;
  // lud06?: string | undefined;
  // lud16?: string | undefined;
  // nip06?: string | undefined;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-12 flex-1">
      <div className="flex flex-col flex-shrink md:sticky top-4 w-full md:w-auto max-w-[22rem]">
        {loggedInUsersContacts && (
          <UserCard
            loggedInUserPublicKey={loggedInUserPublicKey.publicKey}
            loggedInUsersContacts={loggedInUsersContacts}
            currentContacts={currentContacts}
            pubkey={pubkey}
            name={name}
            npub={shortenHash(npub)}
            about={about}
            picture={picture}
          />
        )}
        {currentContacts && <Contacts userContacts={currentContacts} />}
      </div>
      <LatestNotes name={name} pubkey={pubkey} />
    </div>
  );
}
