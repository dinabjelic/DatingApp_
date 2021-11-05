import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/members';


// const httpOptions= {
//   headers:new HttpHeaders({
//     Authorization: 'Bearer' + JSON.parse(localStorage.getItem('user')).token //ovo sam zakomentarisala kad sam radila 9.sekciju
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl= 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  // getMembers(){
  //   return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);

  // } //PRIJE NEGO STO SMO IZBRRISALI HEADER
  // getMember(username:string){
  //   return this.http.get<Member>(this.baseUrl+'users/'+username, httpOptions);
  //     } //PRIJE NEGO STO SMO IZBRRISALI HEADER



  getMembers(){

    return this.http.get<Member[]>(this.baseUrl + 'users');
  }


  getMember(username:string){
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  }

  updateMember(member:Member)
  {
    return this.http.put(this.baseUrl + 'users', member);
  }

  deletePhoto(photoId: number)
  {
    return this.http.delete(this.baseUrl + 'users/delete-photo/'+ photoId); 
  }
  



}
