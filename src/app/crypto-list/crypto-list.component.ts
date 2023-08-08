import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from '@angular/router';
import {ChartConfiguration, ChartType} from 'chart.js'
import {BaseChartDirective} from 'ng2-charts'

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss']
})
export class CryptoListComponent {

  bannerData : any=[];
  coinData : any=[];

  

  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private api : ApiService, private router : Router){
    
   }

  ngOnInit(): void {
    this.getTrendingCoinsBanner();
    this.getCoins();
  }

  getTrendingCoinsBanner(){
    this.api.getTrendingCoins("USD").subscribe(res=>{
      this.bannerData=res;
    })
  }

  getCoins(){
    this.api.getCoins("USD").subscribe(res=>{
      this.coinData=res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetails(row:any){
    this.router.navigate(['crypto-detail',row.id]);
  }

}
