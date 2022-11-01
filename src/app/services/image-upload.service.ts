import { Injectable } from '@angular/core';
import { finalize, Observable, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private basePath = '/images';
  constructor(private storage: AngularFireStorage, private authService: AuthService) { }

  uploadImage(image: File, path: string): Observable<any> {
    const ref = this.storage.ref(path);
    const task = ref.put(image);
    return task.snapshotChanges().pipe(finalize(() =>
      ref.getDownloadURL().subscribe()));
  }
  get userprofPic$(): Observable<any> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        const path = `${this.basePath}/profile/${user?.uid}`;
        const ref = this.storage.ref(path);
        return ref.getDownloadURL();
      })
    );
  }
  uploadFile(file: File, bid: string): Observable<any> {
    const ref = this.storage.ref(`pdf/${bid}`);
    const task = ref.put(file);
    return task.snapshotChanges().pipe(finalize(() =>
      ref.getDownloadURL().subscribe()));
  }
  booksProfile(bid: string): Observable<any> {
    const path = `${this.basePath}/books/${bid}`;
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }
  getPDF(bid: string): Observable<any> {
    const path = `pdf/${bid}`;
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }
  imageDelete(bid: string) {
    const path = `${this.basePath}/books`
    const storageRef = this.storage.ref(path);
    return storageRef.child(bid).delete();
  }
  pdfDelete(bid: string) {
    const path = `pdf`;
    const storageRef = this.storage.ref(path);
    return storageRef.child(bid).delete();
  }
}



