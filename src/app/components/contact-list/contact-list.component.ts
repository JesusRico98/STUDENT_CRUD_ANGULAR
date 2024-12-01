import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Student } from '../../model/student.interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe,MatTableModule,MatSortModule,MatButtonModule,RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export default class ContactListComponent implements OnInit {
  private contactService = inject(ContactService);
  
  
  data: Student[] = [];

  ngOnInit(): void {
    this.llenarData();

  }

  llenarData(){
    this.contactService.list().subscribe(data  =>{
      this.data = data;
      console.log(this.data);
    })
  }

  deleteStudent(student: Student){
    this.contactService.delete(student.id)
      .subscribe(()=>{
        this.llenarData();
      })
  }
}
