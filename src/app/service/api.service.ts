import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  //Conseguir lista de monedas, con el valor de la divisa seleccionada
  getCoins(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
  }
  //Conseguir top monedas, con el valor de la divisa seleccionada
  getTrendingCoins(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
  }
  //Conseguir moneda por Id
  getCoinById(coindId:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coindId}`);
  }
  //Conseguir grafico de moneda por id
  getPlotByCoinId(coinId:string , currency:string, days: number){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
  }

}
