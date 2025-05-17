import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ProfileData } from '../../data/profile-data';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "assets/unknown.jpg";
  profile_link:string = null;


 //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

   /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  loadAboutMe() {
    this.spotifyService.aboutMe().then((profile: ProfileData) => {
      this.name = profile.name;
      this.profile_pic = profile.imageURL;
      this.profile_link = profile.spotifyProfile;
    }).catch((error) => {
      console.error('Error fetching profile data:', error);
    });
  }

}
