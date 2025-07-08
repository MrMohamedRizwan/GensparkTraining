import {
  DietPlanService,
  init_DietPlanService
} from "./chunk-5V6DH5BY.js";
import {
  FormsModule,
  init_forms
} from "./chunk-GOPKSOE6.js";
import {
  ActivatedRoute,
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
  __spreadProps,
  __spreadValues,
  init_core,
  init_testing,
  init_tslib_es6,
  signal
} from "./chunk-I33ILCKL.js";

// angular:jit:template:src/app/component/coach/diet-details/diet-details.html
var diet_details_default;
var init_diet_details = __esm({
  "angular:jit:template:src/app/component/coach/diet-details/diet-details.html"() {
    diet_details_default = `<div *ngIf="diet() as d" class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h3 class="text-success mb-0">{{ d.title }}</h3>
      <p class="text-muted">{{ d.description }}</p>
    </div>
    <div>
      <button
        class="btn btn-warning btn-sm me-2"
        (click)="isEditing = true"
        *ngIf="!isEditing"
      >
        <i class="bi bi-pencil"></i> Edit
      </button>
      <button
        class="btn btn-secondary btn-sm me-2"
        (click)="cancelEdit()"
        *ngIf="isEditing"
      >
        Cancel
      </button>
      <button class="btn btn-danger btn-sm" (click)="deleteDiet()">
        <i class="bi bi-trash"></i> Delete
      </button>
    </div>
  </div>

  <!-- \u270D\uFE0F Edit Form -->
  <form
    *ngIf="isEditing"
    (ngSubmit)="saveDiet(editForm.value)"
    #editForm="ngForm"
  >
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input class="form-control" [(ngModel)]="d.title" name="title" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea
        class="form-control"
        [(ngModel)]="d.description"
        name="description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Duration (weeks)</label>
      <input
        type="number"
        class="form-control"
        [(ngModel)]="d.durationInWeeks"
        name="durationInWeeks"
        required
      />
    </div>

    <!-- \u{1F501} Editable Meals -->
    <div
      *ngFor="let meal of d.mealTypes?.$values; let i = index"
      class="border rounded p-3 mb-3"
    >
      <div class="d-flex justify-content-between align-items-center">
        <h6>Meal {{ i + 1 }}: {{ meal.mealType || 'New Meal' }}</h6>
        <button
          type="button"
          class="btn btn-outline-danger btn-sm"
          (click)="removeMeal(i)"
        >
          <i class="bi bi-trash"></i> Remove
        </button>
      </div>
      <input
        class="form-control mb-2"
        [(ngModel)]="meal.mealName"
        name="mealName{{i}}"
        placeholder="Meal name"
      />
      <div class="row">
        <div class="col-md-3">
          <label>Meal Type</label>
          <select
            class="form-select"
            [(ngModel)]="meal.mealType"
            name="mealType{{i}}"
            required
          >
            <option value="" disabled>Select type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div class="col-md-3">
          <label>Calories</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="meal.calories"
            name="calories{{i}}"
          />
        </div>
        <div class="col-md-2">
          <label>Protein (g)</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="meal.proteinGrams"
            name="protein{{i}}"
          />
        </div>
        <div class="col-md-2">
          <label>Carbs (g)</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="meal.carbsGrams"
            name="carbs{{i}}"
          />
        </div>
        <div class="col-md-2">
          <label>Fats (g)</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="meal.fatGrams"
            name="fat{{i}}"
          />
        </div>
      </div>
    </div>

    <!-- \u2795 Add Meal Button -->
    <button
      type="button"
      class="btn btn-outline-primary mb-3"
      (click)="addMeal()"
    >
      <i class="bi bi-plus-circle"></i> Add Meal
    </button>

    <div class="text-end">
      <button class="btn btn-success mt-3" type="submit">Save Changes</button>
    </div>
  </form>

  <!-- \u{1F441}\uFE0F Read-Only View -->
  <div *ngIf="!isEditing">
    <p><strong>Duration:</strong> {{ d.durationInWeeks }} weeks</p>

    <h5 class="mt-4">Meal Plan</h5>
    <ul class="list-group">
      <li
        *ngFor="let meal of d.mealTypes?.$values"
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div>
          <strong>{{ meal.mealType }}</strong>
          <p class="mb-1">{{ meal.mealName }}</p>
        </div>
        <div class="text-end small">
          <div class="text-muted">Calories: {{ meal.calories }}</div>
          <span class="badge bg-success me-1"
            >{{ meal.proteinGrams }}g Protein</span
          >
          <span class="badge bg-warning text-dark me-1"
            >{{ meal.carbsGrams }}g Carbs</span
          >
          <span class="badge bg-info text-dark">{{ meal.fatGrams }}g Fat</span>
        </div>
      </li>
      <li
        *ngIf="!d.mealTypes?.$values?.length"
        class="list-group-item text-muted"
      >
        No meals added.
      </li>
    </ul>

    <div class="mt-4">
      <label class="form-label">Assigned Users</label>
      <ul class="list-group">
        <li
          *ngFor="let user of d.clients?.$values"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{{ user.name }}</strong>
            <span class="text-muted small ms-2">{{ user.email }}</span>
          </div>
          <div class="text-end">
            <div>
              <span class="badge bg-light text-dark">
                Assigned on: {{ user.assignedOn | date:'mediumDate' }}
              </span>
            </div>
            <div>
              <span
                class="badge"
                [ngClass]="{
                  'bg-success': user.status === 'Completed',
                  'bg-warning': user.status == 'Not Completed',
                  'bg-danger': user.status === 'inactive',
                  'bg-secondary': user.status === 'Not Started',
                  'bg-warning text-dark': user.status === 'On Progress',

                  
                }"
              >
                {{ user.status }}
              </span>
            </div>
          </div>
        </li>
        <li
          *ngIf="!d.clients?.$values?.length"
          class="list-group-item text-muted"
        >
          No users assigned.
        </li>
      </ul>
    </div>
  </div>
</div>

<div *ngIf="!diet()" class="text-center text-muted mt-5">
  <p>Loading diet plan...</p>
</div>
`;
  }
});

