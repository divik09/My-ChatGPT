import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface QueryRequest {
  question: string;
}

interface QueryResponse {
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  async sendMessage(question: string): Promise<string> {
    try {
      const request: QueryRequest = { question };
      const response = await firstValueFrom(
        this.http.post<QueryResponse>(`${this.apiUrl}/search`, request)
      );
      return response.answer;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message to web agent');
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      await firstValueFrom(this.http.get(`${this.apiUrl}/`));
      return true;
    } catch (error) {
      console.error('Web agent API is not available:', error);
      return false;
    }
  }
}