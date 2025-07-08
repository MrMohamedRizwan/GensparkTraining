import {
  HttpClient,
  init_http
} from "./chunk-E5G6P5QB.js";
import {
  BehaviorSubject,
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_tslib_es6,
  inject
} from "./chunk-X6QY723D.js";

// src/app/services/WorkoutPlanService.ts
var WorkoutPlanService;
var init_WorkoutPlanService = __esm({
  "src/app/services/WorkoutPlanService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    init_esm();
    WorkoutPlanService = class WorkoutPlanService2 {
      http = inject(HttpClient);
      baseUrl = "http://localhost:5002/api/v1/WorkoutPlan";
      selectedPlanSubject = new BehaviorSubject(null);
      selectedPlan$ = this.selectedPlanSubject.asObservable();
      constructor() {
      }
      getToken() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user)?.token : null;
      }
      addWorkoutPlan(plan) {
        const token = this.getToken();
        return this.http.post(`${this.baseUrl}/AddWorkoutPlans`, plan, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      GetParticularWorkout(id) {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/WorkoutPlan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      GetAllWorkouts() {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/Workout/all?pageNumber=1&pageSize=1000`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      updateWorkoutPlan(id, updatedPlan) {
        const token = this.getToken();
        return this.http.put(`${this.baseUrl}/EditWorkoutPlan/${id}`, updatedPlan, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      deleteWorkoutPlan(id) {
        const token = this.getToken();
        return this.http.delete(`${this.baseUrl}/Delete-Workout/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      SubmitWorkoutByClient(payload) {
        const token = this.getToken();
        return this.http.post(`http://localhost:5002/api/v1/Workout`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      static ctorParameters = () => [];
    };
    WorkoutPlanService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], WorkoutPlanService);
  }
});

export {
  WorkoutPlanService,
  init_WorkoutPlanService
};
//# sourceMappingURL=chunk-BZGINZVW.js.map
