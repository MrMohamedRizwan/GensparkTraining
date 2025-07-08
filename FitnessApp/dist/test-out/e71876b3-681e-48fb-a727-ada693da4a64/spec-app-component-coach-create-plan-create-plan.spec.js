import {
  WorkoutPlanService,
  init_WorkoutPlanService
} from "./chunk-5RZSRUX6.js";
import {
  DietPlanService,
  init_DietPlanService
} from "./chunk-5V6DH5BY.js";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  init_forms
} from "./chunk-GOPKSOE6.js";
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
  init_tslib_es6
} from "./chunk-I33ILCKL.js";

// angular:jit:template:src/app/component/coach/create-plan/create-plan.html
var create_plan_default;
var init_create_plan = __esm({
  "angular:jit:template:src/app/component/coach/create-plan/create-plan.html"() {
    create_plan_default = `<div class="container mt-4">
  <h2 class="mb-4">Create New Plan</h2>

  <form [formGroup]="planForm" (ngSubmit)="onSubmit()">
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="planType" class="form-label">Plan Type</label>
        <select class="form-select" formControlName="planType">
          <option value="workout">Workout</option>
          <option value="diet">Diet</option>
        </select>
      </div>
      <div class="col-md-6">
        <label for="durationInWeeks" class="form-label">Duration (weeks)</label>
        <input
          type="number"
          class="form-control"
          formControlName="durationInWeeks"
          placeholder="e.g., 4"
          required
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="planName" class="form-label">Plan Name</label>
      <input
        type="text"
        class="form-control"
        formControlName="planName"
        required
        placeholder="Enter plan name"
      />
    </div>

    <div class="mb-4">
      <label for="description" class="form-label">Description</label>
      <textarea
        rows="3"
        class="form-control"
        formControlName="description"
        placeholder="Plan goals and overview"
        required
      ></textarea>
    </div>

    <!-- Workout Plan: Exercises -->
    <div
      *ngIf="planForm.value.planType === 'workout'"
      formArrayName="exercises"
    >
      <h5>Exercises</h5>
      <div
        *ngFor="let exercise of exercises.controls; let i = index"
        [formGroupName]="i"
        class="card p-3 mb-3"
      >
        <div class="row g-2 align-items-end">
          <div class="col-md-4">
            <label class="form-label">Exercise Name</label>
            <input
              type="text"
              class="form-control"
              formControlName="name"
              placeholder="e.g., Push-ups"
              required
            />
          </div>
          <div class="col-md-2">
            <label class="form-label">Sets</label>
            <input type="text" class="form-control" formControlName="sets" />
          </div>
          <div class="col-md-2">
            <label class="form-label">Reps</label>
            <input type="text" class="form-control" formControlName="reps" />
          </div>
          <div class="col-md-2">
            <label class="form-label">Rest Seconds (min)</label>
            <input
              type="number"
              class="form-control"
              formControlName="restSeconds"
            />
          </div>
          <div class="col-md-2">
            <label class="form-label">Calories Burnt</label>
            <input
              type="number"
              class="form-control"
              formControlName="caloriesBurnt"
            />
          </div>
          <div class="col-md-12">
            <label class="form-label">Notes</label>
            <input
              type="text"
              class="form-control"
              formControlName="notes"
              placeholder="Optional notes for this exercise"
            />
          </div>
        </div>
        <div class="text-end mt-2">
          <button
            class="btn btn-outline-danger btn-sm"
            type="button"
            (click)="removeExercise(i)"
            *ngIf="exercises.length > 1"
          >
            Remove
          </button>
        </div>
      </div>
      <button
        class="btn btn-primary btn-sm mb-4"
        type="button"
        (click)="addExercise()"
      >
        Add Exercise
      </button>
    </div>

    <!-- Diet Plan: Meals -->
    <!-- Meals Section (Modified to work like Exercises) -->
    <div *ngIf="planForm.value.planType === 'diet'" formArrayName="meals">
      <h5>Meals</h5>
      <div
        *ngFor="let meal of meals.controls; let i = index"
        [formGroupName]="i"
        class="card p-3 mb-3"
      >
        <div class="row g-3 mb-2">
          <div class="col-md-12">
            <label class="form-label">Meal Name</label>
            <input
              type="text"
              class="form-control"
              formControlName="mealName"
              placeholder="e.g., Grilled Chicken Salad"
              required
            />
          </div>
        </div>
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Meal Type</label>
            <select class="form-select" formControlName="mealType" required>
              <option value="" disabled>Select type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Calories</label>
            <input
              type="text"
              class="form-control"
              formControlName="calories"
              placeholder="e.g., 10"
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Protein (g)</label>
            <input
              type="text"
              class="form-control"
              formControlName="proteinGrams"
              placeholder="e.g., 10"
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Carbs (g)</label>
            <input
              type="text"
              class="form-control"
              formControlName="carbsGrams"
              placeholder="e.g., 10"
            />
          </div>
          <div class="col-md-3">
            <label class="form-label">Fats (g)</label>
            <input
              type="text"
              class="form-control"
              formControlName="fatGrams"
              placeholder="e.g., 10"
            />
          </div>
        </div>
        <div class="text-end mt-2">
          <button
            class="btn btn-outline-danger btn-sm"
            type="button"
            (click)="removeMeal(i)"
            *ngIf="meals.length > 1"
          >
            Remove
          </button>
        </div>
      </div>
      <button
        class="btn btn-primary btn-sm mb-4"
        type="button"
        (click)="addMeal()"
      >
        Add Meal
      </button>
    </div>

    <div class="d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-secondary">
        Save as Draft
      </button>
      <button type="submit" class="btn btn-success">Create Plan</button>
    </div>
  </form>
</div>
`;
  }
});

