import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.scss']
})
export class CryptoDetailComponent {

  coinData: any;
  coinId! : any;
  currency : string = "USD";
  days : number = 30;

  public chartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Tendencia de precios',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009888',
        pointBackgroundColor: '#009888',
        pointBorderColor: '#009888',
        pointHoverBackgroundColor: '#009888',
        pointHoverBorderColor: '#009888'
      }
    ],
    labels:[]
  };
  public chartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius:1
      }
    },
    plugins:{
      legend:{
        display:true
      }
    }
  }
  public lineChartType : ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute){

  }

  

  ngOnInit():void{
    this.activatedRoute.params.subscribe(val=>{
      this.coinId = val['id'];
    });
    this.getCoinData();
    this.getPlotData();
  }

  getCoinData(){
    this.api.getCoinById(this.coinId).subscribe(res=>{
      this.coinData = res;
    })
  }

  getPlotData(){
    this.api.getPlotByCoinId(this.coinId,"USD",this.days).subscribe(res=>{
      console.log(res);
      this.chartData.datasets[0].data = res.prices.map((a:any)=>{
        return a[1];
      });
      this.chartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleDateString();
      });
    })
  }

}
