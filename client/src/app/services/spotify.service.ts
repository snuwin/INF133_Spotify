import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var uri:string = `${this.expressBaseUrl}${endpoint}`; // sent to the correct Express backend URL. DONE
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    if (!category || !resource) {
      return Promise.reject("Invalid search parameters");
    }

    const encodedResource = encodeURIComponent(resource);

    return this.sendRequestToExpress(`/search/${category}/${encodedResource}`)
      .then((data) => {
        if (!data) {
            return [];
        }
        if (category === 'artist') {
            return data.artists?.items.map((artist: any) => new ArtistData(artist)) || [];
        } else if (category === 'album') {
            return data.albums?.items.map((album: any) => new AlbumData(album)) || [];
        } else if (category === 'track') {
            return data.tracks?.items.map((track: any) => new TrackData(track)) || [];
        }
        return [];
      })
      .catch((error) => {
        console.error("Error in searchFor(): ", error);
        return [];
      });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    const encodedArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist/${encodedArtistId}`)
        .then((data) => {
            if (!data) {
                throw new Error(`No artist data found for ID: ${artistId}`);
            }
            return new ArtistData(data);
        })
        .catch((error) => {
            console.error("Error fetching artist data:", error);
            return Promise.reject(error);
        });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    const encodedArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist-top-tracks/${encodedArtistId}`)
        .then((data) => {
            if (!data || !data.tracks) {
                throw new Error(`No top tracks found for artist ID: ${artistId}`);
            }
            return data.tracks.map((track: any) => new TrackData(track));
        })
        .catch((error) => {
            console.error("Error fetching top tracks:", error);
            return [];
        });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    const encodedArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`/artist-albums/${encodedArtistId}`)
        .then((data) => {
            if (!data || !data.items) {
                throw new Error(`No albums found for artist ID: ${artistId}`);
            }
            return data.items.map((album: any) => new AlbumData(album));
        })
        .catch((error) => {
            console.error("Error fetching artist albums:", error);
            return [];
        });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    return this.sendRequestToExpress(`/album/${encodeURIComponent(albumId)}`)
        .then((data) => new AlbumData(data))
        .catch((error) => {
            console.error("Error fetching album:", error);
            return Promise.reject(error);
        });
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress(`/album-tracks/${encodeURIComponent(albumId)}`)
      .then((data) => data.items.map((track: any) => new TrackData(track)))
      .catch((error) => {
        console.error("Error fetching album tracks:", error);
        return [];
      });
  }

  getTrack(trackId:string):Promise<TrackData> {
    return this.sendRequestToExpress(`/track/${encodeURIComponent(trackId)}`)
    .then((data) => new TrackData(data))
    .catch((error) => {
        console.error("Error fetching track:", error);
        return Promise.reject(error);
    });
  }
}