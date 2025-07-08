import {
  Router,
  init_router
} from "./chunk-R5A4DKQG.js";
import {
  HttpClient,
  init_http
} from "./chunk-4XNTC5IA.js";
import {
  Injectable,
  Observable,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_tslib_es6,
  inject
} from "./chunk-3YOU7Q7G.js";

// node_modules/jwt-decode/build/esm/index.js
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }
  let decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
  }
  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
  }
}
var InvalidTokenError;
var init_esm2 = __esm({
  "node_modules/jwt-decode/build/esm/index.js"() {
    "use strict";
    InvalidTokenError = class extends Error {
    };
    InvalidTokenError.prototype.name = "InvalidTokenError";
  }
});

// src/app/services/UserService.ts
var UserService;
var init_UserService = __esm({
  "src/app/services/UserService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_esm();
    init_http();
    init_router();
    init_esm2();
    UserService = class UserService2 {
      router;
      http = inject(HttpClient);
      constructor(router) {
        this.router = router;
      }
      validateUser(credentials) {
        return new Observable((observer) => {
          this.http.post("http://localhost:5002/api/v1/Authentication", credentials).subscribe({
            next: (response) => {
              localStorage.setItem("user", JSON.stringify(response));
              const token = response.token;
              const decoded = jwtDecode(token);
              const role = decoded?.role || decoded?.Role || decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
              console.log("Decoded role:", role);
              if (role == "Coach") {
                this.router.navigate(["/coach-dashboard"]);
              } else if (role == "Client") {
                this.router.navigate(["/client-dashboard"]);
              } else {
                this.router.navigate(["/admin-dashboard"]);
              }
              observer.next(true);
              observer.complete();
            },
            error: (error) => {
              observer.error(error?.error?.errorMessage || "User validation failed");
            }
          });
        });
      }
      addUser(user) {
        return new Observable((observer) => {
          this.http.post(`http://localhost:5002/api/v1/${user.role}`, user).subscribe({
            next: (response) => {
              localStorage.setItem("user", JSON.stringify(response));
              console.log("User added successfully:", response);
              if (user.role === "Coach")
                this.router.navigate(["/coach-dashboard"]);
              else if (user.role === "Client")
                this.router.navigate(["/update-details"]);
              observer.next(true);
              observer.complete();
            },
            error: (error) => {
              console.error("Error adding user:", error);
              observer.error(error?.error);
            }
          });
        });
      }
      // src/app/services/UserService.ts
      getAllCoaches() {
        const token = this.getToken();
        return this.http.get("http://localhost:5002/api/v1/Coach/getAllCoaches", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      deleteCoach(id) {
        {
          const token = this.getToken();
          return this.http.delete(`http://localhost:5002/api/v1/Admin/Delete-Coach/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      }
      UpdateClientDetails(data) {
        return new Observable((observer) => {
          const token = this.getToken();
          this.http.put(`http://localhost:5002/api/v1/Client/update-client-details`, data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).subscribe({
            next: (response) => {
              console.log("Client update successful:", response);
              this.router.navigate(["/client-dashboard"]);
              observer.next(response.message);
              observer.complete();
            },
            error: (error) => {
              console.error("Client update failed:", error);
              observer.error(error?.error?.message || "Update failed");
            }
          });
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
    UserService = __decorate([
      Injectable()
    ], UserService);
  }
});

export {
  UserService,
  init_UserService
};
//# sourceMappingURL=chunk-HVQ3Y44B.js.map
