import { NgModule } from "@angular/core";
import { Routes, RouterModule, ChildActivationEnd } from "@angular/router";
import { AppComponent } from "./app.component";
import { CreateComponent } from "./create-game/create.component";
import { SubscribeComponent } from "./subscribe-game/subscribe.component";
import { BoardComponent } from "./board/board.component";

const routes: Routes = [
  {
    path: "",
    children: []
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
