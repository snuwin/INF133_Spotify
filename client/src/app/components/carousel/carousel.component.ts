import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    standalone: false
})
export class CarouselComponent implements OnInit {
	@Input() carouselId: string = "defaultCarousel";
	@Input() resources: ResourceData[] = [];

  constructor() { }

  ngOnInit() { }

  get carouselIdForBinding(): string {
    return '#' + this.carouselId;
  }

  getResourceUrl(item: ResourceData): string {
    if (item instanceof AlbumData) {
      return `/album/${item.id}`;
    } else if (item instanceof ArtistData) {
      return `/artist/${item.id}`;
    } else if (item instanceof TrackData) {
      return `/track/${item.id}`;
    }
    return '/';
  }
}
