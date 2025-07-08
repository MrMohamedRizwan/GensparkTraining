import {
  DietPlanService,
  init_DietPlanService
} from "./chunk-Y5ER5FFN.js";
import {
  FormsModule,
  init_forms
} from "./chunk-4BOFPGSM.js";
import {
  ActivatedRoute,
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
  Component,
  __async,
  __commonJS,
  __decorate,
  __esm,
  __spreadValues,
  init_core,
  init_esm,
  init_tslib_es6,
  of,
  signal
} from "./chunk-X6QY723D.js";

// angular:jit:template:src/app/component/client/diet-plan/diet-plan.html
var diet_plan_default;
var init_diet_plan = __esm({
  "angular:jit:template:src/app/component/client/diet-plan/diet-plan.html"() {
    diet_plan_default = `<div class="container my-5">
  <div *ngIf="DietPlan() as plan; else loading">
    <div class="mb-4">
      <h2 class="fw-bold">{{ plan.title }}</h2>
      <p class="text-muted">{{ plan.description }}</p>
      <div class="text-muted">
        <!-- <strong>Duration:</strong> {{ plan.durationInWeeks }} weeks -->
      </div>
    </div>

    <div class="card shadow">
      <div class="card-header bg-success text-white">
        <h5 class="mb-0">Today's Meals</h5>
      </div>
      <div class="card-body">
        <div
          *ngFor="let meal of plan.mealTypes?.$values; let i = index"
          class="mb-3 border-bottom pb-3"
        >
          <div class="d-flex align-items-start">
            <input
              type="checkbox"
              class="form-check-input mt-1 me-3"
              [checked]="isCompleted(meal.id)"
              (change)="toggleMeal(meal.id)"
              id="meal-{{ i }}"
            />
            <div>
              <label
                [for]="'meal-' + i"
                class="form-label fw-semibold mb-1"
                [class.text-decoration-line-through]="isCompleted(meal.id)"
              >
                {{ meal.mealType }} - {{ meal.mealName }}
              </label>
              <div class="text-muted small">
                Calories: {{ meal.calories }} kcal \u2022 Protein: {{
                meal.proteinGrams }}g \u2022 Carbs: {{ meal.carbsGrams }}g \u2022 Fats: {{
                meal.fatGrams }}g
              </div>
            </div>
          </div>
        </div>

        <!-- Existing Meals Display -->
        <!-- ... (previous content remains unchanged) -->

        <!-- Add New Meal Form -->
        <!-- <div class="card mt-4 shadow-sm">
          <div class="card-header bg-light">
            <strong>Add a Meal</strong>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Meal Type (e.g., Breakfast)"
                />
              </div>
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Meal Name"
                />
              </div>
              <div class="col-md-4">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Approx Calories"
                />
              </div>
            </div>
            <button class="btn btn-outline-primary mt-3" (click)="addNewMeal()">
              Add Meal
            </button>
          </div>
        </div> -->

        <button
          class="btn btn-success w-100 mt-3"
          [disabled]="completedMeals().size === 0"
          (click)="submitDiet()"
        >
          Submit Diet
        </button>
      </div>
    </div>
  </div>
  <!-- Add New Meal Button -->
  <div class="text-end mt-4">
    <button
      class="btn btn-outline-secondary btn-sm"
      (click)="showAddForm = !showAddForm"
    >
      {{ showAddForm ? 'Cancel' : '\u2795 Add Meal' }}
    </button>
  </div>

  <!-- Add Meal Form -->
  <div *ngIf="showAddForm" class="card mt-3 shadow-sm">
    <div class="card-header bg-light">
      <strong>Add a Meal</strong>
    </div>
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label fw-semibold" for="newMealType"
            >Meal Type</label
          >
          <select
            class="form-select"
            [(ngModel)]="newMeal.mealType"
            name="newMealType"
            id="newMealType"
          >
            <option value="" disabled selected>Select Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label fw-semibold" for="newMealName"
            >Meal Name</label
          >
          <input
            type="text"
            class="form-control"
            placeholder="Meal Name"
            [(ngModel)]="newMeal.mealName"
            name="newMealName"
            id="newMealName"
          />
          <div
            *ngIf="newMeal.mealName && newMeal.mealName.length > 0 && newMeal.mealName.length < 4"
            class="text-danger small mt-1"
          >
            Meal name must be at least 4 characters.
          </div>
        </div>
        <div class="col-md-4">
          <label class="form-label fw-semibold" for="newMealCalories"
            >Approx Calories</label
          >
          <input
            type="number"
            class="form-control"
            placeholder="Approx Calories"
            [(ngModel)]="newMeal.calories"
            name="newMealCalories"
            id="newMealCalories"
          />
        </div>
      </div>
      <button class="btn btn-outline-success mt-3" (click)="addNewMeal()">
        Add Meal
      </button>
    </div>
  </div>

  <ng-template #loading>
    <div class="alert alert-info">Loading your diet plan...</div>
  </ng-template>
</div>
`;
  }
});

