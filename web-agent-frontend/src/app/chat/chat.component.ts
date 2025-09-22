import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ChatService } from '../services/chat.service';

export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <div class="chat-header">
        <h1>Web Agent Assistant</h1>
        <p>Ask me anything and I'll search the web for answers</p>
      </div>

      <div class="messages-container" #messagesContainer>

        <div *ngFor="let message of messages"
             class="message"
             [ngClass]="{'user-message': message.isUser, 'agent-message': !message.isUser}">
          <div class="message-content">
            <div class="message-text">
              <span *ngIf="message.isLoading" class="loading-dots">
                <span></span><span></span><span></span>
              </span>
              
              <span *ngIf="!message.isLoading">{{ message.content }}</span>
            </div>
            <div class="message-time">
              {{ message.timestamp | date:'short' }}
            </div>
          </div>
        </div>
      </div>

      <div class="input-container">
        <div class="input-wrapper">
          <textarea
            [(ngModel)]="currentMessage"
            (keydown)="onKeyDown($event)"
            placeholder="Ask me anything..."
            class="message-input"
            [disabled]="isLoading"
            rows="1"></textarea>
          <button
            (click)="sendMessage()"
            [disabled]="!currentMessage.trim() || isLoading"
            class="send-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: Message[] = [];
  currentMessage = '';
  isLoading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messages.push({
      content: "Hello! I'm your Web Agent Assistant. I can search the web and provide you with information on any topic. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const userMessage: Message = {
      content: this.currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    this.messages.push(userMessage);

    const loadingMessage: Message = {
      content: '',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    this.messages.push(loadingMessage);
    this.isLoading = true;

    const question = this.currentMessage;
    this.currentMessage = '';

    try {
      const response = await this.chatService.sendMessage(question);
      console.log('Agent response:', response);
      const index = this.messages.indexOf(loadingMessage);
      if (index !== -1) {
        this.messages[index] = {
          content: response,
          isUser: false,
          timestamp: new Date(),
          isLoading: false
        };
      }
      console.log('Updated messages:', this.messages);
    } catch (error) {
      const index = this.messages.indexOf(loadingMessage);
      if (index !== -1) {
        this.messages[index] = {
          content: 'Sorry, I encountered an error while processing your request. Please try again.',
          isUser: false,
          timestamp: new Date(),
          isLoading: false
        };
      }
    } finally {
      this.isLoading = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }
}