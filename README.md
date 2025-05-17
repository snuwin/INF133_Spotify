# 🎧 Spotify Music Browser

## Author: Serena Nguyen
serenaan@uci.edu

## Overview
- This is a full-stack web application built with Angular and Express.js that allows users to search for artists, albums, and tracks via the Spotify Web API. The application dynamically queries Spotify’s database to render detailed, visually organized music metadata through a responsive and accessible user interface.
- Designed for music discovery and exploration, the UI includes interactive components like carousels, artist popularity thermometers, and track metadata lists.

Time to develop: ~12 hours total

---

## Features
- **Search Functionality**
  - Dynamic artist, album, and track querying via Spotify API
  - Live carousel previews with album art, track previews, and metadata

- **Artist Page**
  - Follower count display
  - Popularity shown as a "thermometer" visual
  - Albums displayed in a horizontal scrollable carousel
  - Top tracks listed with real-time Spotify data
 
- **Album Page**
  - Album art and full track list rendering
  - Popularity and additional album info
 
- **Track Page**
  - Track metadata including title, popularity, and preview URL (if available)
     
- **Client-Side Navigation**
  - Seamless linking between Artist → Album → Track views
  - Responsive design with clean UI/UX patterns
 
- **Web Server Integration**
  - Communication between client and custom Express.js backend
  - API request forwarding and authentication routing handled securely

---

## How to run Locally:

### 1. Clone repository

```bash
git clone https://github.com/your-username/spotify-music-browser.git
```

### 2. Set up server
```bash
npm install
node index.js
```

### 3. Set up Client
```bash
npm install
ng serve
```
