import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit {
  @Input() spotifyUri: string;

  ngOnInit() {
    console.log("Spotify URI received:", this.spotifyUri);
    this.loadSpotifyScript().then(() => {
      this.initializePlayer();
    });
  }

  async loadSpotifyScript(): Promise<void> {
    if (document.getElementById('spotify-player-sdk')) {
      return; 
    }

    return new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.id = 'spotify-player-sdk';
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  initializePlayer() {
    const token = "BQDVTo3MnT7tMt5TonQSHVPliyStyXCmB8ZC4QeVwkmxKYwTZ1TbgXqNEiGVHUL0JHCirafAemajh8c_T3CTChDqkCY1wJglH9xtDn-DE7HyXHawI7AFDe06mC2WCKOIhoGpKqo7yf4";
  
    if (!token) {
      console.error("No valid token found");
      return;
    }
  
    const player = new window['Spotify'].Player({
      name: 'Spotify Player',
      getOAuthToken: (cb) => { cb(token); },
      volume: 0.5
    });
  
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });
  
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    player.connect();
  }
}
