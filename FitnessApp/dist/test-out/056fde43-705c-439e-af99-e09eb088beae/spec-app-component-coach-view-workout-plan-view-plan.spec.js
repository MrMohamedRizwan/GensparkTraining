import {
  WorkoutPlanService,
  init_WorkoutPlanService
} from "./chunk-BZGINZVW.js";
import {
  FormsModule,
  init_forms
} from "./chunk-4BOFPGSM.js";
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
  Component,
  __decorate,
  init_core,
  init_esm,
  init_tslib_es6,
  of,
  signal
} from "./chunk-X6QY723D.js";

// src/app/component/coach/view-workout-plan/view-plan.spec.ts
init_testing();

// src/app/component/coach/view-workout-plan/view-plan.ts
init_tslib_es6();

// angular:jit:template:src/app/component/coach/view-workout-plan/view-plan.html
var view_plan_default = '<div class="container py-4" style="max-height: calc(95vh); overflow-y: auto">\n  <h2 class="mb-4">View Plans</h2>\n\n  <input\n    type="text"\n    class="form-control mb-4"\n    placeholder="Search workout or diet plans..."\n    [(ngModel)]="searchTerm"\n  />\n\n  <div class="row">\n    <div class="col-md-6 mb-4" *ngFor="let plan of filteredPlans()">\n      <div class="card h-100 shadow-sm">\n        <div class="card-body">\n          <h5 class="card-title">{{ plan.title }}</h5>\n          <p class="card-text text-muted">{{ plan.description }}</p>\n          <p><strong>Duration:</strong> {{ plan.durationInWeeks }} weeks</p>\n\n          <div *ngIf="plan.exercises?.$values?.length > 0">\n            <h6>Exercises:</h6>\n            <ul class="list-group list-group-flush small">\n              <li\n                class="list-group-item"\n                *ngFor="let ex of plan.exercises.$values.slice(0, 3)"\n              >\n                {{ ex.name }} - {{ ex.sets }}x{{ ex.reps }} ({{ ex.restSeconds\n                }}s rest) {{ex.caloriesBurnt }} Calories\n              </li>\n              <li\n                class="list-group-item text-muted"\n                *ngIf="plan.exercises.$values.length > 3"\n              >\n                +{{ plan.exercises.$values.length - 3 }} more exercises\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class="card-footer bg-transparent border-top-0">\n          <button\n            class="btn btn-outline-primary w-100 btn-sm"\n            (click)="showDetails(plan); $event.stopPropagation()"\n          >\n            View Full Details\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';

// angular:jit:style:src/app/component/coach/view-workout-plan/view-plan.css
var view_plan_default2 = "/* src/app/component/coach/view-workout-plan/view-plan.css */\n/*# sourceMappingURL=view-plan.css.map */\n";

// src/app/component/coach/view-workout-plan/view-plan.ts
init_common();
init_core();
init_forms();
init_WorkoutPlanService();
init_router();
var ViewPlan = class ViewPlan2 {
  workoutService;
  router;
  constructor(workoutService, router) {
    this.workoutService = workoutService;
    this.router = router;
  }
  plans = signal(null);
  searchTerm = "";
  ngOnInit() {
    var x = this.workoutService.GetAllWorkouts().subscribe((res) => {
      this.plans.set(res.items.$values);
      console.log(this.plans());
    });
    console.log(x);
  }
  showDetails(details) {
    this.router.navigate(["/workout-details", details.id]);
  }
  filteredPlans() {
    const allPlans = this.plans();
    if (!allPlans)
      return [];
    if (!this.searchTerm.trim())
      return allPlans;
    const term = this.searchTerm.toLowerCase();
    return allPlans.filter((plan) => plan.title?.toLowerCase().includes(term) || plan.description?.toLowerCase().includes(term));
  }
  static ctorParameters = () => [
    { type: WorkoutPlanService },
    { type: Router }
  ];
};
ViewPlan = __decorate([
  Component({
    selector: "app-view-plan",
    imports: [CommonModule, FormsModule],
    template: view_plan_default,
    styles: [view_plan_default2]
  })
], ViewPlan);

// src/app/component/coach/view-workout-plan/view-plan.spec.ts
init_WorkoutPlanService();
init_router();
init_esm();
init_common();
init_forms();
describe("ViewPlan Component", () => {
  let component;
  let fixture;
  let mockWorkoutService;
  let mockRouter;
  const mockPlansResponse = {
    items: {
      $values: [
        {
          id: "fdcf70ba-8475-4606-a798-2b29e092b933",
          title: "Upper Body Muscle Gain Plan",
          description: "A 4-week program focusing on overall strength and conditioning for beginners."
        },
        {
          id: "09b7968e-7b4c-4e12-8688-9280b4469671",
          title: "Full Body Weight Loss Plan",
          description: "Weight loss and toning program"
        }
      ]
    }
  };
  beforeEach(waitForAsync(() => {
    mockWorkoutService = {
      GetAllWorkouts: jasmine.createSpy("GetAllWorkouts").and.returnValue(of(mockPlansResponse))
    };
    mockRouter = {
      navigate: jasmine.createSpy("navigate")
    };
    TestBed.configureTestingModule({
      imports: [ViewPlan, CommonModule, FormsModule],
      providers: [
        { provide: WorkoutPlanService, useValue: mockWorkoutService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
  it("should fetch plans on init and set to signal", () => {
    const plans = component.plans();
    expect(plans.length).toBe(2);
    expect(plans[0].title).toContain("Upper Body Muscle Gain Plan");
  });
  it("should filter plans by search term", () => {
    component.searchTerm = "weight loss";
    const filtered = component.filteredPlans();
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe("Full Body Weight Loss Plan");
  });
  it("should navigate to workout details page", () => {
    const dummyPlan = { id: "123" };
    component.showDetails(dummyPlan);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      "/workout-details",
      "123"
    ]);
  });
  it("should return all plans if searchTerm is empty", () => {
    component.searchTerm = "";
    const filtered = component.filteredPlans();
    expect(filtered.length).toBe(2);
  });
});
//# sourceMappingURL=spec-app-component-coach-view-workout-plan-view-plan.spec.js.map
