export enum Theme {
  dark = "dark",
  light = "light",
}

export type EventProfileContent = {
  name: string;
  about: string;
  picture: string;
  banner: string;
  nip05: string;
  lud16: string;
  [key: string]: any;
}

export type Profile = {
  relay: string;
  publicKey: string;
  about: string;
  lud06: string;
  name: string;
  nip05: string;
  picture: string;
  website: string;
};
