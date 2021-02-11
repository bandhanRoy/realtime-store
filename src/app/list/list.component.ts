import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FirebaseService } from '../common/firebase.service';
import { COLLECTION_CONSTANTS } from '../constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isOrder = true;
  displaySequence = {
    store: ['store_name', 'lat', 'long'],
    order: ['order_number', 'order_amount']
  };

  constructor(
    private router: Router,
    private firebaseService: FirebaseService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.fetchData(this.router.url).subscribe(res => {
      this.displayedColumns = this.displaySequence[this.router.url === '/orders' ? 'order' : 'store'];
      const actualResponse = res.map(result => {
        const obj = result.payload.val();
        obj['id'] = result.payload.key;
        return obj;
      });
      this.dataSource = new MatTableDataSource(actualResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.error(err);
    });

  }

  private fetchData(type) {
    let coll = '';
    if (type === '/orders') {
      this.isOrder = true;
      coll = 'ORDERS';
    } else {
      this.isOrder = false;
      coll = 'STORES';
    }
    return this.firebaseService.getData(COLLECTION_CONSTANTS[coll]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

  }

}
