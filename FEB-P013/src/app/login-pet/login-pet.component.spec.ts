import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPetComponent } from './login-pet.component';

describe('LoginPetComponent', () => {
  let component: LoginPetComponent;
  let fixture: ComponentFixture<LoginPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
