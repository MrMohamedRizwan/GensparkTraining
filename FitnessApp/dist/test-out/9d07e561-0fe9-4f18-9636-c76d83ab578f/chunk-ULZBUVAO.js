import {
  HttpClient,
  init_http
} from "./chunk-YV2VGSK5.js";
import {
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-EQ4BJPU7.js";

// src/app/services/PlanAssignmentService.ts
var PlanAssignmentService;
var init_PlanAssignmentService = __esm({
  "src/app/services/PlanAssignmentService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    PlanAssignmentService = class PlanAssignmentService2 {
      http;
      baseUrl = "http://localhost:5002/api/v1/Client";
      constructor(http) {
        this.http = http;
      }
      getToken() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user)?.token : null;
      }
      getPlans() {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/assigned-plans`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      AcceptPlan(payload) {
        const token = this.getToken();
        return this.http.put(`${this.baseUrl}/UpdateStatus`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      static ctorParameters = () => [
        { type: HttpClient }
      ];
    };
    PlanAssignmentService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], PlanAssignmentService);
  }
});

export {
  PlanAssignmentService,
  init_PlanAssignmentService
};
//# sourceMappingURL=chunk-ULZBUVAO.js.map
