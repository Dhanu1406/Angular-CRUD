import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
IsLoggedin:boolean=false;
Iscorrect:boolean=false;
  constructor( private http: HttpClient) { }
  private baseURL = 'http://localhost:8080/api/v1/product';
  private baseUrl = 'http://localhost:8080/api/v2';

 
   getProduct() {
    return this.http.get<any>(`${this.baseURL}`);
  }
  postProduct(data: any){
    return this.http.post<any>(`${this.baseURL}`,data );
  }

   putProduct(data: any, id: number) {
    return this.http.put<any>(`${this.baseURL}/${id}`, data);
  }
  


     deleteProduct(id: number) {
    return this.http.delete<any>(`${this.baseURL}/${id}`);
  }




  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }
    
  }
  // deleteProduct(id:number){
  //   return this.http.delete<any>("http://localhost:3000/productList/"+id);
  // }



  // // private baseURL = 'http://localhost:8080/api/v1/product';

  // // constructor(private http: HttpClient) { }

  // // postProduct(data: any) {
  // //   return this.http.post<any>(`${this.baseURL}`, data);
  // // }

  // // getProduct() {
  // //   return this.http.get<any>(`${this.baseURL}`);
  // // }

  // // putProduct(data: any, id: number) {
  // //   return this.http.put<any>(`${this.baseURL}/${id}`, data);
  // // }

  // // deleteProduct(id: number) {
  // //   return this.http.delete<any>(`${this.baseURL}/${id}`);
  // }
   // postProduct(data: any){
  //   return this.http.post<any>("http://localhost:3000/productList/",data);
  // }
  // getProduct(){
  //   return this.http.get<any>("http://localhost:3000/productList/");
  // }
    // putProduct(data:any,id:number){
  //   return this.http.put<any>("http://localhost:3000/productList/"+id,data);
  // }

 