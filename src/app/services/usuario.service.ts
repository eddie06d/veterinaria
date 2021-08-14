import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.usuariosCollection = db.collection('usuarios', ref => ref.orderBy('fecCreacion', 'asc'));
    // this.perrosCollection = db.collection('perros', ref => ref.orderBy('nombre', 'asc'));
  }

  getUsuarios(): Observable<any[]> {
    return this.db.collection('usuarios').snapshotChanges();
  }

  createUsuario(data: any): Promise<any> {
    return this.db.collection('usuarios').add(data);
  }

  updateUsuario(documentId: string, data: any): Promise<void> {
    return this.db.collection('usuarios').doc(documentId).set(data);
  }

  deleteImage(url: string): Promise<string> {
    return new Promise(resolve => {
      this.storage.refFromURL(url).delete().subscribe(() => resolve('ok'));
    });
  }

  deleteUsuario(documentId: string): Promise<void> {
    return this.db.collection('usuarios').doc(documentId).delete();
  }

  uploadImage(image: any): Promise<string> {
    const filePath = `users/${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);
    return new Promise(resolve => {
      task.snapshotChanges().pipe(finalize(() =>  {
        fileRef.getDownloadURL().subscribe(url => {
          const ga = url;
          resolve(ga);
          return;
        });
      })).subscribe();
    });
  }

}
