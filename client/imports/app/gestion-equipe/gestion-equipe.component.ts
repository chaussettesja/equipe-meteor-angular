import { Component ,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Entreprise} from './models/entreprise';
import { Equipe } from './models/equipe';
import { Personne } from './models/personne';
import {EntrepriseService} from './services/entreprise.service';
import{ Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'gestion-equipe',
  templateUrl: './gestion-equipe.component.html',
  styleUrls: ['./gestion-equipe.component.scss']
})
export class GestionEquipeComponent implements OnInit {
 entreprise:Entreprise;
  team:string;
  equipeId = 0;
  defaultEquipe=0;
  personneId = 0;
  entrepriseSubscription:Subscription;

  constructor(private entrepriseService:EntrepriseService){}
  
  ngOnInit(){
    //this.entreprise = this.entrepriseService.entreprise;
    this.entrepriseSubscription = 
    this.entrepriseService.entrepriseSubject.subscribe(
      (entreprise: Entreprise)=>{
        this.entreprise = entreprise;
      }
      );
    this.entrepriseService.emitEntrepriseSubject();
  }
  onLire(){
    this.entrepriseService.lire();
  }
  onEcrire(){
    this.entrepriseService.ecrire();
  }
  onAjouterEquipe(){
  	this.equipeId++;
    let equipe = new Equipe(this.equipeId,this.team);
    this.entrepriseService.ajouterEquipe(equipe);
    //this.entreprise.tabEquipe.push(equipe);
  	this.team='';
  }
  onAjouterPersonne(f:NgForm){
    this.personneId++;
    let team:number =f.value["team"];
    let p = new Personne(this.personneId,f.value["prenom"],f.value["nom"]);
    this.entrepriseService.ajouterPersonne(p);

    if (team !=0){
      this.entrepriseService.ajouterPersonneEquipe(team,p);
      
    }

    //reset
    f.controls['nom'].reset();
    f.controls['prenom'].reset();
    f.controls['team'].setValue(0);
  }
  dejaDansEquipe(id:number){
    let test = false;
    for(let e of this.entreprise.tabEquipe){
      for (let p of e.tabPersonne){
        if(p.id == id){
          test =true;
          break;
        }
      }
    }
    return test;
  }
  onPersonneDelete(id:number){
   if (this.dejaDansEquipe(id)){
     alert('Deja ds 1 equipe')
   }else{
     if(confirm("Voulez vous supprimer ?")){
      this.entrepriseService.enleverPersonne(id)
     }
   }
  }



}
