import { Mascota } from '../models/mascota.model';
import { Usuario } from '../models/usuario.model';
import * as CryptoJS from 'crypto-js';
import * as Moment from 'moment';

export class UserFunctions {
  static findUserByEmailAndPassword(users: Usuario[], data: any): Usuario {
    for (const user of users) {
      const pass = CryptoJS.AES.decrypt(user.password, user.correo).toString(CryptoJS.enc.Utf8);
      // tslint:disable-next-line: curly
      if (user.correo === data.email && pass === data.password) return user;
    }
    return null;
  }

  static findPetById(pets: any[], id: string): Mascota {
    for (const pet of pets) {
      // tslint:disable-next-line: curly
      if (pet.id === id) return pet;
    }
    return null;
  }

  static findUserById(users: any[], id: string): Usuario {
    for (const user of users) {
      // tslint:disable-next-line: curly
      if (user.id === id) return user;
    }
    return null;
  }

  static createArrayByRaze(dogs: Mascota[]): Array<any> {
    // tslint:disable-next-line: one-variable-per-declaration
    let contPitbull = 0, contShichu = 0, contBulldog = 0, contSanBernardo = 0, contChiguahua = 0;
    for (const dog of dogs) {
      switch (dog.raza) {
        case 'Pitbull':
          contPitbull++;
          break;
        case 'Shichu':
          contShichu++;
          break;
        case 'Bulldog':
          contBulldog++;
          break;
        case 'San Bernardo':
          contSanBernardo++;
          break;
        case 'Chiguahua':
          contChiguahua++;
          break;
      }
    }
    return [
      { name: 'Pitbull', value: contPitbull },
      { name: 'Shichu', value: contShichu },
      { name: 'San Bernardo', value: contSanBernardo},
      { name: 'Chiguahua', value: contChiguahua},
      { name: 'Bulldog', value: contBulldog}
    ];
  }

  static createArrayByAge(dogs: Mascota[]): Array<any> {
    /* 0-8 meses -> Cachorro, 8-96 meses -> Adulto, 97-+ meses -> Senior*/
    // tslint:disable-next-line: one-variable-per-declaration
    let contCachorros = 0, contAdultos = 0, contSeniors = 0;
    // console.log(Moment('2020-07-23'));
    // console.log(Moment(new Date()).diff(Moment('2020-07-23'),'months'));
    const hoy = Moment(new Date());
    for (const dog of dogs) {
      const fecNac = Moment(dog.fecNacimiento);
      const months = hoy.diff(fecNac, 'months');
      // tslint:disable-next-line: curly
      if (months <= 8) contCachorros++;
      // tslint:disable-next-line: curly
      else if (months <= 96) contAdultos++;
      // tslint:disable-next-line: curly
      else contSeniors++;
    }
    return [
      { name: 'Cachorro', value: contCachorros },
      { name: 'Adulto', value: contAdultos },
      { name: 'Senior', value: contSeniors }
    ];
  }

  static createArrayByAgeFilterByRaze(dogs: Mascota[]): Array<any> {
    // tslint:disable-next-line: one-variable-per-declaration
    const contPitbull = [0, 0, 0], contShichu = [0, 0, 0], contSanBernardo = [0, 0, 0], contChiguahua = [0, 0, 0], contBulldog = [0, 0, 0];
    const hoy = Moment(new Date());
    for (const dog of dogs) {
      const fecNac = Moment(dog.fecNacimiento);
      const months = hoy.diff(fecNac, 'months');
      if (months <= 8) {
        switch (dog.raza) {
          case 'Pitbull':
          contPitbull[0]++;
          break;
        case 'Shichu':
          contShichu[0]++;
          break;
        case 'Bulldog':
          contBulldog[0]++;
          break;
        case 'San Bernardo':
          contSanBernardo[0]++;
          break;
        case 'Chiguahua':
          contChiguahua[0]++;
          break;
        }
      }else if (months <= 96) {
        switch (dog.raza) {
          case 'Pitbull':
          contPitbull[1]++;
          break;
        case 'Shichu':
          contShichu[1]++;
          break;
        case 'Bulldog':
          contBulldog[1]++;
          break;
        case 'San Bernardo':
          contSanBernardo[1]++;
          break;
        case 'Chiguahua':
          contChiguahua[1]++;
          break;
        }
      }else {
        switch (dog.raza) {
          case 'Pitbull':
          contPitbull[2]++;
          break;
        case 'Shichu':
          contShichu[2]++;
          break;
        case 'Bulldog':
          contBulldog[2]++;
          break;
        case 'San Bernardo':
          contSanBernardo[2]++;
          break;
        case 'Chiguahua':
          contChiguahua[2]++;
          break;
        }
      }
    }
    return [
      {
        name: 'Pitbull',
        series: [
          { name: 'Cachorro', value: contPitbull[0] },
          { name: 'Adulto', value: contPitbull[1] },
          { name: 'Senior', value: contPitbull[2] }
        ]
      },
      {
        name: 'Shichu',
        series: [
          { name: 'Cachorro', value: contShichu[0] },
          { name: 'Adulto', value: contShichu[1] },
          { name: 'Senior', value: contShichu[2] }
        ]
      },
      {
        name: 'Bulldog',
        series: [
          { name: 'Cachorro', value: contBulldog[0] },
          { name: 'Adulto', value: contBulldog[1] },
          { name: 'Senior', value: contBulldog[2] }
        ]
      },
      {
        name: 'San Bernardo',
        series: [
          { name: 'Cachorro', value: contSanBernardo[0] },
          { name: 'Adulto', value: contSanBernardo[1] },
          { name: 'Senior', value: contSanBernardo[2] }
        ]
      },
      {
        name: 'Chiguahua',
        series: [
          { name: 'Cachorro', value: contChiguahua[0] },
          { name: 'Adulto', value: contChiguahua[1] },
          { name: 'Senior', value: contChiguahua[2] }
        ]
      }
    ];
  }

  static getCtdUserAndAdmin(users: Usuario[]): any {
    // tslint:disable-next-line: one-variable-per-declaration
    let contUser = 0, contAdmin = 0;
    for (const user of users) {
      // tslint:disable-next-line: curly
      if (user.type === 'user') contUser++;
      // tslint:disable-next-line: curly
      else contAdmin++;
    }
    return {
      ctdUsers: contUser,
      ctdAdmins: contAdmin
    };
  }

}
