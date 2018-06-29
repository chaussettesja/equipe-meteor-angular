import { Entreprise} from '../models/entreprise';
import { Equipe } from '../models/equipe';
import { Personne } from '../models/personne';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EntrepriseService{
	entrepriseSubject= new Subject();
	entreprise = new Entreprise();

	constructor(private httpClient:HttpClient){}

	emitEntrepriseSubject(){
		this.entrepriseSubject.next(this.entreprise);
	}
	lire(){
		this.httpClient
		.get<Entreprise>("https://gestion-equipe.firebaseio.com/entreprise.json")
		.subscribe(
			(response) => {
				this.entreprise=response;
				this.emitEntrepriseSubject();
			},(error)=>{
				console.log('error');
			}
		);

	}
	ecrire(){
		this.httpClient
		.put("https://gestion-equipe.firebaseio.com/entreprise.json",
			this.entreprise)
		.subscribe(
			() => {
				console.log("ok");
			},(error)=>{
				console.log('error');
			}
		);
	}
	ajouterEquipe(equipe:Equipe){
		this.entreprise.tabEquipe.push(equipe);
		this.emitEntrepriseSubject();
	}
	ajouterPersonne(p:Personne){
		this.entreprise.tabPersonne.push(p);
		this.emitEntrepriseSubject();
	}
	ajouterPersonneEquipe(id:number,p:Personne){
		
      for(const equipe of this.entreprise.tabEquipe){
        if(id ==equipe.id){
            equipe.tabPersonne.push(p);    
        }
      }
      this.emitEntrepriseSubject();
	}
	enleverPersonne(id:number){
		for(let i in this.entreprise.tabPersonne){
			if(id == this.entreprise.tabPersonne[i].id){
				this.entreprise.tabPersonne.splice(parseInt(i),1);
			}
		}
		this.emitEntrepriseSubject();
	}
	enleverEquipe(id:number){
		for(const i in this.entreprise.tabEquipe){
			if(id == this.entreprise.tabEquipe[i].id){
				this.entreprise.tabEquipe.splice(parseInt(i),1);
			}
		}
		this.emitEntrepriseSubject();
	}
	enleverPersonneEquipe(equipeId:number,personneId:number){
		for (const equipe of this.entreprise.tabEquipe){
			if(equipeId == equipe.id){
				for (const i in equipe.tabPersonne){
					if(personneId == equipe.tabPersonne[i].id){
						equipe.tabPersonne.splice(parseInt(i),1);
					}
				}
			}
		}
		this.emitEntrepriseSubject();
	}



	
}