// angular:jit:style:src/app/component/coach/diet-details/diet-details.css
var diet_details_default2;
var init_diet_details2 = __esm({
  "angular:jit:style:src/app/component/coach/diet-details/diet-details.css"() {
    diet_details_default2 = "/* src/app/component/coach/diet-details/diet-details.css */\n/*# sourceMappingURL=diet-details.css.map */\n";
  }
});

// src/app/component/coach/diet-details/diet-details.ts
var DietDetails;
var init_diet_details3 = __esm({
  "src/app/component/coach/diet-details/diet-details.ts"() {
    "use strict";
    init_tslib_es6();
    init_diet_details();
    init_diet_details2();
    init_core();
    init_router();
    init_DietPlanService();
    init_common();
    init_forms();
    DietDetails = class DietDetails2 {
      route;
      router;
      dietService;
      dietId;
      isEditing = false;
      diet = signal(null);
      constructor(route, router, dietService) {
        this.route = route;
        this.router = router;
        this.dietService = dietService;
      }
      ngOnInit() {
        this.dietId = this.route.snapshot.params["dietId"];
        this.loadDiet();
      }
      loadDiet() {
        this.dietService.GetParticularDiet(this.dietId).subscribe({
          next: (res) => {
            this.diet.set(res);
            console.log("\u{1F4C4} Diet plan loaded:", res);
          },
          error: (err) => {
            console.error("\u274C Failed to load diet plan:", err);
            alert("Failed to load diet plan.");
          }
        });
      }
      dietData() {
        return this.diet();
      }
      saveDiet(formData) {
        const updated = this.diet();
        if (!updated)
          return;
        const updatedDiet = __spreadProps(__spreadValues({}, updated), {
          title: formData.title,
          description: formData.description,
          durationInWeeks: formData.durationInWeeks,
          meals: updated.mealTypes?.$values || []
        });
        this.dietService.updateDietPlan(this.dietId, updatedDiet).subscribe({
          next: () => {
            alert("\u2705 Diet plan updated successfully!");
            this.isEditing = false;
            this.loadDiet();
          },
          error: (err) => {
            console.error("\u274C Update failed:", err);
            alert("Failed to update diet plan.");
          }
        });
      }
      cancelEdit() {
        this.isEditing = false;
        this.loadDiet();
      }
      addMeal() {
        const current = this.diet();
        if (!current || !current.mealTypes?.$values)
          return;
        current.mealTypes.$values.push({
          mealName: "",
          mealType: "",
          calories: 0,
          proteinGrams: 0,
          carbsGrams: 0,
          fatGrams: 0
        });
        this.diet.set(__spreadValues({}, current));
      }
      removeMeal(index) {
        const current = this.diet();
        if (!current || !current.mealTypes?.$values)
          return;
        current.mealTypes.$values.splice(index, 1);
        this.diet.set(__spreadValues({}, current));
      }
      deleteDiet() {
        if (confirm("Are you sure you want to delete this diet plan?")) {
          this.dietService.deleteDietPlan(this.dietId).subscribe({
            next: () => {
              alert("\u{1F5D1}\uFE0F Diet plan deleted successfully!");
              this.router.navigate(["/view-diet-plan"]);
            },
            error: (err) => {
              console.error("\u274C Deletion failed:", err);
              alert("Failed to delete diet plan.");
            }
          });
        }
      }
      static ctorParameters = () => [
        { type: ActivatedRoute },
        { type: Router },
        { type: DietPlanService }
      ];
    };
    DietDetails = __decorate([
      Component({
        selector: "app-diet-details",
        standalone: true,
        imports: [CommonModule, FormsModule],
        template: diet_details_default,
        styles: [diet_details_default2]
      })
    ], DietDetails);
  }
});

// src/app/component/coach/diet-details/diet-details.spec.ts
var require_diet_details_spec = __commonJS({
  "src/app/component/coach/diet-details/diet-details.spec.ts"(exports) {
    init_testing();
    init_diet_details3();
    describe("DietDetails", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [DietDetails]
        }).compileComponents();
        fixture = TestBed.createComponent(DietDetails);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_diet_details_spec();
//# sourceMappingURL=spec-app-component-coach-diet-details-diet-details.spec.js.map
