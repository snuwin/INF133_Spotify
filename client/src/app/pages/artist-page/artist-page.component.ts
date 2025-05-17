import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
    standalone: false
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  popularity: number = 0;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  async ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');

    if (this.artistId) {
      try {
          const [artistData, topTracksData, albumsData] = await Promise.all([
              this.spotifyService.getArtist(this.artistId),
              this.spotifyService.getTopTracksForArtist(this.artistId),
              this.spotifyService.getAlbumsForArtist(this.artistId)
          ]);

          this.artist = artistData;
          this.topTracks = topTracksData;
          this.albums = albumsData;
          this.popularity = artistData.popularity?.percent ? artistData.popularity.percent * 100 : 0;
          console.log("Artist Data:", artistData);
      } catch (error) {
          console.error("Error fetching artist data:", error);
      }
    }
  }

}