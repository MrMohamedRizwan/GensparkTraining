import {
  HttpClient,
  init_http
} from "./chunk-MWUV55VP.js";
import {
  Injectable,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-54MGAL5N.js";

// src/app/services/ProgressService.ts
var ProgressService;
var init_ProgressService = __esm({
  "src/app/services/ProgressService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    ProgressService = class ProgressService2 {
      http;
      baseUrl = "http://localhost:5002/api/v1/Progress";
      constructor(http) {
        this.http = http;
      }
      getAllProgress() {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      getAllProgressOfClient(clientId) {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/client/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      getProgressGraph(clientId) {
        const token = this.getToken();
        return this.http.get(`${this.baseUrl}/getProgressLogs/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      createProgress(formData) {
        const token = this.getToken();
        return this.http.post(`${this.baseUrl}/progress`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      getToken() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user)?.token : null;
      }
      static ctorParameters = () => [
        { type: HttpClient }
      ];
    };
    ProgressService = __decorate([
      Injectable({ providedIn: "root" })
    ], ProgressService);
  }
});

export {
  ProgressService,
  init_ProgressService
};
//# sourceMappingURL=chunk-P6TSOH3Z.js.map
