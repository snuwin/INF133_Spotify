import chroma from 'chroma-js';  
export class Popularity {

	id:string;
	percent:number;

	constructor(percent:number) {
		this.percent = 0.01*percent;
	}

	get percentageString() {
		return (this.percent*100).toFixed() + '%';
	}

	get color() {
		return chroma.mix('red', 'green', this.percent, 'hsl').hex();
	}
}
