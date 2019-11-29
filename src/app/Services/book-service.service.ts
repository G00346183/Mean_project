import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../book.model';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http:HttpClient) { }

  GetBookInformation():Observable<any>{
    return this.http.get('http://localhost:4000/api/books');
  }

  AddBookInformation(title:string,year:string,author:string):Observable<any>{
    const book:Book = {title:title, year:year, author:author};
    return this.http.post('http://localhost:4000/api/books', book)
  }

  DeleteBook(id:String):Observable<any>{
    return this.http.delete('http://localhost:4000/api/books/'+id);
  }

  GetBook(id:String):Observable<any>{
    return this.http.get('http://localhost:4000/api/books/'+id);
  }

  UpdateBook(id:String,title:string, year:string, author:string):Observable<any>{
    const book:Book = {title:title, year:year, author:author};
    console.log("Edit"+id);
    return this.http.put('http://localhost:4000/api/books/'+id, book);
  }



}
