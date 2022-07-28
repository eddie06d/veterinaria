import { UserFunctions } from './../../helpers/userFunctions';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-interfaz-admin',
  templateUrl: './interfaz-admin.component.html',
  styleUrls: ['./interfaz-admin.component.css']
})
export class InterfazAdminComponent implements OnInit {
  currentUser: any;
  usuarios: Usuario[];
  usuariosTable: Usuario[];

  filter = 'username';
  user: any;

  image: any;
  urlDownload: string;

  stringButton = 'Submit';
  spinner = false;

  form: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService: UsuarioService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('admin'));
    this.userService.getUsuarios().subscribe((usersSnapshot) => {
      this.usuarios = [];
      this.usuariosTable = [];
      usersSnapshot.forEach((userData: any) => {
        this.usuarios.push({
          id: userData.payload.doc.id,
          ...userData.payload.doc.data()
        });
        this.usuariosTable.push({
          id: userData.payload.doc.id,
          ...userData.payload.doc.data()
        });
      });
    });
  }

  updateUser(userUpdate): void {
    const user = UserFunctions.findUserById(this.usuarios, userUpdate.id);
    user.password = CryptoJS.AES.decrypt(user.password, user.correo).toString(CryptoJS.enc.Utf8);
    this.user = { ...user };
    this.form.patchValue({ ...user });
  }

  async submitUser(): Promise<void> {
    this.spinner = true;
    this.stringButton = 'Updating';
    this.form.value.password = CryptoJS.AES.encrypt(this.form.value.password, this.form.value.correo).toString();
    const btnClose = document.getElementById('boton-cerrar-update') as HTMLButtonElement;
    const res = await this.userService.deleteImage(this.user.foto);
    if (res === 'ok') {
      this.urlDownload = await this.userService.uploadImage(this.image);
      // tslint:disable-next-line: max-line-length
      this.userService.updateUsuario(this.user.id, {fecCreacion: new Date().getTime(), foto: this.urlDownload, ...this.form.value }).then(() => {
        this.spinner = false;
        this.stringButton = 'Submit';
        Swal.fire({
          title: 'User update correctly',
          icon: 'success',
          timer: 2500,
          showConfirmButton: false
        }).then(() => btnClose.click());
      });
      this.form.reset();
    }
  }

  deleteUser(id, url): void {
    const user = UserFunctions.findUserById(this.usuarios, id);
    Swal.fire({
      icon: 'info',
      title: `Are you sure you want to eliminate ${user.user}?`,
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: '<i class="fas fa-check me-2"></i>Confirm',
      cancelButtonText: '<i class="fas fa-times me-2"></i>Cancel'
    }).then(async (result) => {
      if (result.isDenied) {
        const res = await this.userService.deleteImage(url);
        if (res === 'ok') {
          this.userService.deleteUsuario(id).then(() => {
            Swal.fire({ icon: 'success', title: `User ${user.user} has been eliminated correctly`, timer: 2500, showConfirmButton: false });
          });
        }
      }
    });
  }

  handleImage(e): void {
    this.image = e.target.files[0];
  }

  async addUser(): Promise<void> {
    this.spinner = true;
    this.stringButton = 'Creating';
    this.form.value.password = CryptoJS.AES.encrypt(this.form.value.password, this.form.value.correo).toString();
    const btnClose = document.getElementById('boton-cerrar') as HTMLButtonElement;
    this.urlDownload = await this.userService.uploadImage(this.image);
    // console.log(this.urlDownload);
    this.userService.createUsuario({ fecCreacion: new Date().getTime(), foto: this.urlDownload, ...this.form.value }).then(() => {
      this.spinner = false;
      this.stringButton = 'Submit';
      Swal.fire({
        title: 'User registration correctly',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      }).then(() => btnClose.click());
    });
    this.form.reset();
  }

  showPhoto(id): void {
    const user = UserFunctions.findUserById(this.usuarios, id);
    this.user = { ...user };
  }

  filterBy(e): void {
    const search = e.target.value.toLowerCase();
    // tslint:disable-next-line: max-line-length
    this.usuariosTable = (this.filter === 'username') ? this.usuarios.filter(user => user.user.startsWith(search)) : this.usuarios.filter(user => user.correo.startsWith(search));
  }

  logout(): void {
    localStorage.removeItem('admin');
  }

}
