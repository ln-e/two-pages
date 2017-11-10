import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Room } from '../model/room';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { RoomData } from '../model/room-data';
import { Curve } from '../model/graffity/curve';


@Injectable()
export class RoomService {

  private roomCollection: AngularFirestoreCollection<Room>;

  constructor(
    private db: AngularFirestore,
  ) {
    this.roomCollection = this.db.collection<Room>('rooms');
  }

  public getRooms(): Observable<Room[]> {
    return this.roomCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Room;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
    );
  }

  public getRoom(id: string): Observable<Room> {
    const roomDoc = this.db.doc<Room>('rooms/' + id);

    return roomDoc.valueChanges().pipe(
      map((data) => ({ id, ...data })),
    );
  }

  public createRoom(roomData: Room): Promise<firebase.firestore.DocumentReference> {
    return this.roomCollection.add(roomData);
  }

  public getRoomCurves(roomId: string): Observable<Curve[]> {
    return this.roomCollection.doc(roomId).collection<RoomData>('curves')
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as RoomData;

            return Curve.fromJson(data.curve);
          });
        })
      );
  }

  public addRoomCurves(roomId: string, curve: Curve): Promise<firebase.firestore.DocumentReference> {
    return this.roomCollection.doc(roomId).collection<RoomData>('curves').add({curve: curve.toJson()} as RoomData);
  }

  public clearRoomCurves(roomId: string) {
    return this.deleteCollection(this.roomCollection.doc(roomId).collection<RoomData>('curves').ref, 20);
  }

  private deleteCollection(collectionRef, batchSize) {
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(query, batchSize, resolve, reject);
    });
  }

  private deleteQueryBatch(query, batchSize, resolve, reject) {
    query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
          return 0;
        }

        // Delete documents in a batch
        const batch = this.db.firestore.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
      if (numDeleted <= batchSize) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      setTimeout(() => {
        this.deleteQueryBatch(query, batchSize, resolve, reject);
      });
    })
      .catch(reject);
  }
}
