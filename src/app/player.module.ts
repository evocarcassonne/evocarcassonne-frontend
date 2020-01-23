import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { PlayerComponent } from "./player.component";

@NgModule({
  declarations: [PlayerComponent],
  imports: [BrowserModule],
  bootstrap: [PlayerComponent]
})
export class PlayerModule {}
