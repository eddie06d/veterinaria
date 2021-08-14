import { Mascota } from './../models/mascota.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  perrosCollection: AngularFirestoreCollection<Mascota>;
  perroDoc: AngularFirestoreDocument<Mascota>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.perrosCollection = db.collection('perros', ref => ref.orderBy('fecCreacion', 'asc'));
    // this.perrosCollection = db.collection('perros', ref => ref.orderBy('nombre', 'asc'));
  }

  getPerros(): Observable<any[]> {
    return this.db.collection('perros', ref => ref.orderBy('fecCreacion', 'asc')).snapshotChanges();
  }

  createPerro(data: any): Promise<any> {
    return this.db.collection('perros').add(data);
  }

  updatePerro(documentId: string, data: any): Promise<void> {
    return this.db.collection('perros').doc(documentId).set(data);
  }

  deletePerro(documentId: string): Promise<void> {
    return this.db.collection('perros').doc(documentId).delete();
  }

  uploadImage(image: any): Promise<string> {
    const filePath = `dogs/${image.name}`;
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
