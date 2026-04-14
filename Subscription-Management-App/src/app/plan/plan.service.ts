import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanType, SubscriptionPlan } from '../user/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8081/api/plan"

  getPlan(planType: PlanType): Observable<SubscriptionPlan> {

    return this.http.get<SubscriptionPlan>(`${this.baseUrl}/${planType}`)
  }
}
