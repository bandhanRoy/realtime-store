import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private fireStore: AngularFireDatabase) { }

  /**
   * generic create method
   */
  create(collectionName, data) {
    return this.fireStore
      .list(collectionName)
      .push(data);
  }

  /**
   * generic get method
   * @param collectionName string
   */
  getData(collectionName) {
    return this.fireStore.list(collectionName).snapshotChanges();
  }

  getDataByRef(collectionName, ref) {
    return this.fireStore.list(collectionName, ref).snapshotChanges();
  }

}
