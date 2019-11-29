import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {Router, ActivatedRoute} from '@angular/router';
import {BookServiceService} from '../Services/book-service.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
book:any=[];
  constructor(private bookService:BookServiceService, private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.bookService.GetBook(this.route.snapshot.params['id']).subscribe(
      (data) =>{
          this.book = data;
          console.log(this.book);
      }
    );

  }
  onEditBook(form:NgForm){
    console.log(form.value.title);
    this.bookService.UpdateBook(this.book._id, form.value.title,
      form.value.year, form.value.author).subscribe();
  }
}
