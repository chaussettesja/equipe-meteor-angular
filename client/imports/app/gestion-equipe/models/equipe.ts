import {Personne} from './personne';

export class Equipe{
	tabPersonne:Personne[];
	constructor(public id:number,public nom:string){
		this.tabPersonne =[];
	}
}