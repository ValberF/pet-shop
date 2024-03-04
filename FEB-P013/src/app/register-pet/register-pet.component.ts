import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../data-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.component.html',
  styleUrl: './register-pet.component.scss'
})
export class RegisterPetComponent implements OnInit {
  form!: FormGroup;

  constructor(private dataBaseService: DataBaseService, private router: Router) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'type': new FormControl(null),
      'breed': new FormControl(null, [Validators.required]),
      'weight': new FormControl(null, [Validators.required]),
      'dateOfBirth': new FormControl(null, [Validators.required]),
      'medicines': new FormControl(null, [Validators.required]),
      'exams': new FormControl(null, [Validators.required]),
      'infos': new FormControl(null),
    });
  }

  addPet() {
    this.dataBaseService.addPet(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['atendimentos'])
      },
      error: (erro) => {
        alert("Erro!")
      }
    });
  }
}
