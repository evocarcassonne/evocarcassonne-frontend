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
import {HomeComponent} from "./home/home.component";
import { WaitingRoomComponent } from "./waiting-room/waitingroom";
import { CreateComponent } from "./create-game/create.component";
import { SubscribeComponent } from "./subscribe-game/subscribe.component";
import { Navbar } from "./navbar/navbar";
import { StatTableComponent } from './stat-table/stat-table.component';
import { ColorCircleModule } from 'ngx-color/circle';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MouseWheelDirective,
    BoardComponent,
    CreateComponent,
    SubscribeComponent,
    Navbar,
    WaitingRoomComponent,
    StatTableComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDraggableModule,
    AppRoutingModule,
    ColorCircleModule,
    AngularSvgIconModule
  ],
  bootstrap: [AppComponent],
  providers: [CookieService]
})
export class AppModule {}
