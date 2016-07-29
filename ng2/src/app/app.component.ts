import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MdToolbar } from '@angular2-material/toolbar'
import { MD_MENU_DIRECTIVES } from '@angular2-material/menu';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [ROUTER_DIRECTIVES, MdToolbar, MD_MENU_DIRECTIVES]
})
export class AppComponent {
    title = 'App NG2';
}
