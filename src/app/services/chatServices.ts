import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatServices {
  constructor(private socket: Socket) {}

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public listenMessage() {
    return this.socket.fromEvent('received').pipe(map((data: any) => data));
  }
}
