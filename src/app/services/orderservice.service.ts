import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap } from 'rxjs';
import { bookObj, orderObj } from '../components/models/model';
import { AuthService } from './auth.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }
  pay(item: orderObj) {
    item.oid = this.afs.createId();
    return this.afs.collection('/orderedCustomers').doc(item.oid).set(item);
  }
  getAllOrderedCustomers() {
    return this.afs.collection('/orderedCustomers').snapshotChanges();
  }
  finishedProject(item: bookObj) {
    this.afs.doc('/acceptedBook/' + item.bid).delete();
    return this.afs.collection('/finishedproject').doc(item.bid).set(item);
  }
  unfinishedProject(item: bookObj) {
    this.afs.doc('/acceptedBook/' + item.bid).delete();
    return this.afs.collection('/unifinishedproject').doc(item.bid).set(item);
  }
  allFinishedProjects() {
    return this.afs.collection('/finishedproject').snapshotChanges();
  }
  allUnFinishedProjects() {
    return this.afs.collection('/unifinishedproject').snapshotChanges();
  }
  addtocart(item: bookObj) {
    return this.authService.currentUser$.pipe(untilDestroyed(this), switchMap((user) => {
      if (user) {
        //  return this.afs.collection(`/addtocart/${user.uid}`).doc(`/${item.bid}`).set(item);
        return this.afs.collection(`/users`).doc(`${user.uid}`).collection('/addtocart').doc(`${item.bid}`).set(item);
      } else { return of(null); }
    }))
  }
  getCart() {
    return this.authService.currentUser$.pipe(untilDestroyed(this),
      switchMap((user) => {
        if (user) {
          return this.afs.collection('/users').doc(`${user.uid}`).collection('/addtocart').valueChanges();
        } else { return of(null); }
      })
    );
  }
  deleteCartItem(item: bookObj) {
    return this.authService.currentUser$.pipe(untilDestroyed(this),
      switchMap((user) => {
        if (user) {
          return this.afs.collection('/users').doc(user.uid).collection('/addtocart').doc(item.bid).delete();
        } else { return of(null); }
      })
    );
  }
  deleteOrderedCustomer(item: orderObj) {
    return this.afs.doc('/orderedCustomers/' + item.oid).delete();
  }
}