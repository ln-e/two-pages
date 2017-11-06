import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { NotAuthGuard } from './guards/not-auth.guard';
import { RoomService } from './services/room.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ],
  providers: [
    AuthGuard,
    AuthService,
    NotAuthGuard,
    RoomService,
  ],
})
export class CoreModule {

  public constructor(
    @SkipSelf() @Optional() parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
