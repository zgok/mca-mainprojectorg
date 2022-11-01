import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { from, Observable, of, switchMap } from 'rxjs';
import { adminObj, userObj } from '../components/models/model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs: AngularFirestore, private authService: AuthService) { }
  get CurrentUserProfile$(): Observable<any> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<userObj>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  };
  addUser(user: userObj): Observable<any> {
    return from(this.afs.collection('/users').doc(user.uid).set(user));
    // return from(this.afs.collection('/customers').add(user);
  }
  addAdmin(admin: adminObj): Observable<any> {
    return from(this.afs.collection('/users').doc(admin.uid).set(admin));
  }

  getAllUsers() {
    return this.afs.collection('/users').snapshotChanges();
  }
  deleteCustomer(customer: userObj) {
    this.afs.doc('/users/' + customer.uid).delete();
  }
  getPublishedCust() {
    return this.afs.collection('/acceptedBook').snapshotChanges();
  }
  getUserById(userId: string) {
    return this.afs.doc<userObj>(`users/${userId}`).valueChanges();
  }
  deleteAdmin(admin: adminObj) {
    this.afs.doc('/users/' + admin.uid).delete();
  }
}   