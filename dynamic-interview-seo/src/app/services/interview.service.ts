import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Interview {
  id: string;
  jobTitle: string;
  companyName: string;
  experience: string;
  jobDescription: string;
  skills: string[];
}

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private readonly apiUrl = '/assets/interviews.json';

  constructor(private readonly http: HttpClient) {}

  getInterview(id: string): Observable<Interview | undefined> {
    return this.http.get<Interview[]>(this.apiUrl).pipe(
      map((interviews) => interviews.find((interview) => interview.id === id))
    );
  }
}