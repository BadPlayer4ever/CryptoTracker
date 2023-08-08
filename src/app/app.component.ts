import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoTracker';
  defaultCurrency: string ='usd';

  constructor(){

  }
  sendCurrency(event:string){
    console.log(event)
  }
}
