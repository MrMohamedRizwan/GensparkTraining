import {
  DietPlanService,
  init_DietPlanService
} from "./chunk-Y5ER5FFN.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-JRE6BCIQ.js";
import "./chunk-JORF2EMQ.js";
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

// src/app/component/coach/view-diet-plan/view-diet-plan.spec.ts
init_testing();

// src/app/component/coach/view-diet-plan/view-diet-plan.ts
init_tslib_es6();

// angular:jit:template:src/app/component/coach/view-diet-plan/view-diet-plan.html
var view_diet_plan_default = '<div class="container py-4" style="max-height: calc(95vh); overflow-y: auto">\n  <h2 class="mb-4">View Diet Plans</h2>\n\n  <input\n    type="text"\n    class="form-control mb-4"\n    placeholder="Search diet plans..."\n    [(ngModel)]="searchTerm"\n  />\n\n  <div class="row">\n    <div class="col-md-6 mb-4" *ngFor="let plan of filteredPlans()">\n      <div class="card h-100 shadow-sm">\n        <div class="card-body">\n          <h5 class="card-title">{{ plan.title }}</h5>\n          <p class="card-text text-muted">{{ plan.description }}</p>\n          <p><strong>Duration:</strong> {{ plan.durationInWeeks }} weeks</p>\n\n          <div *ngIf="plan.mealTypes?.$values?.length > 0">\n            <h6>Meals:</h6>\n            <ul class="list-group list-group-flush small">\n              <li\n                class="list-group-item d-flex flex-column align-items-start"\n                *ngFor="let meal of plan.mealTypes.$values.slice(0, 3)"\n              >\n                <div class="fw-semibold">\n                  {{ meal.mealName }}\n                  <span class="badge bg-primary ms-2">{{ meal.mealType }}</span>\n                </div>\n                <div class="small text-muted mt-1">\n                  <span class="me-3"\n                    ><strong>Protein:</strong> {{ meal.proteinGrams }}g</span\n                  >\n                  <span class="me-3"\n                    ><strong>Carbs:</strong> {{ meal.carbsGrams }}g</span\n                  >\n                  <span class="me-3"\n                    ><strong>Fats:</strong> {{ meal.fatGrams }}g</span\n                  >\n                  <span><strong>Calories:</strong> {{ meal.calories }}</span>\n                </div>\n              </li>\n              <li\n                class="list-group-item text-muted"\n                *ngIf="plan.mealTypes.$values.length > 3"\n              >\n                +{{ plan.mealTypes.$values.length - 3 }} more meals\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class="card-footer bg-transparent border-top-0">\n          <button\n            class="btn btn-outline-success w-100 btn-sm"\n            (click)="showDetails(plan); $event.stopPropagation()"\n          >\n            View Full Details\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';

// angular:jit:style:src/app/component/coach/view-diet-plan/view-diet-plan.css
var view_diet_plan_default2 = "/* src/app/component/coach/view-diet-plan/view-diet-plan.css */\n/*# sourceMappingURL=view-diet-plan.css.map */\n";

// src/app/component/coach/view-diet-plan/view-diet-plan.ts
init_core();
init_DietPlanService();
init_router();
init_common();
init_forms();
var ViewDietPlan = class ViewDietPlan2 {
  dietService;
  router;
  constructor(dietService, router) {
    this.dietService = dietService;
    this.router = router;
  }
  plans = signal(null);
  searchTerm = "";
  ngOnInit() {
    this.dietService.GetAllDiets().subscribe((res) => {
      this.plans.set(res.items.$values);
      console.log(this.plans());
    });
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
  showDetails(plan) {
    this.router.navigate(["/diet-details", plan.id]);
  }
  static ctorParameters = () => [
    { type: DietPlanService },
    { type: Router }
  ];
};
ViewDietPlan = __decorate([
  Component({
    selector: "app-view-diet-plan",
    imports: [CommonModule, FormsModule],
    template: view_diet_plan_default,
    styles: [view_diet_plan_default2]
  })
], ViewDietPlan);

// src/app/component/coach/view-diet-plan/view-diet-plan.spec.ts
init_router();
init_esm();
init_DietPlanService();
init_testing2();
describe("ViewDietPlan", () => {
  let component;
  let fixture;
  let mockDietPlanService;
  let router;
  const mockPlans = {
    items: {
      $values: [
        {
          id: "1",
          title: "Keto Plan",
          description: "Low carb, high fat"
        },
        {
          id: "2",
          title: "Vegan Plan",
          description: "Plant-based nutrition"
        }
      ]
    }
  };
  beforeEach(waitForAsync(() => {
    mockDietPlanService = jasmine.createSpyObj("DietPlanService", [
      "GetAllDiets"
    ]);
    TestBed.configureTestingModule({
      imports: [ViewDietPlan, RouterTestingModule],
      providers: [{ provide: DietPlanService, useValue: mockDietPlanService }]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDietPlan);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
  it("should load diet plans on init", () => {
    mockDietPlanService.GetAllDiets.and.returnValue(of(mockPlans));
    fixture.detectChanges();
    expect(component.plans()).toEqual(mockPlans.items.$values);
    expect(mockDietPlanService.GetAllDiets).toHaveBeenCalled();
  });
  it("should filter plans based on searchTerm", () => {
    component.plans.set(mockPlans.items.$values);
    component.searchTerm = "vegan";
    const result = component.filteredPlans();
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Vegan Plan");
  });
  it("should navigate to diet details when showDetails is called", () => {
    const navigateSpy = spyOn(router, "navigate");
    const testPlan = { id: "123" };
    component.showDetails(testPlan);
    expect(navigateSpy).toHaveBeenCalledWith(["/diet-details", "123"]);
  });
});
//# sourceMappingURL=spec-app-component-coach-view-diet-plan-view-diet-plan.spec.js.map
