import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { bookObj } from '../components/models/model';

@Injectable({
  providedIn: 'root'
})
export class BookUploadService {

  constructor(private afs: AngularFirestore) { }

  addBook(book: bookObj): Observable<any> {
    book.bid = this.afs.createId();
    this.afs.collection('/publish requests').doc(book.bid).set(book);
    return of(book.bid);
  }
  getAllPublishReq() {
    return this.afs.collection('/publish requests').snapshotChanges();
  }
  deleteCustomerRequest(customer: bookObj) {
    this.afs.collection('/rejectedRequests').doc(customer.bid).set(customer);
    return this.afs.doc('/publish requests/' + customer.bid).delete();
  }

  acceptedPublishRequests(customer: bookObj) {
    this.afs.doc('/publish requests/' + customer.bid).delete();
    return from(this.afs.collection('/acceptedBook').doc(customer.bid).set(customer));
  }

  getAllAcceptedRequests() {
    return this.afs.collection('/acceptedBook').snapshotChanges();
  }

  getBooksById(bid: string): Observable<any> {
    return this.afs.collection('/publish requests').doc(bid).valueChanges();
    // return this.afs.collection('/publish requests',ref=>ref.where('id','==',bid)).valueChanges();
  }
  getItemPublished(bid: string): Observable<any> {
    return this.afs.collection('/acceptedBook').doc(bid).valueChanges();
  }
  updateFrmCart(item: bookObj) {
   return this.afs.collection('/acceptedBook').doc(item.bid).update(item);
  }
  getRejectedRequest(){
    return this.afs.collection('/rejectedRequests').snapshotChanges();
  }

  searchItem(item:string){
    return this.afs.collection(`/acceptedBook`, ref => ref
    .orderBy("category")
    .startAt(item)
    .endAt(item+"\uf8ff")
    .limit(10))
    .snapshotChanges();
  }

  searchByName(item:string){
    console.log(item);
    return this.afs.collection(`/acceptedBook`, ref => ref
    .orderBy("bname")
    .startAt(item)
    .endAt(item+"\uf8ff")
    .limit(10))
    .snapshotChanges();
  }
}


