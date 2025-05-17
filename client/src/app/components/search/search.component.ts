import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpotifyService],
    standalone: false
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[] = [];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    if (!this.searchString.trim()) {
      return;
    }

    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
      this.resources = data;
    }).catch((error) => {
      console.error("ERROR: unable to fetch search results: ", error);
    });
  }

}
