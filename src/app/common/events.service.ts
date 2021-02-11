import { Injectable, EventEmitter } from '@angular/core';

export interface IStoreData {
  lat: number;
  long: number;
  store_name: string;
  orderCount?: number;
}

@Injectable({
  providedIn: 'root'
})


export class EventsService {

  constructor() { }

  createService: EventEmitter<string> = new EventEmitter();
  emitStoreConfig: EventEmitter<IStoreData> = new EventEmitter();
}
