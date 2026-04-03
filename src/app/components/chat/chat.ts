import { Component, OnInit } from '@angular/core';
import { ChatServices } from '../../services/chatServices';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  public message: string = '';
  public messages: any = [];

  ngOnInit(): void {
    this.listenMessage();
  }

  constructor(
    private chatService: ChatServices, 
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef) {}

  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
    this.message = '';
  }

  public listenMessage() {
  this.chatService.listenMessage().subscribe((data: any) => {
    this.ngZone.run(() => {
      console.log(data);

      // IMPORTANT: push correct field
      this.messages.push(data.data); 
      this.cdr.detectChanges();
    });
  });
}}
