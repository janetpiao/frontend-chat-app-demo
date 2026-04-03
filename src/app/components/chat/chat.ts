import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatServices } from '../../services/chatServices';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})

export class Chat  {
  public message: string = '';
  public messages: any = [];
  public notification: string = '';
  public showNotification = false;

  constructor(
  private chatService: ChatServices,
  private cdr: ChangeDetectorRef
) {}

  ngAfterViewInit(): void {
    this.listenMessage();
  }

  public listenMessage() {
  this.chatService.listenMessage().subscribe((data: any) => {
    console.log(data);

    this.messages = [...this.messages, data.data];

    this.notification = 'New message received!';

    this.cdr.markForCheck(); // ✅ tell Angular to update

    setTimeout(() => {
      this.notification = '';
      this.cdr.markForCheck(); // ✅ update again
    }, 2000);
  });
}

  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message = '';
  }
}
