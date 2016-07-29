import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar'

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MdToolbar]
})
export class AppComponent {
  title = 'app works!';
}
