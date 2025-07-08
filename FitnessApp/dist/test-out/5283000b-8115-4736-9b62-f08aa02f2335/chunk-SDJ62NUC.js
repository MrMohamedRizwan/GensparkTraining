import {
  Router,
  init_router
} from "./chunk-ATZ6NMTJ.js";
import {
  HttpClient,
  HttpHeaders,
  init_http
} from "./chunk-OOMFGBQ3.js";
import {
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6,
  inject
} from "./chunk-SLZOMOAS.js";

// src/app/services/CoachService.ts
var CoachService;
var init_CoachService = __esm({
  "src/app/services/CoachService.ts"() {
    "use strict";
    init_tslib_es6();
    init_http();
    init_core();
    init_router();
    CoachService = class CoachService2 {
      router;
      http = inject(HttpClient);
      constructor(router) {
        this.router = router;
      }
      getClientsList() {
        const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        const url = `http://localhost:5002/api/v1/Coach/ClientWithoutPlansAssigned?pageNumber=1&pageSize=100&searchTerm=all`;
        return this.http.get(url, { headers });
      }
      getDiets() {
        const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        const url = `http://localhost:5002/api/v1/DietPlan/diet/all`;
        return this.http.get(url, { headers });
      }
      getWorkouts() {
        const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        const url = `http://localhost:5002/api/v1/WorkoutPlan/Workout/all`;
        return this.http.get(url, { headers });
      }
      getAssignedPlansChart() {
        const token = this.getToken();
        return this.http.get("http://localhost:5002/api/v1/Coach/assignedPlansByWeek", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      assignPlanToClient(payload) {
        const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
        const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
        return this.http.post(`http://localhost:5002/api/v1/Coach/AssignPlan`, payload, { headers });
      }
      markPlanAsCompleted(id) {
        const token = this.getToken();
        console.log("Mark Plan As completer", token);
        return this.http.put(`http://localhost:5002/api/v1/Coach/${id}/completed`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      getToken() {
        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          return parsedUser?.token || null;
        }
        return null;
      }
      static ctorParameters = () => [
        { type: Router }
      ];
    };
    CoachService = __decorate([
      Injectable()
    ], CoachService);
  }
});

export {
  CoachService,
  init_CoachService
};
//# sourceMappingURL=chunk-SDJ62NUC.js.map
