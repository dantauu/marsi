## 📚 About

This is a Telegram Web Application for dating

## 🛠️ Features

- `Notifications in app and in telegram bot`

- `Swipe-based user matching`

- `Real-time updates via WebSockets`

- `Telegram-native authentication and UI integration`

- `User profiles with photos and preferences`

- `Likes and mutual connections through username`

- `Lazy loading for high performance`

- `Fully responsive mobile-first UI`

## ⚙️ Tech Stack

| Tool | Description | Example Prompt |
|------|-------------|----------------|
| **RTK Query** | Data fetching, caching and synchronization with the backend API | Automatically loads user profiles, sends likes, fetches matches and keeps client state in sync with the server |
| **TypeScript** | Static typing for safer and more predictable code | Defines strict interfaces for users, photos, likes, matches and WebSocket events |
| **Redux Toolkit** | Global state management | Stores current user, swipe state, UI state and application settings |
| **WebSockets** | Real-time bidirectional communication | Instantly delivers new likes, matches and profile updates without page reload |
| **@dnd-kit** | Drag-and-drop system for UI interactions | Allows users to reorder their profile photos by dragging them into a new order |

## 🚀 Getting Started

### For docker

```bash
  docker:dev 
```

### For usual

```bash 
  yarn install
```

```bash
  yarn dev 
```

Author
Developed by dantauu