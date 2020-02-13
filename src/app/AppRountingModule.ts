import { NgModule } from "@angular/core";
import { Routes, RouterModule, ChildActivationEnd } from "@angular/router";
import { AppComponent } from "./app.component";
import {HomeComponent} from "./home/home.component";
import { CreateComponent } from "./create-game/create.component";
import { SubscribeComponent } from "./subscribe-game/subscribe.component";
import { BoardComponent } from "./board/board.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "connect",
    component: SubscribeComponent
  },
  {
    path: "playing",
    component: BoardComponent
  },
  {
    path: "", redirectTo: "/home", pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
