import { Component } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdButton } from '@angular2-material/button';

@Component({
    selector: 'my-app',
    template: `<md-toolbar color="primary">
            Angular Material 2 App
            </md-toolbar>
    
            <div style="padding: 7px">
                <button md-button>Basic Button</button>
        <button md-raised-button>Raised Button</button>
    </div>`,
    directives: [MdToolbar, MdButton]
})
export class AppComponent { }