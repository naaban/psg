import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  adminUrl = "https://splthaitours.com/psg/";
  // http://ec2-52-14-6-227.us-east-2.compute.amazonaws.com:9001/
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  

  postData(data,urlEnd){
    return new Promise((res)=>{
      console.log(this.adminUrl)
      this.http.post(this.adminUrl + urlEnd,data).subscribe(data=>{
        res(data)
      },err=>{
        console.log(err)
      })  
    })
  }
  
  getData(urlEnd){
    return new Promise((res)=>{
      this.http.get(this.adminUrl + urlEnd).subscribe(data=>{
        res(data)
      },err=>{
        console.log(err)
        
      })
    })
  }
  
deleteData(data,urlEnd){
  return new Promise((res)=>{
    this.http.post(this.adminUrl + urlEnd,data).subscribe(data=>{
      res(data)
    }),err=>{
      console.log(err)
    }
 })
}


updateData(data,urlEnd){
  return new Promise((res)=>{
    this.http.put(this.adminUrl + urlEnd,data).subscribe(data=>{
      res(data)
    }),err=>{
      console.log(err)
    }
 })
}

 

//   getcrollView(){
//     return new Promise((resolve) => {
//     this.http.post("http://localhost:9001/api/search",{
//       scroll:"5m"

//     },{
//       headers : {
//         "Access-Control-Allow-Origin" : "*"
//       }
//     }).subscribe(response => {
//       resolve(response)
//     })


//   })

// }
}
