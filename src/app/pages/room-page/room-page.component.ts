import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RoomService } from '../../core/services/room.service';
import { Room } from '../../core/model/room';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css']
})
export class RoomPageComponent implements OnInit {

  public room: Room;
  public link: string;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location,
  ) { }

  public ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.roomService.getRoom(params['roomId']);
        }),
      )
      .subscribe((room: Room) => {
        this.link = window.location.origin + '/room/' + room.id;
        this.room = room;
      });
  }

}
