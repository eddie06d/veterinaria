import { UsuarioService } from './../../services/usuario.service';
import { MascotaService } from './../../services/mascota.service';
import { Mascota } from './../../models/mascota.model';
import { Component, OnInit } from '@angular/core';
import { UserFunctions } from 'src/app/helpers/userFunctions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  perros: Mascota[];
  userData: any;

  // single: any[];
  view: any[] = [580, 400];

  singleRaze = [];
  singleAge = [];

  // optionsPieChart
  gradientP = true;
  showLegendP = true;
  showLabels = true;
  isDoughnut = false;

  // optionsHorizontalChart
  showXAxis = true;
  showYAxis = true;
  gradientH = false;
  showLegendH = true;
  showXAxisLabel = true;
  yAxisLabel = 'Rango edad';
  showYAxisLabel = true;
  xAxisLabel = 'Number';

  colorSchemeH = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // configuration options from group data horizontal
  multi: any[];
  viewMH: any[] = [700, 400];

  // options
  showXAxisMH = true;
  showYAxisMH = true;
  gradientMH = true;
  showLegendMH = true;
  showXAxisLabelMH = true;
  xAxisLabelMH = 'Razes';
  showYAxisLabelMH = true;
  yAxisLabelMH = 'Number';
  legendTitle = 'Age Stages';

  constructor(public mascotaService: MascotaService, private userService: UsuarioService) {
    this.userService.getUsuarios().subscribe((users) => {
      const usuarios = [];
      users.forEach((userData: any) => {
        usuarios.push({
          id: userData.payload.doc.id,
          ...userData.payload.doc.data()
        });
      });
      this.userData = UserFunctions.getCtdUserAndAdmin(usuarios);
    });
  }

  ngOnInit(): void {
    this.mascotaService.getPerros().subscribe((dogsSnapshot) => {
      this.perros = [];
      dogsSnapshot.forEach((dogData: any) => {
        this.perros.push({
          id: dogData.payload.doc.id,
          ...dogData.payload.doc.data()
        });
      });
      this.singleRaze = UserFunctions.createArrayByRaze(this.perros);
      this.singleAge = UserFunctions.createArrayByAge(this.perros);
      this.multi = UserFunctions.createArrayByAgeFilterByRaze(this.perros);
    });
    // console.log(this.perros);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
