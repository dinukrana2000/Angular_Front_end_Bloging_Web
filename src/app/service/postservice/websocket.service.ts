import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client;
  private socketUrl=environment.socketUrl;

  constructor() {
    this.stompClient = new Client();
  }
//configure and activate the WebSocket connection using the STOMP client instance.
  initializeWebSocketConnection(): void {
    this.stompClient.configure({
      brokerURL: `${this.socketUrl}/web-socket`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
     
      onConnect: () => {
        console.log('WebSocket connected');
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
      },
      onWebSocketError: (event: Event) => {
        console.error('WebSocket error:', event);
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      debug: (msg: string) => {
        console.log(msg);
      }
    });
    this.stompClient.activate();
  }

  
  subscribe(topic: string, callback: any): void {
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe(topic, (message: Message) => { 
        callback(message.body);
      });
    };
    this.stompClient.onStompError = (frame) => {
      console.error('Error while subscribing to ' + topic);
      console.error('Additional details: ' + frame.body);
    };
  }

  disconnect(): void {
    this.stompClient.deactivate();
  }
}
