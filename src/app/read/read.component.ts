import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../Services/book-service.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  MyBooks: any = [];
  constructor(private bookService: BookServiceService) { }

  ngOnInit() {
    this.bookService.GetBookInformation().subscribe((data) => {
      this.MyBooks = data.books;
      console.log(this.MyBooks);
    })
  }

  onDelete(id:String){
    console.log("Deleting book with id: "+id);
    this.bookService.DeleteBook(id).subscribe(
      ()=>{
        this.ngOnInit();
      }
    );
  }

}
