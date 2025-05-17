import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';


@Component({
    selector: 'app-track-page',
    templateUrl: './track-page.component.html',
    styleUrls: ['./track-page.component.css'],
    standalone: false
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');

    if (this.trackId) {
			this.spotifyService.getTrack(this.trackId).then((trackData) => {
				console.log("Track Data:", trackData);
        const popularity = trackData.popularity?.percent !== undefined 
        ? trackData.popularity.percent * 100 
        : 0;

				this.track = trackData;
        (this.track as any).popularity = popularity;
			}).catch((error) => {
				console.error("Error fetching track data:", error);
			});
		}
  }

}
