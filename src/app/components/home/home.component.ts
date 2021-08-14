import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    /* let textoAEncryptar = 'Holamundo05';
    let textEncyptado = CryptoJS.AES.encrypt(textoAEncryptar, 'aea').toString();
    console.log(textEncyptado);
    let textDesencryptado = CryptoJS.AES.decrypt(textEncyptado, 'aea').toString(CryptoJS.enc.Utf8);
    console.log(textDesencryptado); */
  }

  comenzar(): void {
    this.router.navigate(['/login']);
  }

}
