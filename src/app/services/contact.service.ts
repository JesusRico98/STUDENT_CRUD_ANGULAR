import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '../model/student.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8000/api/students';

  list() {
    return this.http.get<Student[]>('http://localhost:8000/api/students');
  }

  get(id: number) {
    return this.http.get<Student>(this.url + '/' + id);
  }

  create(contact: Student) {
    return this.http.post<Student>(this.url, contact);
  }

  update(id: number, contact: Student) {
    return this.http.put<Student>(this.url + '/' + id, contact);
  }

  delete(id: number) {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
