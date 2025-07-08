import {
  PlanAssignmentService,
  init_PlanAssignmentService
} from "./chunk-P2RYEI7M.js";
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
  init_testing,
  waitForAsync
} from "./chunk-M6CJ4AGH.js";
import {
  ChangeDetectorRef,
  Component,
  __decorate,
  init_core,
  init_esm,
  init_tslib_es6,
  of,
  signal,
  throwError
} from "./chunk-X6QY723D.js";

// src/app/component/client/my-plans/my-plans.spec.ts
init_testing();

// src/app/component/client/my-plans/my-plans.ts
init_tslib_es6();

// angular:jit:template:src/app/component/client/my-plans/my-plans.html
var my_plans_default = `<div class="container mt-4">
  <h2 class="mb-3">My Plans</h2>
  <p class="text-muted">Track your assigned workout and diet plans</p>

  <!-- Workout Plans Section -->
  <h4 class="mt-4 d-flex align-items-center">
    <i class="bi bi-walk me-2 text-primary"></i> Workout Plans
  </h4>

  <div
    class="d-flex gap-4 py-2"
    style="overflow-x: auto; white-space: nowrap; scrollbar-width: thin"
  >
    <div
      class="card shadow-sm"
      *ngFor="let plan of workoutPlans()"
      style="width: 420px; height: 300px; flex: 0 0 auto"
    >
      <div
        class="card-body d-flex flex-column justify-content-between h-100"
        style="max-width: 95%"
      >
        <div>
          <h4 class="card-title text-truncate" style="max-width: 95%">
            {{ plan.workoutPlanTitle }}
          </h4>
          <p class="card-text text-muted mb-2 fs-6">
            <strong>Assigned:</strong> {{ plan.assignedOn | date: 'mediumDate'
            }}
          </p>
          <span
            [ngClass]="{
              'badge fs-6 px-3 py-2': true,
              'bg-secondary': plan.status === 'Not Started',
              'bg-warning': plan.status === 'On Progress',
              'bg-success': plan.status === 'Completed',
    
            }"
          >
            {{ plan.status }}
          </span>
          <p class="mt-3 text-muted fs-6">
            <strong>Due:</strong>
            {{ plan.dueDate === '0001-01-01T00:00:00' ? 'N/A' : (plan.dueDate |
            date: 'mediumDate') }}
          </p>
        </div>
        <div class="mb-2">
          <div class="d-flex justify-content-between small mb-1">
            <span>Progress</span>
            <span>{{ plan.progressPercentage }}%</span>
          </div>
          <div class="progress" style="height: 6px">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              [style.width.%]="plan.progressPercentage"
              [attr.aria-valuenow]="plan.progressPercentage"
              attr.aria-valuemin="0"
              attr.aria-valuemax="100"
            ></div>
          </div>
        </div>

        <div class="mt-3">
          <button
            *ngIf="plan.status === 'Completed'"
            class="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center"
          >
            <i class="bi bi-bar-chart-fill me-2"></i>
            View Progress
          </button>
          <button
            *ngIf="plan.status === 'On Progress'"
            class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
            (click)="showWorkoutDetails(plan); $event.stopPropagation()"
          >
            <i class="bi bi-play-circle-fill me-2"></i>
            Continue Workout
          </button>
          <button
            *ngIf="plan.status === 'Not Started'"
            class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
            (click)="acceptPlan(plan,1); $event.stopPropagation()"
            (click)="plan.status = 'On Progress'; acceptPlan(plan,1); $event.stopPropagation()"
          >
            <i class="bi bi-check-circle-fill me-2"></i>
            Accept Workout Plan
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Diet Plans Section -->
  <h4 class="mt-5 d-flex align-items-center">
    <i class="bi bi-egg-fried me-2 text-success"></i> Diet Plans
  </h4>

  <div
    class="d-flex gap-4 py-2"
    style="overflow-x: auto; white-space: nowrap; scrollbar-width: thin"
  >
    <div
      class="card mb-3 shadow-sm"
      style="width: 420px; height: 300px; flex: 0 0 auto"
      *ngFor="let plan of dietPlans()"
    >
      <div class="card-body d-flex flex-column justify-content-between h-100">
        <div>
          <h4 class="card-title text-truncate" style="max-width: 95%">
            {{ plan.dietPlanTitle }}
          </h4>
          <p class="card-text text-muted mb-2 fs-6">
            <strong>Assigned:</strong> {{ plan.assignedOn | date: 'mediumDate'
            }}
          </p>
          <span
            [ngClass]="{
              'badge fs-6 px-3 py-2': true,
              'bg-secondary': plan.status === 'Not Started',
              'bg-warning': plan.status === 'On Progress',
              'bg-success': plan.status === 'Completed',
    
            }"
          >
            {{ plan.status }}
          </span>
          <p class="mt-3 text-muted fs-6">
            <strong>Due:</strong>
            {{ plan.dueDate === '0001-01-01T00:00:00' ? 'N/A' : (plan.dueDate |
            date: 'mediumDate') }}
          </p>
        </div>
        <div class="mb-2">
          <div class="d-flex justify-content-between small mb-1">
            <span>Progress</span>
            <span>{{ plan.progressPercentage }}%</span>
          </div>
          <div class="progress" style="height: 6px">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              [style.width.%]="plan.progressPercentage"
              [attr.aria-valuenow]="plan.progressPercentage"
              attr.aria-valuemin="0"
              attr.aria-valuemax="100"
            ></div>
          </div>
        </div>
        <div class="mt-3">
          <button
            *ngIf="plan.status === 'Completed'"
            class="btn btn-outline-success btn-lg w-100 d-flex align-items-center justify-content-center"
          >
            <i class="bi bi-bar-chart-fill me-2"></i>
            View Progress
          </button>
          <button
            *ngIf="plan.status === 'On Progress'"
            class="btn btn-success btn-lg w-100 d-flex align-items-center justify-content-center"
            (click)="showDietDetails(plan); $event.stopPropagation()"
          >
            <i class="bi bi-play-circle-fill me-2"></i>
            Continue Diet
          </button>
          <button
            *ngIf="plan.status === 'Not Started'"
            class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
            (click)="acceptPlan(plan,0); $event.stopPropagation()"
            (click)="plan.status = 'On Progress'; acceptPlan(plan,1); $event.stopPropagation()"
          >
            <i class="bi bi-check-circle-fill me-2"></i>
            Accept Diet Plan
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// angular:jit:style:src/app/component/client/my-plans/my-plans.css
var my_plans_default2 = "/* src/app/component/client/my-plans/my-plans.css */\n/*# sourceMappingURL=my-plans.css.map */\n";

// src/app/component/client/my-plans/my-plans.ts
init_core();
init_PlanAssignmentService();
init_common();
init_router();
var MyPlans = class MyPlans2 {
  planAssignmentService;
  router;
  cdr;
  // Signals to track plan data
  allPlans = signal([]);
  workoutPlans = signal([]);
  dietPlans = signal([]);
  constructor(planAssignmentService, router, cdr) {
    this.planAssignmentService = planAssignmentService;
    this.router = router;
    this.cdr = cdr;
  }
  ngOnInit() {
    this.fetchPlanAssignment();
  }
  acceptPlan(details, val) {
    console.log(details.planAssignmentId);
    const payload = {
      PlanAssignmentID: details.planAssignmentId,
      status: "On Progress"
    };
    this.planAssignmentService.AcceptPlan(payload).subscribe({
      next: (res) => {
        console.log(`${res} Response`);
        if (val == 1) {
          sessionStorage.setItem("WorkoutPlanAssignment", JSON.stringify({
            PlanAssignmentID: details.planAssignmentId,
            WorkoutPlanID: details.workoutPlanID
          }));
        } else {
          sessionStorage.setItem("DietPlanAssignment", JSON.stringify({
            DietPlanAssignmentID: details.planAssignmentId,
            DietPlanID: details.dietPlanId
          }));
        }
      },
      error: (err) => {
        console.error("\u274C Failed to Accept plans:", err);
        alert(err);
      }
    });
  }
  selectedWorkoutDetails = null;
  showWorkoutDetails(details) {
    this.selectedWorkoutDetails = details;
    console.log("Workout Details:", details);
    this.router.navigate([
      "/client-workout-plan",
      details.workoutPlanID,
      details.planAssignmentId
    ]);
  }
  selectedDietDetails = null;
  showDietDetails(details) {
    this.selectedDietDetails = details;
    console.log("Diet Details:", details);
    this.router.navigate([
      "/client-diet-plan",
      details.dietPlanId,
      details.planAssignmentId
    ]);
  }
  fetchPlanAssignment() {
    this.planAssignmentService.getPlans().subscribe({
      next: (res) => {
        const plans = "$values" in res ? res.$values : [];
        this.allPlans.set(plans);
        this.workoutPlans.set(plans.filter((p) => p.workoutPlanTitle && p.workoutPlanTitle !== "Not Assigned"));
        this.dietPlans.set(plans.filter((p) => p.dietPlanTitle && p.dietPlanTitle !== "Not Assigned"));
      },
      error: (err) => {
        console.error("\u274C Failed to fetch plans:", err);
        this.allPlans.set([]);
        this.workoutPlans.set([]);
        this.dietPlans.set([]);
      }
    });
  }
  static ctorParameters = () => [
    { type: PlanAssignmentService },
    { type: Router },
    { type: ChangeDetectorRef }
  ];
};
MyPlans = __decorate([
  Component({
    selector: "app-my-plans",
    standalone: true,
    imports: [CommonModule],
    template: my_plans_default,
    styles: [my_plans_default2]
  })
], MyPlans);

// src/app/component/client/my-plans/my-plans.spec.ts
init_PlanAssignmentService();
init_router();
init_esm();
init_common();
describe("MyPlans Component", () => {
  let component;
  let fixture;
  let mockPlanService;
  let mockRouter;
  const mockPlansResponse = {
    $values: [
      {
        planAssignmentId: "1",
        workoutPlanID: "w1",
        workoutPlanTitle: "Upper Body Gain"
      },
      {
        planAssignmentId: "2",
        dietPlanId: "d1",
        dietPlanTitle: "Keto Diet"
      },
      {
        planAssignmentId: "3",
        workoutPlanID: "w2",
        workoutPlanTitle: "Not Assigned"
      }
    ]
  };
  beforeEach(waitForAsync(() => {
    mockPlanService = {
      getPlans: jasmine.createSpy().and.returnValue(of(mockPlansResponse)),
      AcceptPlan: jasmine.createSpy().and.returnValue(of({ message: "Accepted" }))
    };
    mockRouter = {
      navigate: jasmine.createSpy("navigate")
    };
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        { provide: PlanAssignmentService, useValue: mockPlanService },
        { provide: Router, useValue: mockRouter }
      ]
    }).overrideComponent(MyPlans, {
      set: { imports: [CommonModule] }
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
  it("should handle fetch plan error gracefully", () => {
    mockPlanService.getPlans.and.returnValue(throwError(() => "Error"));
    component.fetchPlanAssignment();
    expect(component.allPlans().length).toBe(0);
    expect(component.workoutPlans().length).toBe(0);
    expect(component.dietPlans().length).toBe(0);
  });
  it("should accept workout plan and store it in sessionStorage", () => {
    spyOn(sessionStorage, "setItem");
    const workoutPlan = {
      planAssignmentId: "1",
      workoutPlanID: "w1",
      workoutPlanTitle: "Push Workout"
    };
    component.acceptPlan(workoutPlan, 1);
    expect(mockPlanService.AcceptPlan).toHaveBeenCalled();
    expect(sessionStorage.setItem).toHaveBeenCalledWith("WorkoutPlanAssignment", JSON.stringify({
      PlanAssignmentID: "1",
      WorkoutPlanID: "w1"
    }));
  });
  it("should accept diet plan and store it in sessionStorage", () => {
    spyOn(sessionStorage, "setItem");
    const dietPlan = {
      planAssignmentId: "2",
      dietPlanId: "d1",
      dietPlanTitle: "Keto Diet"
    };
    component.acceptPlan(dietPlan, 2);
    expect(mockPlanService.AcceptPlan).toHaveBeenCalled();
    expect(sessionStorage.setItem).toHaveBeenCalledWith("DietPlanAssignment", JSON.stringify({
      DietPlanAssignmentID: "2",
      DietPlanID: "d1"
    }));
  });
  it("should navigate to workout plan details", () => {
    const details = {
      workoutPlanID: "w1",
      planAssignmentId: "p1"
    };
    component.showWorkoutDetails(details);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      "/client-workout-plan",
      "w1",
      "p1"
    ]);
  });
  it("should navigate to diet plan details", () => {
    const details = {
      dietPlanId: "d1",
      planAssignmentId: "p1"
    };
    component.showDietDetails(details);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      "/client-diet-plan",
      "d1",
      "p1"
    ]);
  });
});
//# sourceMappingURL=spec-app-component-client-my-plans-my-plans.spec.js.map
