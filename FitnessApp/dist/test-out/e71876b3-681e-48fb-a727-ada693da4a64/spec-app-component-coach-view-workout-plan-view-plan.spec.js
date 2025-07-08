import {
  WorkoutPlanService,
  init_WorkoutPlanService
} from "./chunk-5RZSRUX6.js";
import {
  FormsModule,
  init_forms
} from "./chunk-GOPKSOE6.js";
import {
  Router,
  init_router
} from "./chunk-6YDZZKHI.js";
import "./chunk-VDQ734U5.js";
import "./chunk-35V5GIMJ.js";
import {
  CommonModule,
  init_common
} from "./chunk-UDVGPYPD.js";
import {
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
} from "./chunk-I33ILCKL.js";

// angular:jit:template:src/app/component/coach/view-workout-plan/view-plan.html
var view_plan_default;
var init_view_plan = __esm({
  "angular:jit:template:src/app/component/coach/view-workout-plan/view-plan.html"() {
    view_plan_default = '<div class="container py-4" style="max-height: calc(95vh); overflow-y: auto">\n  <h2 class="mb-4">View Plans</h2>\n\n  <input\n    type="text"\n    class="form-control mb-4"\n    placeholder="Search workout or diet plans..."\n    [(ngModel)]="searchTerm"\n  />\n\n  <div class="row">\n    <div class="col-md-6 mb-4" *ngFor="let plan of filteredPlans()">\n      <div class="card h-100 shadow-sm">\n        <div class="card-body">\n          <h5 class="card-title">{{ plan.title }}</h5>\n          <p class="card-text text-muted">{{ plan.description }}</p>\n          <p><strong>Duration:</strong> {{ plan.durationInWeeks }} weeks</p>\n\n          <div *ngIf="plan.exercises?.$values?.length > 0">\n            <h6>Exercises:</h6>\n            <ul class="list-group list-group-flush small">\n              <li\n                class="list-group-item"\n                *ngFor="let ex of plan.exercises.$values.slice(0, 3)"\n              >\n                {{ ex.name }} - {{ ex.sets }}x{{ ex.reps }} ({{ ex.restSeconds\n                }}s rest) {{ex.caloriesBurnt }} Calories\n              </li>\n              <li\n                class="list-group-item text-muted"\n                *ngIf="plan.exercises.$values.length > 3"\n              >\n                +{{ plan.exercises.$values.length - 3 }} more exercises\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class="card-footer bg-transparent border-top-0">\n          <button\n            class="btn btn-outline-primary w-100 btn-sm"\n            (click)="showDetails(plan); $event.stopPropagation()"\n          >\n            View Full Details\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/coach/view-workout-plan/view-plan.css
var view_plan_default2;
var init_view_plan2 = __esm({
  "angular:jit:style:src/app/component/coach/view-workout-plan/view-plan.css"() {
    view_plan_default2 = "/* src/app/component/coach/view-workout-plan/view-plan.css */\n/*# sourceMappingURL=view-plan.css.map */\n";
  }
});

// src/app/component/coach/view-workout-plan/view-plan.ts
var ViewPlan;
var init_view_plan3 = __esm({
  "src/app/component/coach/view-workout-plan/view-plan.ts"() {
    "use strict";
    init_tslib_es6();
    init_view_plan();
    init_view_plan2();
    init_common();
    init_core();
    init_forms();
    init_WorkoutPlanService();
    init_router();
    ViewPlan = class ViewPlan2 {
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
  }
});

// src/app/component/coach/view-workout-plan/view-plan.spec.ts
var require_view_plan_spec = __commonJS({
  "src/app/component/coach/view-workout-plan/view-plan.spec.ts"(exports) {
    init_testing();
    init_view_plan3();
    describe("ViewPlan", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ViewPlan]
        }).compileComponents();
        fixture = TestBed.createComponent(ViewPlan);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_view_plan_spec();
//# sourceMappingURL=spec-app-component-coach-view-workout-plan-view-plan.spec.js.map
