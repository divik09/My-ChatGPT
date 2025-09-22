import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  template: `
    <div class="app-container">
      <app-chat></app-chat>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class AppComponent {
  title = 'Web Agent Chat';
}