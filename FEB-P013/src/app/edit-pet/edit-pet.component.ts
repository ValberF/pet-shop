import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../data-base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrl: './edit-pet.component.scss'
})
export class EditPetComponent implements OnInit {
  form!: FormGroup;

  constructor(private dataBaseService: DataBaseService, private routes: Router, private route: ActivatedRoute) { }

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
    this.dataBaseService.getPet(this.route.snapshot.paramMap.get('id')!).subscribe(data => {
      console.log(data)
      this.form.patchValue(data)
    })
  }

  savePet() {
    this.dataBaseService.updatePet(this.route.snapshot.paramMap.get('id')!, this.form.value).subscribe(data => {
      if (data.status == 200) {
        setTimeout(() => {
          this.routes.navigate(['/atendimentos'])
        }, 100);
      }
    })
  }
}
