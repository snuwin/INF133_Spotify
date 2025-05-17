import { ResourceData } from './resource-data';

export class ArtistData extends ResourceData {
	genres:string[];
	followers:number;

	constructor(objectModel:{}) {
		super(objectModel);
		this.category = 'artist';
		this.genres = objectModel['genres'];
		if('followers' in objectModel) {
			this.followers = objectModel['followers']['total'];
		}
	}

	get followersStr() {
		return this.followers.toLocaleString();
	}
}
