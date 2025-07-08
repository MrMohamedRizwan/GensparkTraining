import {
  UserService,
  init_UserService
} from "./chunk-SPNMRDPB.js";
import {
  Router,
  init_router
} from "./chunk-CS3TLFNS.js";
import "./chunk-SUCX6BSB.js";
import "./chunk-HNAQOUEP.js";
import {
  CommonModule,
  init_common
} from "./chunk-5K4RIAN4.js";
import {
  ChangeDetectorRef,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  signal
} from "./chunk-NGZCFPTA.js";

// angular:jit:template:src/app/component/admin/admin-dashboard/admin-dashboard.html
var admin_dashboard_default;
var init_admin_dashboard = __esm({
  "angular:jit:template:src/app/component/admin/admin-dashboard/admin-dashboard.html"() {
    admin_dashboard_default = '<div class="container mt-4">\n  <h2 class="mb-4 text-primary">All Coaches</h2>\n\n  <div *ngIf="!coaches()?.length" class="text-muted text-center">\n    No coaches found.\n  </div>\n\n  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">\n    <div class="col" *ngFor="let coach of coaches()">\n      <div class="card h-100 shadow-sm border-0">\n        <div class="card-body">\n          <h5 class="card-title text-dark">{{ coach.name }}</h5>\n          <p class="card-text text-muted">\n            <strong>Email:</strong> {{ coach.email }}<br />\n            <strong>Experience:</strong> {{ coach.yearsOfExperience }} years\n          </p>\n        </div>\n        <div\n          class="card-footer bg-white border-top-0 d-flex justify-content-end gap-2"\n        >\n          <button\n            class="btn btn-outline-primary btn-sm"\n            (click)="viewCoach(coach.id)"\n          >\n            <i class="bi bi-eye"></i> View\n          </button>\n          <button\n            class="btn btn-outline-danger btn-sm"\n            (click)="deleteCoach(coach.id)"\n          >\n            <i class="bi bi-trash"></i> Delete\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/admin/admin-dashboard/admin-dashboard.css
var admin_dashboard_default2;
var init_admin_dashboard2 = __esm({
  "angular:jit:style:src/app/component/admin/admin-dashboard/admin-dashboard.css"() {
    admin_dashboard_default2 = "/* src/app/component/admin/admin-dashboard/admin-dashboard.css */\n/*# sourceMappingURL=admin-dashboard.css.map */\n";
  }
});

// src/app/component/admin/admin-dashboard/admin-dashboard.ts
var AdminDashboard;
var init_admin_dashboard3 = __esm({
  "src/app/component/admin/admin-dashboard/admin-dashboard.ts"() {
    "use strict";
    init_tslib_es6();
    init_admin_dashboard();
    init_admin_dashboard2();
    init_core();
    init_UserService();
    init_common();
    init_router();
    AdminDashboard = class AdminDashboard2 {
      userService;
      router;
      cdRef;
      coaches = signal([]);
      constructor(userService, router, cdRef) {
        this.userService = userService;
        this.router = router;
        this.cdRef = cdRef;
      }
      ngOnInit() {
        this.loadCoaches();
      }
      loadCoaches() {
        this.userService.getAllCoaches().subscribe({
          next: (res) => {
            const list = res?.$values || res?.items?.$values || [];
            this.coaches.set(list);
            console.log("\u2705 Coaches loaded:", this.coaches());
          },
          error: (err) => {
            console.error("\u274C Failed to load coaches:", err);
          }
        });
      }
      viewCoach(id) {
        this.router.navigate(["/admin/coach", id]);
      }
      deleteCoach(id) {
        console.log("Delete " + id);
        if (!confirm("Are you sure you want to delete this coach?"))
          return;
        this.userService.deleteCoach(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cdRef.detectChanges();
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
      static ctorParameters = () => [
        { type: UserService },
        { type: Router },
        { type: ChangeDetectorRef }
      ];
    };
    AdminDashboard = __decorate([
      Component({
        selector: "app-admin-dashboard",
        standalone: true,
        imports: [CommonModule],
        template: admin_dashboard_default,
        styles: [admin_dashboard_default2]
      })
    ], AdminDashboard);
  }
});

// src/app/component/admin/admin-dashboard/admin-dashboard.spec.ts
var require_admin_dashboard_spec = __commonJS({
  "src/app/component/admin/admin-dashboard/admin-dashboard.spec.ts"(exports) {
    init_testing();
    init_admin_dashboard3();
    describe("AdminDashboard", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [AdminDashboard]
        }).compileComponents();
        fixture = TestBed.createComponent(AdminDashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_admin_dashboard_spec();
//# sourceMappingURL=spec-app-component-admin-admin-dashboard-admin-dashboard.spec.js.map
