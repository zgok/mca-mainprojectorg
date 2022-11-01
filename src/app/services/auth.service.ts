import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, Observable } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = this.afAuth.authState;
  constructor(private afAuth: AngularFireAuth) {

    this.afAuth.authState.pipe(untilDestroyed(this)).subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.setItem('user', 'null');
      }
    });

  }
  signUp(email: string, password: string): Observable<any> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    );
  }
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }
  logout(): Observable<any> {
    localStorage.removeItem('user');
    return from(this.afAuth.signOut());
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}