// angular:jit:style:src/app/component/client/diet-plan/diet-plan.css
var diet_plan_default2;
var init_diet_plan2 = __esm({
  "angular:jit:style:src/app/component/client/diet-plan/diet-plan.css"() {
    diet_plan_default2 = "/* src/app/component/client/diet-plan/diet-plan.css */\n/*# sourceMappingURL=diet-plan.css.map */\n";
  }
});

// src/app/component/client/diet-plan/diet-plan.ts
var DietPlan;
var init_diet_plan3 = __esm({
  "src/app/component/client/diet-plan/diet-plan.ts"() {
    "use strict";
    init_tslib_es6();
    init_diet_plan();
    init_diet_plan2();
    init_core();
    init_DietPlanService();
    init_router();
    init_common();
    init_forms();
    DietPlan = class DietPlan2 {
      route;
      dietPlanService;
      router;
      planAssignmentId;
      DietPlan = signal(null);
      completedMeals = signal(/* @__PURE__ */ new Set());
      showAddForm = false;
      newMeal = {
        mealType: "",
        mealName: "",
        calories: 0
      };
      constructor(route, dietPlanService, router) {
        this.route = route;
        this.dietPlanService = dietPlanService;
        this.router = router;
      }
      ngOnInit() {
        const dietPlanId = this.route.snapshot.paramMap.get("dietPlanId");
        this.planAssignmentId = this.route.snapshot.paramMap.get("planAssignemnetId");
        this.getDietPlanDetails(dietPlanId);
      }
      // addNewMeal(): void {
      //   const plan = this.DietPlan();
      //   const meal = {
      //     id: crypto.randomUUID(),
      //     ...this.newMeal,
      //     proteinGrams: 0,
      //     carbsGrams: 0,
      //     fatGrams: 0,
      //   };
      //   if (!plan.mealTypes?.$values) {
      //     plan.mealTypes = { $values: [] };
      //   }
      //   plan.mealTypes.$values.push(meal);
      //   this.DietPlan.set({ ...plan });
      //   this.newMeal = { mealType: '', mealName: '', calories: 0 };
      //   this.showAddForm.set(false);
      // }
      deleteMeal(id) {
        const plan = this.DietPlan();
        plan.mealTypes.$values = plan.mealTypes.$values.filter((m) => m.id !== id);
        this.DietPlan.set(__spreadValues({}, plan));
        const updated = new Set(this.completedMeals());
        updated.delete(id);
        this.completedMeals.set(updated);
      }
      getDietPlanDetails(dietPlanId) {
        this.dietPlanService.GetParticularDiet(dietPlanId).subscribe({
          next: (res) => this.DietPlan.set(res),
          error: (err) => console.error(err)
        });
      }
      toggleMeal(mealId) {
        const updated = new Set(this.completedMeals());
        updated.has(mealId) ? updated.delete(mealId) : updated.add(mealId);
        this.completedMeals.set(updated);
      }
      isCompleted(mealId) {
        return this.completedMeals().has(mealId);
      }
      submitDiet() {
        const plan = this.DietPlan();
        const completedSet = this.completedMeals();
        const meals = plan?.mealTypes?.$values || [];
        const completedMeals = meals.filter((meal) => completedSet.has(meal.id));
        const totalCalories = completedMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
        const completedData = completedMeals.map((meal) => ({
          mealId: meal.id,
          name: meal.name,
          foodItems: meal.foodItems,
          calories: meal.calories,
          timeOfDay: meal.timeOfDay
        }));
        const payload = {
          PlanAssignmentId: this.planAssignmentId,
          completedOn: (/* @__PURE__ */ new Date()).toISOString(),
          totalMeals: completedMeals.length,
          caloriesTaken: totalCalories,
          ExercisesJSON: JSON.stringify([]),
          DietMealJSON: JSON.stringify(completedData)
        };
        console.log("Diet Submission Payload:", payload);
        this.dietPlanService.SubmitDietByClient(payload).subscribe({
          next: (res) => {
            console.log("Submitted successfully", res);
            this.router.navigate(["client-dashboard"]);
          },
          error: (err) => console.error(err)
        });
      }
      addNewMeal() {
        const { mealType, mealName, calories } = this.newMeal;
        if (!mealType.trim() || !mealName.trim()) {
          alert("\u274C Please fill all fields correctly.");
          return;
        }
        const plan = this.DietPlan();
        const mealCalories = calories && calories > 0 ? calories : 500;
        const meal = {
          id: crypto.randomUUID(),
          mealType,
          mealName,
          calories: mealCalories,
          proteinGrams: 10,
          carbsGrams: 15,
          fatGrams: 10
        };
        if (!plan.mealTypes?.$values) {
          plan.mealTypes = { $values: [] };
        }
        plan.mealTypes.$values.push(meal);
        this.DietPlan.set(__spreadValues({}, plan));
        this.newMeal = { mealType: "", mealName: "", calories: 0 };
        this.showAddForm = false;
      }
      static ctorParameters = () => [
        { type: ActivatedRoute },
        { type: DietPlanService },
        { type: Router }
      ];
    };
    DietPlan = __decorate([
      Component({
        selector: "app-diet-plan",
        imports: [CommonModule, FormsModule],
        template: diet_plan_default,
        styles: [diet_plan_default2]
      })
    ], DietPlan);
  }
});

