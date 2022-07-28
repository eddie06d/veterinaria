import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let app: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  it('Should return an invalid form', () => {
    const form = app.form;
    // tslint:disable-next-line: no-string-literal
    const email = form.controls['email'];
    email.setValue('ejhuancahuire@gmail.com');

    expect(form.invalid).toBeTrue();
  });

  it('Should return a valid form', () => {
    const form = app.form;
    // tslint:disable-next-line: no-string-literal
    const email = form.controls['email'];
    email.setValue('ejhuancahuire@gmail.com');
    // tslint:disable-next-line: no-string-literal
    const password = form.controls['password'];
    password.setValue('123456');

    expect(form.invalid).toBeFalse();
  });
});
