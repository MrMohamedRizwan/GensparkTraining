import {
  UserService,
  init_UserService
} from "./chunk-DM2JQH2D.js";
import {
  Router,
  init_router
} from "./chunk-X422K7CE.js";
import "./chunk-54TAVEMT.js";
import "./chunk-MWUV55VP.js";
import {
  CommonModule,
  init_common
} from "./chunk-LSLPQO3F.js";
import {
  ChangeDetectorRef,
  Component,
  TestBed,
  __decorate,
  init_core,
  init_esm,
  init_testing,
  init_tslib_es6,
  of,
  signal,
  waitForAsync
} from "./chunk-54MGAL5N.js";

// src/app/component/admin/admin-dashboard/admin-dashboard.spec.ts
init_testing();

// src/app/component/admin/admin-dashboard/admin-dashboard.ts
init_tslib_es6();

// angular:jit:template:src/app/component/admin/admin-dashboard/admin-dashboard.html
var admin_dashboard_default = '<div class="container mt-4">\n  <h2 class="mb-4 text-primary">All Coaches</h2>\n\n  <div *ngIf="!coaches()?.length" class="text-muted text-center">\n    No coaches found.\n  </div>\n\n  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">\n    <div class="col" *ngFor="let coach of coaches()">\n      <div class="card h-100 shadow-sm border-0">\n        <div class="card-body">\n          <h5 class="card-title text-dark">{{ coach.name }}</h5>\n          <p class="card-text text-muted">\n            <strong>Email:</strong> {{ coach.email }}<br />\n            <strong>Experience:</strong> {{ coach.yearsOfExperience }} years\n          </p>\n        </div>\n        <div\n          class="card-footer bg-white border-top-0 d-flex justify-content-end gap-2"\n        >\n          <button\n            class="btn btn-outline-primary btn-sm"\n            (click)="viewCoach(coach.id)"\n          >\n            <i class="bi bi-eye"></i> View\n          </button>\n          <button\n            class="btn btn-outline-danger btn-sm"\n            (click)="deleteCoach(coach.id)"\n          >\n            <i class="bi bi-trash"></i> Delete\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';

// angular:jit:style:src/app/component/admin/admin-dashboard/admin-dashboard.css
var admin_dashboard_default2 = "/* src/app/component/admin/admin-dashboard/admin-dashboard.css */\n/*# sourceMappingURL=admin-dashboard.css.map */\n";

// src/app/component/admin/admin-dashboard/admin-dashboard.ts
init_core();
init_UserService();
init_common();
init_router();
var AdminDashboard = class AdminDashboard2 {
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

// src/app/component/admin/admin-dashboard/admin-dashboard.spec.ts
init_UserService();
init_router();
init_core();
init_esm();
init_common();
describe("AdminDashboard", () => {
  let component;
  let fixture;
  let mockUserService;
  let mockRouter;
  const mockCoachesResponse = {
    items: {
      $values: [
        {
          id: "65db16e6-8d40-43c9-93fe-c092b4915efd",
          name: "james",
          yearsOfExperience: 32,
          email: "james@gmail.com"
        },
        {
          id: "fd41d56a-7db6-409b-860b-c1d0c6cf6caf",
          name: "ChrisBumstead",
          yearsOfExperience: 45,
          email: "cbum@gmail.com"
        },
        {
          id: "96c3b95a-418d-42d7-8728-b568a6573acf",
          name: "Nandha Kumar",
          yearsOfExperience: 12,
          email: "Nandhssakumar@gmail.com"
        }
      ]
    }
  };
  beforeEach(waitForAsync(() => {
    mockUserService = jasmine.createSpyObj("UserService", [
      "getAllCoaches",
      "deleteCoach"
    ]);
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
    TestBed.configureTestingModule({
      imports: [CommonModule, AdminDashboard],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
        ChangeDetectorRef
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboard);
    component = fixture.componentInstance;
    mockUserService.getAllCoaches.and.returnValue(of(mockCoachesResponse));
    fixture.detectChanges();
  });
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
  it("should load coaches on init", () => {
    const coaches = component.coaches();
    expect(coaches.length).toBe(3);
    expect(coaches[1].name).toBe("ChrisBumstead");
  });
  it("should navigate to coach details", () => {
    const coachId = "fd41d56a-7db6-409b-860b-c1d0c6cf6caf";
    component.viewCoach(coachId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/admin/coach", coachId]);
  });
  it("should confirm and call deleteCoach", () => {
    spyOn(window, "confirm").and.returnValue(true);
    mockUserService.deleteCoach.and.returnValue(of({ message: "deleted" }));
    spyOn(component["cdRef"], "detectChanges");
    const coachId = "65db16e6-8d40-43c9-93fe-c092b4915efd";
    component.deleteCoach(coachId);
    expect(mockUserService.deleteCoach).toHaveBeenCalledWith(coachId);
    expect(component["cdRef"].detectChanges).toHaveBeenCalled();
  });
  it("should not call deleteCoach if confirmation is canceled", () => {
    spyOn(window, "confirm").and.returnValue(false);
    const coachId = "some-id";
    component.deleteCoach(coachId);
    expect(mockUserService.deleteCoach).not.toHaveBeenCalled();
  });
});
//# sourceMappingURL=spec-app-component-admin-admin-dashboard-admin-dashboard.spec.js.map
