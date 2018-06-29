import { Component } from '@angular/core';

@Component({
  selector: 'imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./app.component.scss']
})
export class ImcComponent {
 poids:number;
 taille:number;
 imc:number;
 tranche:string
	onCalcul(){
		let x:number;
		x = this.poids/(this.taille*this.taille);
		x = Math.round(x);
		this.imc=x;
		if (this.imc < 16){
  		this.tranche="annorexie";
	  	}else if (this.imc < 18.5){
	  		this.tranche="maigreur";
	  	}else if(this.imc < 25){
	  		this.tranche="normal";
	  	}else if (this.imc < 30){
	  		this.tranche="suproids";
	  	}else if (this.imc < 40){
	  		this.tranche="obesite";
	  	}else{
			this.tranche="massive";
	  	}
		

	}
}

