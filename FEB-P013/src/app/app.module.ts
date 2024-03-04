import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPetComponent } from './register-pet/register-pet.component';
import { HomeComponent } from './home/home.component';
import { ButtonComponent } from './button/button.component';
import { ListPetComponent } from './list-pet/list-pet.component';
import { FeatherModule } from 'angular-feather';
import { Trash, Edit, FileMinus } from 'angular-feather/icons';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { DetailsPetComponent } from './details-pet/details-pet.component';
import { DateFormatPipe } from './date-format.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: RegisterPetComponent },
  { path: 'editar/:id', component: EditPetComponent },
  { path: 'atendimentos', component: ListPetComponent },
  { path: 'detalhes/:id', component: DetailsPetComponent },
];

const icons = {
  Trash,
  Edit,
  FileMinus
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterPetComponent,
    HomeComponent,
    ButtonComponent,
    ListPetComponent,
    EditPetComponent,
    DetailsPetComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FeatherModule.pick(icons)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FeatherModule]
})
export class AppModule { }
