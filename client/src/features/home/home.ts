import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Register } from "../account/register/register";

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

  protected readonly registerMode = signal(false);

  showRegister() {
    this.registerMode.set(true);
  }

  hideRegister() {
    this.registerMode.set(false);
  }
}
