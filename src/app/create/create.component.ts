import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BookServiceService } from '../Services/book-service.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private bookService: BookServiceService) { }

  ngOnInit() {
  }
  myDate : Date;
  onAddBook(form: NgForm) {
    
    if(!form.valid)
    {
      return;
    }

    console.log(form.value);
    console.log(form.value.date);
    this.myDate = new Date(form.value.date);
    console.log(this.myDate);

    this.bookService.AddBookInformation(form.value.title,
      form.value.year, form.value.author).subscribe(
        ()=>{
          //do something after out operation has finished
        }
      );
    console.log(form.value);
    form.resetForm();
  }

}
