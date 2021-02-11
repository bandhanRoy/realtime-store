import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../common/events.service';
import { FirebaseService } from '../common/firebase.service';
import { COLLECTION_CONSTANTS } from '../constants';
import { AgmMap } from '@agm/core';
import { AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  isSnazzyInfoWindowOpened = false;

  lat = 51.678418;
  long = 7.809007;
  collectionConstants = COLLECTION_CONSTANTS;
  markers: Array<any> = [];
  storeName = '';
  orderCount = 0;
  subscription: Subscription;
  constructor(
    private firebaseService: FirebaseService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.fetchStores();
    this.storeDataConfig();
  }

  private storeDataConfig() {
    this.subscription = this.eventsService.emitStoreConfig.subscribe(res => {
      const { lat, long, store_name } = res;
      if (res.orderCount) {
        this.storeName = store_name;
        this.orderCount = res.orderCount;
        const temp = {
          lat: this.lat,
          long: this.long,
          markers: this.markers
        };
        setTimeout(() => {
          this.markers = temp.markers;
          this.lat = temp.lat;
          this.long = temp.long;
          this.isSnazzyInfoWindowOpened = false;
        }, 10000);
        this.markers = [];
        this.isSnazzyInfoWindowOpened = true;
      }
      this.lat = parseFloat(lat);
      this.long = parseFloat(long);
    });
  }

  private fetchStores() {
    this.firebaseService.getData(this.collectionConstants.STORES).subscribe(res => {
      this.markers = res.map(store => store.payload.val());
    }, err => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