// angular:jit:style:src/app/component/coach/create-plan/create-plan.css
var create_plan_default2;
var init_create_plan2 = __esm({
  "angular:jit:style:src/app/component/coach/create-plan/create-plan.css"() {
    create_plan_default2 = "/* src/app/component/coach/create-plan/create-plan.css */\n/*# sourceMappingURL=create-plan.css.map */\n";
  }
});

// src/app/component/coach/create-plan/create-plan.ts
var CreatePlan;
var init_create_plan3 = __esm({
  "src/app/component/coach/create-plan/create-plan.ts"() {
    "use strict";
    init_tslib_es6();
    init_create_plan();
    init_create_plan2();
    init_common();
    init_core();
    init_forms();
    init_WorkoutPlanService();
    init_DietPlanService();
    CreatePlan = class CreatePlan2 {
      fb;
      workoutService;
      dietService;
      planForm;
      planType = "";
      submitted = false;
      constructor(fb, workoutService, dietService) {
        this.fb = fb;
        this.workoutService = workoutService;
        this.dietService = dietService;
        this.planForm = this.fb.group({
          planType: ["workout", Validators.required],
          durationInWeeks: ["4", Validators.required],
          planName: ["Full Body Weight Loss Plan", Validators.required],
          description: [
            "A 4-week program focusing on overall strength and conditioning for beginners.",
            Validators.required
          ],
          exercises: this.fb.array([
            this.fb.group({
              name: ["Push-ups", Validators.required],
              sets: ["3"],
              reps: ["15"],
              restSeconds: ["60"],
              caloriesBurnt: ["10"],
              notes: ["Keep your back straight and go all the way down."]
            })
          ]),
          meals: this.fb.array([
            this.fb.group({
              mealName: ["Enter Meal Name", Validators.required],
              mealType: [""],
              calories: [""],
              proteinGrams: [""],
              carbsGrams: [""],
              fatGrams: [""]
            })
          ])
        });
      }
      get exercises() {
        return this.planForm.get("exercises");
      }
      get meals() {
        return this.planForm.get("meals");
      }
      addExercise() {
        this.exercises.push(this.fb.group({
          name: ["", Validators.required],
          sets: [""],
          reps: [""],
          restSeconds: [""],
          caloriesBurnt: [""],
          notes: [""]
        }));
      }
      removeExercise(index) {
        this.exercises.removeAt(index);
      }
      addMeal() {
        this.meals.push(this.fb.group({
          mealName: ["", Validators.required],
          mealType: [""],
          calories: [""],
          proteinGrams: [""],
          carbsGrams: [""],
          fatGrams: [""]
        }));
      }
      removeMeal(index) {
        this.meals.removeAt(index);
      }
      onPlanTypeChange(value) {
        this.planType = value;
      }
      resetForm() {
        this.planForm.reset();
        this.planForm.get("planType")?.setValue(this.planType);
        this.exercises.clear();
        this.meals.clear();
        this.addExercise();
        this.addMeal();
        this.submitted = false;
      }
      onSubmit() {
        this.submitted = true;
        if (this.planForm.valid) {
          const formValue = this.planForm.value;
          const planPayload = {
            title: formValue.planName,
            description: formValue.description,
            durationInWeeks: Number(formValue.durationInWeeks),
            exercises: formValue.exercises,
            meals: formValue.meals
          };
          console.log(this.planType);
          if (this.planForm.get("planType")?.value === "workout") {
            this.workoutService.addWorkoutPlan(planPayload).subscribe({
              next: () => {
                alert("Workout plan created successfully.");
                this.resetForm();
              },
              error: (err) => console.error("Workout plan creation failed:", err)
            });
          } else {
            console.log("DietPlan API");
            this.dietService.addDietPlan(planPayload).subscribe({
              next: () => {
                alert("Diet plan created successfully.");
                this.resetForm();
              },
              error: (err) => console.error("Diet plan creation failed:", err)
            });
            alert(`${this.planType === "workout" ? "Workout" : "Diet"} plan created successfully.`);
          }
        }
      }
      static ctorParameters = () => [
        { type: FormBuilder },
        { type: WorkoutPlanService },
        { type: DietPlanService }
      ];
    };
    CreatePlan = __decorate([
      Component({
        selector: "app-create-diet-plan",
        imports: [ReactiveFormsModule, CommonModule],
        template: create_plan_default,
        styles: [create_plan_default2]
      })
    ], CreatePlan);
  }
});

// src/app/component/coach/create-plan/create-plan.spec.ts
var require_create_plan_spec = __commonJS({
  "src/app/component/coach/create-plan/create-plan.spec.ts"(exports) {
    init_testing();
    init_create_plan3();
    describe("CreatePlan", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CreatePlan]
        }).compileComponents();
        fixture = TestBed.createComponent(CreatePlan);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_create_plan_spec();
//# sourceMappingURL=spec-app-component-coach-create-plan-create-plan.spec.js.map
