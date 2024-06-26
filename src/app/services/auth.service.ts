import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  userData = new BehaviorSubject(null);
  userName = new BehaviorSubject(null);
  userId = new BehaviorSubject(null);
 
  constructor(private _HttpClient: HttpClient, private _Router:Router) {
    if(localStorage.getItem('userToken')!== null){
      this.decodeUserData()
     
    }
  }


  decodeUserData(){
    let encodedToken= JSON.stringify(localStorage.getItem('userToken'))
   let decodedeToken:any = jwtDecode(encodedToken);
   this.userData.next(decodedeToken);
   this.userId.next(decodedeToken.id)
   this.userName.next(decodedeToken.name);
  }


  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      userData
    );
  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      userData
    );
  }
  logOut() {
    this.userData.next(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    this._Router.navigate(['/login'])
  }
}
