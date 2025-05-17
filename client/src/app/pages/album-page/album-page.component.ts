import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-album-page',
    templateUrl: './album-page.component.html',
    styleUrls: ['./album-page.component.css'],
    standalone: false
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');

    if (this.albumId) {
      this.spotifyService.getAlbum(this.albumId).then((albumData) => {
        console.log("Album Data:", albumData);

        const images = albumData['images'] || []; 

        const popularity = albumData.popularity?.percent !== undefined ? albumData.popularity.percent * 100 : 0;
        
        this.album = albumData;
        
        (this.album as any).images = images;
        (this.album as any).popularity = popularity;
      }).catch((error) => {
          console.error("Error fetching album data:", error);
      });

      this.spotifyService.getTracksForAlbum(this.albumId).then((trackData) => {
        this.tracks = trackData || [];
      }).catch((error) => {
          console.error("Error fetching album tracks:", error);
      });
    }
  }

}
