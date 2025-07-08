import {
  UserService,
  init_UserService
} from "./chunk-U7SWEQEB.js";
import {
  Router,
  init_router
} from "./chunk-XZQZQLJQ.js";
import "./chunk-VOWP6SJ3.js";
import "./chunk-E5G6P5QB.js";
import {
  CommonModule,
  init_common
} from "./chunk-G6SPFJGI.js";
import {
  TestBed,
  fakeAsync,
  init_testing,
  tick
} from "./chunk-M6CJ4AGH.js";
import {
  ChangeDetectorRef,
  Component,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_tslib_es6,
  of,
  signal,
  throwError
} from "./chunk-X6QY723D.js";

// angular:jit:template:src/app/component/admin/admin-dashboard/admin-dashboard.html
var admin_dashboard_default;
var init_admin_dashboard = __esm({
  "angular:jit:template:src/app/component/admin/admin-dashboard/admin-dashboard.html"() {
    admin_dashboard_default = `<div class="container my-4">
  <h2 class="mb-4 text-primary text-center">Admin Dashboard</h2>

  <!-- Section: Coaches -->
  <div class="mb-5">
    <h4 class="text-secondary mb-3">
      <i class="bi bi-person-badge-fill me-2"></i>All Coaches
    </h4>

    <div *ngIf="!coaches()?.length" class="text-muted text-center">
      No coaches found.
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" *ngFor="let coach of coaches()">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body">
            <h5 class="card-title text-dark d-flex align-items-center">
              <i class="bi bi-person-circle me-2 fs-4 text-primary"></i>
              {{ coach.name }}
            </h5>
            <p class="card-text text-muted mb-1">
              <strong>Email:</strong> {{ coach.email }}
            </p>
            <p class="card-text text-muted mb-0">
              <strong>Experience:</strong> {{ coach.yearsOfExperience }} years
            </p>
          </div>
          <div
            class="card-footer bg-white border-top-0 d-flex justify-content-end gap-2"
          >
            <!-- <button
              class="btn btn-outline-primary btn-sm"
              (click)="viewCoach(coach.id)"
            >
              <i class="bi bi-eye"></i> View
            </button> -->
            <button
              class="btn btn-outline-danger btn-sm"
              (click)="deleteCoach(coach.id)"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Section: Clients -->
  <div>
    <h4 class="text-secondary mb-3">
      <i class="bi bi-people-fill me-2"></i>All Clients
    </h4>

    <div *ngIf="!clients()?.length" class="text-muted text-center">
      No clients found.
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" *ngFor="let client of clients()">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body">
            <h5 class="card-title text-dark d-flex align-items-center">
              <i class="bi bi-person-lines-fill me-2 fs-4 text-success"></i>
              {{ client.name }}
            </h5>
            <p class="card-text text-muted mb-1">
              <strong>Email:</strong> {{ client.email }}
            </p>
            <p class="card-text text-muted mb-1">
              <strong>Gender:</strong> {{ client.gender || 'N/A' }}
            </p>
            <p class="card-text text-muted mb-0">
              <strong>Age:</strong> {{ client.age }}
            </p>
          </div>
          <div
            class="card-footer bg-white border-top-0 d-flex justify-content-end gap-2"
          >
            <!-- <button
              class="btn btn-outline-primary btn-sm"
              (click)="viewClient(client.id)"
            >
              <i class="bi bi-eye"></i> View
            </button> -->
            <button
              class="btn btn-outline-danger btn-sm"
              (click)="deleteClient(client.id)"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
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
      clients = signal([]);
      constructor(userService, router, cdRef) {
        this.userService = userService;
        this.router = router;
        this.cdRef = cdRef;
      }
      ngOnInit() {
        this.loadCoaches();
        this.loadClients();
      }
      viewClient(id) {
      }
      deleteClient(id) {
        console.log("Delete " + id);
        if (!confirm("Are you sure you want to delete this coach?"))
          return;
        this.userService.deleteClient(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cdRef.detectChanges();
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
      loadClients() {
        this.userService.getAllClients().subscribe({
          next: (res) => {
            const list = res?.$values || res?.items?.$values || [];
            this.clients.set(list);
            console.log("\u2705 Clients loaded:", this.clients());
          },
          error: (err) => {
            console.error("\u274C Failed to load coaches:", err);
          }
        });
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
    init_UserService();
    init_router();
    init_esm();
    init_core();
    init_common();
    describe("AdminDashboard", () => {
      let component;
      let fixture;
      const mockRouter = {
        navigate: jasmine.createSpy("navigate")
      };
      const mockUserService = {
        getAllCoaches: jasmine.createSpy("getAllCoaches"),
        getAllClients: jasmine.createSpy("getAllClients"),
        deleteCoach: jasmine.createSpy("deleteCoach"),
        deleteClient: jasmine.createSpy("deleteClient")
      };
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [AdminDashboard, CommonModule],
          providers: [
            { provide: UserService, useValue: mockUserService },
            { provide: Router, useValue: mockRouter },
            ChangeDetectorRef
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(AdminDashboard);
        component = fixture.componentInstance;
      }));
      beforeEach(() => {
        mockUserService.getAllCoaches.calls.reset();
        mockUserService.getAllClients.calls.reset();
        mockUserService.deleteCoach.calls.reset();
        mockUserService.deleteClient.calls.reset();
      });
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
      it("should call loadCoaches and loadClients on init", fakeAsync(() => {
        mockUserService.getAllCoaches.and.returnValue(of({ $values: [] }));
        mockUserService.getAllClients.and.returnValue(of({ $values: [] }));
        fixture.detectChanges();
        tick();
        expect(mockUserService.getAllCoaches).toHaveBeenCalled();
        expect(mockUserService.getAllClients).toHaveBeenCalled();
      }));
      it("should load coaches from service", fakeAsync(() => {
        const mockCoaches = [{ id: "1", name: "Coach A" }];
        mockUserService.getAllCoaches.and.returnValue(of({ $values: mockCoaches }));
        component.loadCoaches();
        tick();
        expect(component.coaches()).toEqual(mockCoaches);
      }));
      it("should load clients from service", fakeAsync(() => {
        const mockClients = [{ id: "c1", name: "Client A" }];
        mockUserService.getAllClients.and.returnValue(of({ $values: mockClients }));
        component.loadClients();
        tick();
        expect(component.clients()).toEqual(mockClients);
      }));
      it("should call deleteCoach if confirmed", fakeAsync(() => {
        spyOn(window, "confirm").and.returnValue(true);
        mockUserService.deleteCoach.and.returnValue(of({}));
        component.deleteCoach("1");
        tick();
        expect(mockUserService.deleteCoach).toHaveBeenCalledWith("1");
      }));
      it("should not call deleteCoach if confirm is cancelled", () => {
        spyOn(window, "confirm").and.returnValue(false);
        component.deleteCoach("1");
        expect(mockUserService.deleteCoach).not.toHaveBeenCalled();
      });
      it("should call deleteClient if confirmed", fakeAsync(() => {
        spyOn(window, "confirm").and.returnValue(true);
        mockUserService.deleteClient.and.returnValue(of({}));
        component.deleteClient("c1");
        tick();
        expect(mockUserService.deleteClient).toHaveBeenCalledWith("c1");
      }));
      it("should navigate to coach view page", () => {
        component.viewCoach("123");
        expect(mockRouter.navigate).toHaveBeenCalledWith(["/admin/coach", "123"]);
      });
      it("should handle loadCoaches error", fakeAsync(() => {
        spyOn(console, "error");
        mockUserService.getAllCoaches.and.returnValue(throwError(() => "Load Error"));
        component.loadCoaches();
        tick();
        expect(console.error).toHaveBeenCalledWith("\u274C Failed to load coaches:", "Load Error");
      }));
      it("should handle loadClients error", fakeAsync(() => {
        spyOn(console, "error");
        mockUserService.getAllClients.and.returnValue(throwError(() => "Client Error"));
        component.loadClients();
        tick();
        expect(console.error).toHaveBeenCalledWith("\u274C Failed to load coaches:", "Client Error");
      }));
    });
  }
});
export default require_admin_dashboard_spec();
//# sourceMappingURL=spec-app-component-admin-admin-dashboard-admin-dashboard.spec.js.map
