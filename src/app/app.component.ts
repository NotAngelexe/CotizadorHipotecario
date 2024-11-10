import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { IndexComponent } from "./index/index.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IndexComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cotizador';
}
