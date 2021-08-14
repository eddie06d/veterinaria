import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_%$]+){3,}$')]),
    // tslint:disable-next-line: max-line-length
    correo: new FormControl('', [Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'), Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
    // Validators.pattern("([0-9a-z]+){2,}([#$%&/]+){2,}([A-Z]+){1,}")
  });

  visorPassword = false;
  image: any;
  urlDownload: string;

  spinner = false;

  constructor(private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  handleImage(e): void {
    this.image = e.target.files[0];
  }

  async submit(): Promise<void> {
    this.spinner = true;
    this.form.value.password = CryptoJS.AES.encrypt(this.form.value.password, this.form.value.correo).toString();
    this.urlDownload = await this.userService.uploadImage(this.image);
    this.userService.createUsuario({ type: 'user', foto: this.urlDownload, ...this.form.value }).then(() => {
      // console.log("User created");
      this.spinner = false;
      Swal.fire({
        title: 'User created successfully',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      }).then(() => this.router.navigate(['/login']));
    });
  }

  hideShowPassword(): void {
    const inputPass = document.getElementById('pass') as HTMLInputElement;
    if (inputPass.type === 'password') {
      inputPass.type = 'text';
      this.visorPassword = true;
    }
    else {
      inputPass.type = 'password';
      this.visorPassword = false;
    }
  }

}
