import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ImcComponent } from './imc/imc.component';
import { GestionEquipeComponent } from './gestion-equipe/gestion-equipe.component';
import { EquipeComponent } from './gestion-equipe/equipe/equipe.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { EntrepriseService } from './gestion-equipe/services/entreprise.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'todoList',
        component: TodoListComponent
      },
      {
        path: 'imc',
        component: ImcComponent
      },
      {
        path: 'gestionEquipe',
        component: GestionEquipeComponent
      },
      {
        path: 'todoAdd',
        component: TodoAddComponent
      },
      // Home Page
      {
        path: '',
        redirectTo: '/todoList',
        pathMatch: 'full'
      },
      // 404 Page
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    ImcComponent,
    GestionEquipeComponent,
    EquipeComponent,
    TodoAddComponent,
    TodoListComponent,
    PageNotFoundComponent
  ],
  providers: [
    EntrepriseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
