import { Component, OnInit,Input } from '@angular/core';
import { EntrepriseService } from '../services/entreprise.service';
import { Equipe } from '../models/equipe';
import { Entreprise } from '../models/entreprise';
import { Personne } from '../models/personne';
import{ Subscription} from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
	@Input() equipe:Equipe;
	entreprise:Entreprise;
	entrepriseSubscription:Subscription;

  constructor(private entrepriseService:EntrepriseService) { }

  ngOnInit() {
  	this.entrepriseSubscription = 
    this.entrepriseService.entrepriseSubject.subscribe(
      (entreprise: Entreprise)=>{
        this.entreprise = entreprise;
      }
      );
    this.entrepriseService.emitEntrepriseSubject();
  }
  onEnleverEquipe(){
  	this.entrepriseService.enleverEquipe(this.equipe.id);
  }
 onPersonneDelete(personneId:number){
 	this.entrepriseService.enleverPersonneEquipe(this.equipe.id,personneId);
 }
 onAjouterPersonne(f:NgForm){
 	let p:Personne =f.value["personne"];
 	console.log(p);
 	this.entrepriseService.ajouterPersonneEquipe(this.equipe.id,p);
 }
 notInEquipe(p:Personne){
 	let flag = true;
 	for (let pers of this.equipe.tabPersonne){
 		if(pers.id == p.id){
 			flag = false;
 		}
 	}
 	return flag;
 }
 getTabPersonne(){
 	let tabPersonne:Personne[]=[];
 	for(let p of this.entreprise.tabPersonne){
 		if (this.notInEquipe(p)){
 			tabPersonne.push(p);
 		}
 	}
 	return tabPersonne;
 }
 

}
