# Web Agent Frontend

A ChatGPT-like Angular frontend for the Web Agent API.

## Prerequisites

- Node.js (v16 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure your Web Agent API is running on `http://localhost:8000`:
```bash
cd ..
python web_agent.py
```

3. Start the Angular development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Features

- ChatGPT-like interface
- Real-time messaging with the Web Agent
- Responsive design
- Loading indicators
- Message timestamps
- Auto-scrolling chat

## API Integration

The frontend connects to your Web Agent API running on port 8000. Make sure the API is running before starting the frontend.

## Usage

1. Type your question in the input field
2. Press Enter or click the send button
3. The Web Agent will search the web and provide an answer
4. Continue the conversation as needed