// src/app/component/client/diet-plan/diet-plan.spec.ts
var require_diet_plan_spec = __commonJS({
  "src/app/component/client/diet-plan/diet-plan.spec.ts"(exports) {
    init_testing();
    init_diet_plan3();
    init_router();
    init_DietPlanService();
    init_esm();
    init_forms();
    init_common();
    describe("DietPlan Component", () => {
      let component;
      let fixture;
      const mockDietPlanService = {
        GetParticularDiet: jasmine.createSpy("GetParticularDiet"),
        SubmitDietByClient: jasmine.createSpy("SubmitDietByClient")
      };
      const mockActivatedRoute = {
        snapshot: {
          paramMap: {
            get: (key) => {
              if (key === "dietPlanId")
                return "diet123";
              if (key === "planAssignemnetId")
                return "assign456";
              return null;
            }
          }
        }
      };
      const mockRouter = {
        navigate: jasmine.createSpy("navigate")
      };
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [DietPlan, CommonModule, FormsModule],
          providers: [
            { provide: DietPlanService, useValue: mockDietPlanService },
            { provide: ActivatedRoute, useValue: mockActivatedRoute },
            { provide: Router, useValue: mockRouter }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(DietPlan);
        component = fixture.componentInstance;
      }));
      beforeEach(() => {
        mockDietPlanService.GetParticularDiet.calls.reset();
        mockDietPlanService.SubmitDietByClient.calls.reset();
      });
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
      it("should initialize and load diet plan on ngOnInit", fakeAsync(() => {
        const dummyPlan = { id: "diet123", mealTypes: { $values: [] } };
        mockDietPlanService.GetParticularDiet.and.returnValue(of(dummyPlan));
        fixture.detectChanges();
        tick();
        expect(component.planAssignmentId).toBe("assign456");
        expect(mockDietPlanService.GetParticularDiet).toHaveBeenCalledWith("diet123");
        expect(component.DietPlan()).toEqual(dummyPlan);
      }));
      it("should add a new meal to the plan", () => {
        const existingPlan = {
          mealTypes: { $values: [] }
        };
        component.DietPlan.set(existingPlan);
        component.newMeal = {
          mealType: "Lunch",
          mealName: "Chicken Bowl",
          calories: 400
        };
        component.addNewMeal();
        expect(component.DietPlan().mealTypes.$values.length).toBe(1);
        expect(component.newMeal.mealName).toBe("");
        expect(component.showAddForm).toBeFalse();
      });
      it("should not add meal if required fields are missing", () => {
        spyOn(window, "alert");
        component.newMeal = {
          mealType: "",
          mealName: "Rice",
          calories: 200
        };
        component.addNewMeal();
        expect(window.alert).toHaveBeenCalledWith("\u274C Please fill all fields correctly.");
      });
      it("should delete a meal by ID", () => {
        const meal1 = { id: "m1", name: "Breakfast" };
        const meal2 = { id: "m2", name: "Dinner" };
        component.DietPlan.set({
          mealTypes: { $values: [meal1, meal2] }
        });
        component.completedMeals.set(/* @__PURE__ */ new Set(["m1", "m2"]));
        component.deleteMeal("m1");
        expect(component.DietPlan().mealTypes.$values.length).toBe(1);
        expect(component.DietPlan().mealTypes.$values[0].id).toBe("m2");
        expect(component.completedMeals().has("m1")).toBeFalse();
      });
      it("should toggle meal completion state", () => {
        component.completedMeals.set(/* @__PURE__ */ new Set());
        component.toggleMeal("m1");
        expect(component.completedMeals().has("m1")).toBeTrue();
        component.toggleMeal("m1");
        expect(component.completedMeals().has("m1")).toBeFalse();
      });
      it("should return true for isCompleted if mealId is in set", () => {
        component.completedMeals.set(/* @__PURE__ */ new Set(["m2"]));
        expect(component.isCompleted("m2")).toBeTrue();
      });
      it("should submit diet and navigate on success", fakeAsync(() => {
        const meal1 = {
          id: "m1",
          calories: 300,
          name: "A",
          foodItems: [],
          timeOfDay: "Morning"
        };
        const meal2 = {
          id: "m2",
          calories: 200,
          name: "B",
          foodItems: [],
          timeOfDay: "Evening"
        };
        component.DietPlan.set({ mealTypes: { $values: [meal1, meal2] } });
        component.completedMeals.set(/* @__PURE__ */ new Set(["m1"]));
        mockDietPlanService.SubmitDietByClient.and.returnValue(of({ status: "ok" }));
        component.planAssignmentId = "assign456";
        component.submitDiet();
        tick();
        expect(mockDietPlanService.SubmitDietByClient).toHaveBeenCalled();
        const payload = mockDietPlanService.SubmitDietByClient.calls.mostRecent().args[0];
        expect(payload.totalMeals).toBe(1);
        expect(payload.caloriesTaken).toBe(300);
        expect(mockRouter.navigate).toHaveBeenCalledWith(["client-dashboard"]);
      }));
    });
  }
});
export default require_diet_plan_spec();
//# sourceMappingURL=spec-app-component-client-diet-plan-diet-plan.spec.js.map
