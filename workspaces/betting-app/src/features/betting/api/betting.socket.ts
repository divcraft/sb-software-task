import { ClientMessage, ServerMessage } from "shared/types";

export class BettingSocket {
  private static instance: BettingSocket | null = null;
  private ws: WebSocket | null = null;
  private subscribers = 0;
  private messageHandler: ((msg: ServerMessage) => void) | null = null;

  private constructor(private readonly url: string) {}

  public static get(): BettingSocket {
    const SOCKET_URL = "ws://localhost:4040";

    if (!this.instance) {
      this.instance = new BettingSocket(SOCKET_URL);
    }
    return this.instance;
  }

  public setMessageHandler(handler: (msg: ServerMessage) => void) {
    this.messageHandler = handler;
  }

  public connect() {
    this.subscribers++;
    if (this.ws) return;

    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => console.log("WS connected");
    this.ws.onmessage = (ev) => {
      try {
        const msg: ServerMessage = JSON.parse(ev.data);
        this.messageHandler?.(msg);
      } catch {
        console.warn("Invalid WS message");
      }
    };
    this.ws.onclose = () => {
      console.log("WS closed");
      this.ws = null;
    };
    this.ws.onerror = (err) => console.error("WS error", err);
  }

  public disconnect() {
    this.subscribers--;
    if (this.subscribers <= 0) {
      this.ws?.close();
      this.ws = null;
      this.subscribers = 0;
    }
  }

  public send(msg: ClientMessage) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify(msg));
  }

  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
