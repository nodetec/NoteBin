declare global {
  interface Window {
    nostr: Nostr;
    webln: WebLN;
  }

  interface Nostr {
    // Define the shape of the `nostr` object
    // Example properties and methods:
    // connect(): Promise<void>;
    // login(): Promise<void>;
    // logout(): Promise<void>;
    // Add more properties and methods as needed
  }

  interface WebLN {
    // Define the shape of the `webln` object
    // Example properties and methods:
    // enable(): Promise<void>;
    // getInfo(): Promise<any>;
    // makeInvoice(options: any): Promise<any>;
    // Add more properties and methods as needed
  }
}
