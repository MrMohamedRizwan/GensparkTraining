import {
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-VC5DMEMI.js";
import {
  Router,
  RouterModule,
  init_router
} from "./chunk-W25TYQ46.js";
import {
  CommonModule,
  init_common
} from "./chunk-62KLJIS4.js";
import {
  Component,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-U4LD2BTV.js";

// angular:jit:template:src/app/component/client/client-sidebar/client-sidebar.html
var client_sidebar_default;
var init_client_sidebar = __esm({
  "angular:jit:template:src/app/component/client/client-sidebar/client-sidebar.html"() {
    client_sidebar_default = '<div\n  class="d-flex flex-column bg-white border-end shadow-sm"\n  style="height: 100vh; width: max-content"\n>\n  <div class="p-4 border-bottom">\n    <div class="d-flex align-items-center gap-3">\n      <div\n        class="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"\n        style="width: 40px; height: 40px"\n      >\n        <i class="bi bi-activity"></i>\n      </div>\n      <div>\n        <h5 class="mb-0">FitTracker</h5>\n        <small class="text-muted text-capitalize">Client</small>\n      </div>\n    </div>\n  </div>\n\n  <nav\n    class="flex-grow-1 px-3 pt-3 overflow-auto"\n    style="max-height: calc(100vh - 120px); overflow-y: auto"\n  >\n    <a\n      *ngFor="let link of links"\n      [routerLink]="link.to"\n      routerLinkActive="active bg-primary text-white"\n      class="d-flex align-items-center gap-2 py-2 px-3 mb-2 rounded text-decoration-none text-dark"\n      [routerLinkActiveOptions]="{ exact: true }"\n    >\n      <i [class]="link.icon"></i>\n      {{ link.label }}\n    </a>\n  </nav>\n\n  <div class="p-3 border-top">\n    <button class="btn btn-outline-secondary w-100" (click)="handleLogout()">\n      Sign Out\n    </button>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/client/client-sidebar/client-sidebar.css
var client_sidebar_default2;
var init_client_sidebar2 = __esm({
  "angular:jit:style:src/app/component/client/client-sidebar/client-sidebar.css"() {
    client_sidebar_default2 = "/* src/app/component/client/client-sidebar/client-sidebar.css */\n.fade-in {\n  animation: fadeIn 0.4s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateX(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n/*# sourceMappingURL=client-sidebar.css.map */\n";
  }
});

// src/app/component/client/client-sidebar/client-sidebar.ts
var ClientSidebar;
var init_client_sidebar3 = __esm({
  "src/app/component/client/client-sidebar/client-sidebar.ts"() {
    "use strict";
    init_tslib_es6();
    init_client_sidebar();
    init_client_sidebar2();
    init_common();
    init_core();
    init_forms();
    init_router();
    ClientSidebar = class ClientSidebar2 {
      router;
      constructor(router) {
        this.router = router;
        console.log("ClientSideBar");
      }
      links = [
        { to: "/client-dashboard", icon: "bi bi-speedometer2", label: "Dashboard" },
        {
          to: "/myPlans",
          icon: "bi bi-journal-medical",
          label: "My Plans"
        },
        {
          to: "/progress",
          icon: "bi bi-graph-up-arrow",
          // progress icon
          label: "Progress"
        },
        {
          to: "/stats-analytics",
          icon: "bi bi-bar-chart-line-fill",
          label: "Stats & Analytics"
        }
      ];
      handleLogout() {
        localStorage.clear();
        this.router.navigate(["/"]);
      }
      static ctorParameters = () => [
        { type: Router }
      ];
    };
    ClientSidebar = __decorate([
      Component({
        selector: "app-client-sidebar",
        imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
        template: client_sidebar_default,
        styles: [client_sidebar_default2]
      })
    ], ClientSidebar);
  }
});

export {
  ClientSidebar,
  init_client_sidebar3 as init_client_sidebar
};
//# sourceMappingURL=chunk-ZQT5HSVZ.js.map
