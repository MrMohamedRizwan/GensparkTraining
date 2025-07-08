import {
  HttpClient,
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

// src/app/services/DietPlanService.ts
var DietPlanService;
var init_DietPlanService = __esm({
  "src/app/services/DietPlanService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    DietPlanService = class DietPlanService2 {
      http = inject(HttpClient);
      baseUrl = "http://localhost:5002/api/v1/DietPlan/";
      constructor() {
      }
      getToken() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user)?.token : null;
      }
      updateDietPlan(id, updated) {
        const token = this.getToken();
        return this.http.put(`http://localhost:5002/api/v1/DietPlan/Edit-Diet/${id}`, updated, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      addDietPlan(plan) {
        const token = this.getToken();
        return this.http.post(`http://localhost:5002/api/v1/DietPlan/AddDiet`, plan, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      GetAllDiets() {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}diet/all?pageNumber=1&pageSize=1000`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      GetParticularDiet(id) {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}dietplan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      deleteDietPlan(id) {
        const token = this.getToken();
        return this.http.delete(`${this.baseUrl}Delete-Diet/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      SubmitDietByClient(payload) {
        const token = this.getToken();
        return this.http.post(`http://localhost:5002/api/v1/Workout`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      static ctorParameters = () => [];
    };
    DietPlanService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], DietPlanService);
  }
});

export {
  DietPlanService,
  init_DietPlanService
};
//# sourceMappingURL=chunk-QZIZJTJO.js.map
