import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Student } from '../../model/student.interface';

@Component({
  selector: 'app-form-student',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './form-student.component.html',
  styleUrl: './form-student.component.css'
})
export default class FormStudentComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private studenService = inject(ContactService);

  form?: FormGroup;
  student?: Student;

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');
   
    if(id){
      this.studenService.get(parseInt(id))
        .subscribe(student=>{
          this.student = student;
          this.form = this.fb.group({
            name:[student.name],
            lastname:[student.lastname],
            phone:[student.phone]
        })      
      })
    }else{
      this.form = this.fb.group({
        name:[''],
        lastname:[''],
        phone:['']
      })
    }
  }





  Save(){
    const studentForm=this.form!.value;

    if(this.student){
      this.studenService.update(this.student.id,  studentForm)
      .subscribe(()=>{
        this.router.navigate(['/']);
      });
    }else{
    this.studenService.create(studentForm)
    .subscribe(()=>{
      this.router.navigate(['/']);
    });
    }
  }
}
