import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Room } from '../model/room';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';


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
}
