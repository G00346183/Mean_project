import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../book.model';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private http:HttpClient) { }

  GetMovieInformation():Observable<any>{
    return this.http.get('http://localhost:4000/api/books');
  }

  AddMovieInformation(title:string,year:string,author:string):Observable<any>{
    const book:Movie = {title:title, year:year, author:author};
    return this.http.post('http://localhost:4000/api/books', book)
  }

  DeleteMovie(id:String):Observable<any>{
    return this.http.delete('http://localhost:4000/api/books/'+id);
  }

  GetMovie(id:String):Observable<any>{
    return this.http.get('http://localhost:4000/api/books/'+id);
  }

  UpdateMovie(id:String,title:string, year:string, author:string):Observable<any>{
    const book:Movie = {title:title, year:year, author:author};
    console.log("Edit"+id);
    return this.http.put('http://localhost:4000/api/books/'+id, book);
  }



}
