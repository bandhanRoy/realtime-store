import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/common/events.service';
import { FirebaseService } from 'src/app/common/firebase.service';
import { SideNavService } from 'src/app/common/sidenav.service';
import { COLLECTION_CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-form-side-nav',
  templateUrl: './form-side-nav.component.html',
  styleUrls: ['./form-side-nav.component.scss']
})
export class FormSideNavComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sideNav1', { static: false }) public sideNav1: MatSidenav;
  @ViewChild('form', { static: false }) form;

  userForm: FormGroup;
  submitted = false;
  subscription: Subscription;
  showStores = true;
  collectionConstants = COLLECTION_CONSTANTS;
  stores: Array<any> = [];
  storeMap = {};
  imgUrl =
    'https://img.etimg.com/thumb/width-1200,height-900,imgsize-122620,resizemode-1,msid-75214721/industry/services/retail/future-group-negotiates-rents-for-its-1700-stores.jpg';

  storeForm = {
    store_name: new FormControl('', [Validators.required]),
    store_image: new FormControl(''),
    lat: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)]),
    long: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)])
  };

  orderForm = {
    order_number: new FormControl('', [Validators.required]),
    order_amount: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    store_id: new FormControl('', [Validators.required])
  };

  numberFields = ['order_number', 'order_amount', 'lat', 'long'];

  constructor(
    private sideNavService: SideNavService,
    private eventService: EventsService,
    private firebaseService: FirebaseService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userForm = new FormGroup(this.storeForm);
    this.subscription = this.eventService.createService.subscribe(res => {
      if (res === 'order') {
        this.showStores = false;
        this.fetchStores();
        this.userForm = new FormGroup(this.orderForm);
      } else if (!this.showStores) {
        this.showStores = true;
        this.userForm = new FormGroup(this.storeForm);
      }
    });
  }

  private fetchStores() {
    this.firebaseService.getData(this.collectionConstants.STORES).subscribe(res => {
      this.stores = res.map(store => {
        const obj = store.payload.val();
        this.storeMap[store.payload.key] = obj;
        obj['id'] = store.payload.key;
        return obj;
      });
    }, err => {
      console.log(err);
    });
  }

  handleFileInput(files) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const encodedFile = fileReader.result;
      this.imgUrl = encodedFile.toString();
      this.storeForm.store_image.setValue(encodedFile);
    };
    fileReader.readAsDataURL(files.item(0));
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSideNav(this.sideNav1, 'sideNav1');
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.userForm.invalid) {
      // convert to number
      const formValue = this.userForm.value;
      for (const field of this.numberFields) {
        if (formValue[field]) {
          formValue[field] = Number(formValue[field]);
        }
      }

      this.firebaseService.create(this.collectionConstants[this.showStores ? 'STORES' : 'ORDERS'], formValue).then(res => {
        this.snackBar.open(`${this.showStores ? 'Stores' : 'Orders'} Added Successfully`, 'Ok', {
          duration: 2000,
        });
        // emit the lat long of the store
        // check if the show stores is true then data can be fetched from the input fields
        if (this.showStores) {
          this.eventService.emitStoreConfig.emit({ lat: formValue.lat, long: formValue.long, store_name: formValue.store_name });
        } else {
          // else go ahead and fetch the store details for the respective store
          this.firebaseService.getDataByRef(
            this.collectionConstants.ORDERS,
            ref => ref.orderByChild('store_id').equalTo(formValue.store_id)).subscribe(result => {
              const { lat, long, store_name } = this.storeMap[formValue.store_id];
              this.eventService.emitStoreConfig.emit({ lat, long, orderCount: result.length, store_name });
            });
        }
        this.form.resetForm();
      }).catch(err => {
        console.error(err);
        this.snackBar.open('Something went wrong', 'Ok', {
          duration: 2000,
        });
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
