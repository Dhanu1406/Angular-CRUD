import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ApiService } from './services/api.service';



export const authGuard: CanActivateFn = (route, state) => {
const demo=inject(ApiService)
console.log('hello');

  if(demo.IsLoggedin){
return true;
 }else{
    alert('pls log in')
    return false;
  }
};
