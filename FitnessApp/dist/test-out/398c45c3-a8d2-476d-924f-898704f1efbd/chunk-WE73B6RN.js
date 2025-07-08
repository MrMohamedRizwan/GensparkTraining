import {
  HttpClient,
  init_http
} from "./chunk-35V5GIMJ.js";
import {
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-I33ILCKL.js";

// src/app/services/ClientService.ts
var ClientService;
var init_ClientService = __esm({
  "src/app/services/ClientService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    ClientService = class ClientService2 {
      http;
      baseUrl = "http://localhost:5002/api/v1/Client";
      constructor(http) {
        this.http = http;
      }
      getClientById(id) {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/get-client/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      getMyDetails() {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/my-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      }
      getAssignedPlans(email) {
        const token = this.getToken();
        return this.http.get(`http://localhost:5002/api/v1/Coach/getAssignedPlan/${email}`, {
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
        { type: HttpClient }
      ];
    };
    ClientService = __decorate([
      Injectable({ providedIn: "root" })
    ], ClientService);
  }
});

export {
  ClientService,
  init_ClientService
};
//# sourceMappingURL=chunk-WE73B6RN.js.map
