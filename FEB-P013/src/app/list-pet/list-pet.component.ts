// list-pet.component.ts
import { Component, OnInit } from '@angular/core';
import { IPet } from '../models/pet.model';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.scss']
})
export class ListPetComponent implements OnInit {
  pets: IPet[] = [];

  constructor(private dataBaseService: DataBaseService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPets();
  }

  fetchPets(): void {
    this.dataBaseService.getPets().subscribe(data => {
      this.pets = data;
    });
  }

  removePet(pet: IPet): void {
    if (pet.id) {
      this.dataBaseService.deletePet(pet.id).subscribe(
        {
          next: () => {
            console.log('Pet excluído com sucesso.');
            this.fetchPets();
          },
          error: (erro) => {
            console.error('Ocorreu um erro ao excluir o pet:', erro);
          }
        }
      );
    } else {
      console.error('ID do pet é indefinido.');
    }
  }
}
