import {
  Router,
  RouterModule,
  init_router
} from "./chunk-X422K7CE.js";
import {
  CommonModule,
  init_common
} from "./chunk-LSLPQO3F.js";
import {
  Component,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-54MGAL5N.js";

// angular:jit:template:src/app/component/coach/caoch-sidebar/caoch-sidebar.html
var caoch_sidebar_default;
var init_caoch_sidebar = __esm({
  "angular:jit:template:src/app/component/coach/caoch-sidebar/caoch-sidebar.html"() {
    caoch_sidebar_default = '<div\n  class="d-flex flex-column bg-white border-end shadow-sm"\n  style="height: 100vh; width: max-content"\n>\n  <div class="p-4 border-bottom">\n    <div class="d-flex align-items-center gap-3">\n      <div\n        class="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"\n        style="width: 40px; height: 40px"\n      >\n        <i class="bi bi-activity"></i>\n      </div>\n      <div>\n        <h5 class="mb-0">FitTracker</h5>\n        <small class="text-muted text-capitalize">Coach</small>\n      </div>\n    </div>\n  </div>\n\n  <nav\n    class="flex-grow-1 px-3 pt-3 overflow-auto"\n    style="max-height: calc(100vh - 120px); overflow-y: auto"\n  >\n    <a\n      *ngFor="let link of links"\n      [routerLink]="link.to"\n      routerLinkActive="active bg-primary text-white"\n      class="d-flex align-items-center gap-2 py-2 px-3 mb-2 rounded text-decoration-none text-dark"\n      [routerLinkActiveOptions]="{ exact: true }"\n    >\n      <i [class]="link.icon"></i>\n      {{ link.label }}\n    </a>\n  </nav>\n\n  <div class="p-3 border-top">\n    <button class="btn btn-outline-secondary w-100" (click)="handleLogout()">\n      Sign Out\n    </button>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/coach/caoch-sidebar/caoch-sidebar.css
var caoch_sidebar_default2;
var init_caoch_sidebar2 = __esm({
  "angular:jit:style:src/app/component/coach/caoch-sidebar/caoch-sidebar.css"() {
    caoch_sidebar_default2 = "/* src/app/component/coach/caoch-sidebar/caoch-sidebar.css */\n.fade-in {\n  animation: fadeIn 0.4s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateX(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n/*# sourceMappingURL=caoch-sidebar.css.map */\n";
  }
});

// src/app/component/coach/caoch-sidebar/caoch-sidebar.ts
var CaochSidebar;
var init_caoch_sidebar3 = __esm({
  "src/app/component/coach/caoch-sidebar/caoch-sidebar.ts"() {
    "use strict";
    init_tslib_es6();
    init_caoch_sidebar();
    init_caoch_sidebar2();
    init_common();
    init_core();
    init_router();
    CaochSidebar = class CaochSidebar2 {
      router;
      constructor(router) {
        this.router = router;
      }
      links = [
        { to: "/coach-dashboard", icon: "bi bi-activity", label: "Dashboard" },
        { to: "/clients-list", icon: "bi bi-people-fill", label: "My Clients" },
        {
          to: "/assign-plan",
          icon: "bi bi-plus-circle-fill",
          label: "Assign Plan"
        },
        {
          to: "/create-plan",
          icon: "bi bi-file-earmark-text-fill",
          label: "Create Plan"
        },
        {
          to: "/view-workout-plan",
          icon: "bi bi-eye-fill",
          // Changed to an "eye" icon for viewing
          label: "View Workout Plans"
        },
        {
          to: "/view-diet-plan",
          icon: "bi bi-eye-fill",
          // Changed to an "eye" icon for viewing
          label: "View Diet Plans"
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
    CaochSidebar = __decorate([
      Component({
        selector: "app-caoch-sidebar",
        imports: [CommonModule, RouterModule],
        template: caoch_sidebar_default,
        styles: [caoch_sidebar_default2]
      })
    ], CaochSidebar);
  }
});

export {
  CaochSidebar,
  init_caoch_sidebar3 as init_caoch_sidebar
};
//# sourceMappingURL=chunk-74R6O7OA.js.map
