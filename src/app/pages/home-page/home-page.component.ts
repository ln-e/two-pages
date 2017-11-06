import { Component, OnInit } from '@angular/core';
import { Room } from '../../core/model/room';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../core/services/room.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public rooms: Room[];
  public newRoomForm: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required]),
  });

  constructor(
    private roomService: RoomService,
  ) { }

  public ngOnInit() {

    this.roomService.getRooms()
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  public addRoom() {
    this.roomService.createRoom(this.newRoomForm.getRawValue() as Room);
  }
}
