// tslint:disable: quotemark
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularDraggableModule } from "angular2-draggable";
import { MouseWheelDirective } from "./mousewheel.directive";
import { AppRoutingModule } from "./AppRountingModule";
import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { PlayerComponent } from "./player.component";
import { BoardComponent } from "./board/board.component";
import { WaitingRoomComponent } from "./waiting-room/waitingroom";
import { CreateComponent } from "./create-game/create.component";
import { SubscribeComponent } from "./subscribe-game/subscribe.component";
import { InfoPanelComponent } from "../infopanel/infopanel.component";
import { Navbar } from "./navbar/navbar";

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MouseWheelDirective,
    BoardComponent,
    CreateComponent,
    SubscribeComponent,
    InfoPanelComponent,
    Navbar,
    WaitingRoomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDraggableModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [CookieService]
})
export class AppModule {}
