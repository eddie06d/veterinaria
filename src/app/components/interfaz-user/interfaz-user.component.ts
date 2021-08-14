import { UserFunctions } from './../../helpers/userFunctions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MascotaService } from './../../services/mascota.service';
import { Mascota } from 'src/app/models/mascota.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interfaz-user',
  templateUrl: './interfaz-user.component.html',
  styleUrls: ['./interfaz-user.component.css']
})
export class InterfazUserComponent implements OnInit {
  currentUser: any;
  perros: Mascota[];
  perrosTable: Mascota[];

  image: any;
  mascota: any;
  urlDownload: string;

  filter = 'name';
  stringButton = 'Submit';
  spinner = false;

  form: FormGroup = new FormGroup({
    dni: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    raza: new FormControl('', Validators.required),
    fecNacimiento: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.mascotaService.getPerros().subscribe((dogsSnapshot) => {
      this.perros = [];
      this.perrosTable = [];
      dogsSnapshot.forEach((dogData: any) => {
        this.perros.push({
          id: dogData.payload.doc.id,
          ...dogData.payload.doc.data()
        });
        this.perrosTable.push({
          id: dogData.payload.doc.id,
          ...dogData.payload.doc.data()
        });
      });
    });
  }

  handleImage(e): void {
    this.image = e.target.files[0];
  }

  filterBy(e): void {
    const search = e.target.value.toLowerCase();
    if (this.filter === 'name') {
      this.perrosTable = this.perros.filter(dog => dog.nombre.toLowerCase().startsWith(search));
    }else {
      this.perrosTable = this.perros.filter(dog => dog.dni.toLowerCase().startsWith(search));
    }
  }

  showPhoto(id): void {
    const pet = UserFunctions.findPetById(this.perros, id);
    this.mascota = { ...pet };
  }

  async addDog(): Promise<void> {
    this.spinner = true;
    this.stringButton = 'Creating';
    const btnClose = document.getElementById('boton-cerrar') as HTMLButtonElement;
    this.urlDownload = await this.mascotaService.uploadImage(this.image);
    // console.log(this.urlDownload);
    this.mascotaService.createPerro({ fecCreacion: new Date().getTime(), foto: this.urlDownload, ...this.form.value }).then(() => {
      this.spinner = false;
      this.stringButton = 'Submit';
      Swal.fire({
        title: 'Dog registration correctly',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      }).then(() => btnClose.click());
    });
    this.form.reset();
  }

  logout(): void {
    localStorage.removeItem('user');
  }

}
