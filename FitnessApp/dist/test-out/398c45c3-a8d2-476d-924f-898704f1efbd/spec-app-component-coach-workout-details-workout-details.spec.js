import {
  WorkoutPlanService,
  init_WorkoutPlanService
} from "./chunk-X53P5DFF.js";
import {
  FormsModule,
  init_forms
} from "./chunk-H7E76R4F.js";
import {
  ActivatedRoute,
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
} from "./chunk-NGZCFPTA.js";

// angular:jit:template:src/app/component/coach/workout-details/workout-details.html
var workout_details_default;
var init_workout_details = __esm({
  "angular:jit:template:src/app/component/coach/workout-details/workout-details.html"() {
    workout_details_default = `<div *ngIf="workoutData() as w" class="container mt-4">
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h3 class="text-primary mb-0">{{ w.title }}</h3>
      <p class="text-muted">{{ w.description }}</p>
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
      <button class="btn btn-danger btn-sm" (click)="deleteWorkout()">
        <i class="bi bi-trash"></i> Delete
      </button>
    </div>
  </div>

  <!-- Edit Mode -->
  <form
    *ngIf="isEditing"
    #editForm="ngForm"
    (ngSubmit)="editWorkout(editForm.value)"
  >
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input class="form-control" name="title" [(ngModel)]="w.title" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea
        class="form-control"
        name="description"
        [(ngModel)]="w.description"
      ></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Duration (weeks)</label>
      <input
        class="form-control"
        type="number"
        name="durationInWeeks"
        [(ngModel)]="w.durationInWeeks"
        required
      />
    </div>

    <div
      *ngFor="let ex of w.exercises?.$values; let i = index"
      class="border rounded p-3 mb-3"
    >
      <h6>Exercise {{ i + 1 }}</h6>

      <div class="row mb-2">
        <div class="col-md-6">
          <label>Exercise Name</label>
          <input
            class="form-control"
            [(ngModel)]="ex.name"
            name="name{{ i }}"
          />
        </div>
        <div class="col-md-3">
          <label>Sets</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="ex.sets"
            name="sets{{ i }}"
          />
        </div>
        <div class="col-md-3">
          <label>Reps</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="ex.reps"
            name="reps{{ i }}"
          />
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-md-4">
          <label>Rest Seconds</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="ex.restSeconds"
            name="restSeconds{{ i }}"
          />
        </div>
        <div class="col-md-4">
          <label>Calories Burnt</label>
          <input
            class="form-control"
            type="number"
            [(ngModel)]="ex.caloriesBurnt"
            name="caloriesBurnt{{ i }}"
          />
        </div>
        <div class="col-md-4">
          <label>Notes</label>
          <input
            class="form-control"
            [(ngModel)]="ex.notes"
            name="notes{{ i }}"
          />
        </div>
      </div>

      <div class="text-end">
        <button
          class="btn btn-outline-danger btn-sm"
          type="button"
          (click)="removeExercise(i)"
          *ngIf="w.exercises?.$values.length > 1"
        >
          Remove
        </button>
      </div>
    </div>

    <button
      class="btn btn-outline-primary btn-sm mb-3"
      type="button"
      (click)="addExercise()"
    >
      <i class="bi bi-plus-circle"></i> Add Exercise
    </button>

    <div class="d-flex gap-2 justify-content-end">
      <button
        class="btn btn-success"
        type="submit"
        [disabled]="editForm.invalid"
      >
        Save Changes
      </button>
    </div>
  </form>

  <!-- View Mode -->
  <div *ngIf="!isEditing">
    <p><strong>Duration:</strong> {{ w.durationInWeeks }} weeks</p>

    <h5 class="mt-4">Exercises</h5>
    <ul class="list-group">
      <li *ngFor="let ex of w.exercises?.$values" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <strong>{{ ex.name }}</strong>
            <div class="text-muted small">{{ ex.notes }}</div>
          </div>
          <div class="text-end">
            <span class="badge bg-primary me-1">{{ ex.sets }} sets</span>
            <span class="badge bg-success me-1">{{ ex.reps }} reps</span>
            <span class="badge bg-secondary me-1"
              >{{ ex.restSeconds }}s rest</span
            >
            <span class="badge bg-danger">
              <i class="bi bi-fire"></i> {{ ex.caloriesBurnt }} Calories
            </span>
          </div>
        </div>
      </li>
    </ul>

    <div class="mt-4">
      <label class="form-label">Assigned Users</label>
      <ul class="list-group">
        <li
          *ngFor="let user of w.clients?.$values"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{{ user.name }}</strong>
            <span class="text-muted small ms-2">{{ user.email }}</span>
          </div>
          <div class="text-end">
            <div>
              <span class="badge bg-light text-dark">
                Assigned on: {{ user.assignedOn | date: 'mediumDate' }}
              </span>
            </div>
            <div>
              <span
                class="badge"
                [ngClass]="{
                  'bg-success': user.status === 'Completed',
                  'bg-warning': user.status === 'Not Completed',
                  'bg-danger': user.status === 'inactive'
                }"
              >
                {{ user.status }}
              </span>
            </div>
          </div>
        </li>
        <li
          *ngIf="!w.clients?.$values?.length"
          class="list-group-item text-muted"
        >
          No users assigned.
        </li>
      </ul>
    </div>
  </div>
</div>

<!-- Loading State -->
<div *ngIf="!workoutData()" class="text-center text-muted mt-5">
  <p>Loading workout plan...</p>
</div>
`;
  }
});

// angular:jit:style:src/app/component/coach/workout-details/workout-details.css
var workout_details_default2;
var init_workout_details2 = __esm({
  "angular:jit:style:src/app/component/coach/workout-details/workout-details.css"() {
    workout_details_default2 = "/* src/app/component/coach/workout-details/workout-details.css */\n/*# sourceMappingURL=workout-details.css.map */\n";
  }
});

// src/app/component/coach/workout-details/workout-details.ts
var WorkoutDetails;
var init_workout_details3 = __esm({
  "src/app/component/coach/workout-details/workout-details.ts"() {
    "use strict";
    init_tslib_es6();
    init_workout_details();
    init_workout_details2();
    init_core();
    init_router();
    init_WorkoutPlanService();
    init_common();
    init_forms();
    WorkoutDetails = class WorkoutDetails2 {
      route;
      router;
      workoutService;
      workoutId;
      workout = signal(null);
      isEditing = false;
      constructor(route, router, workoutService) {
        this.route = route;
        this.router = router;
        this.workoutService = workoutService;
      }
      ngOnInit() {
        this.workoutId = this.route.snapshot.params["workoutId"];
        this.loadWorkout();
      }
      loadWorkout() {
        this.workoutService.GetParticularWorkout(this.workoutId).subscribe({
          next: (res) => {
            this.workout.set(res);
            console.log("\u2705 Loaded workout:", res);
          },
          error: (err) => {
            console.error("\u274C Failed to load workout:", err);
            alert("Error loading workout plan.");
          }
        });
      }
      workoutData() {
        return this.workout();
      }
      editWorkout(formData) {
        const updated = this.workout();
        if (!updated)
          return;
        const updatedWorkout = __spreadProps(__spreadValues({}, updated), {
          title: formData.title,
          description: formData.description,
          durationInWeeks: formData.durationInWeeks,
          exercises: updated.exercises?.$values || []
        });
        this.workoutService.updateWorkoutPlan(this.workoutId, updatedWorkout).subscribe({
          next: () => {
            alert("\u2705 Workout plan updated!");
            this.isEditing = false;
            this.loadWorkout();
          },
          error: (err) => {
            console.error("\u274C Update failed:", err);
            alert("Failed to update workout plan.");
          }
        });
      }
      cancelEdit() {
        this.isEditing = false;
        this.loadWorkout();
      }
      addExercise() {
        const current = this.workout();
        if (!current || !current.exercises?.$values)
          return;
        current.exercises.$values.push({
          name: "",
          sets: 0,
          reps: 0,
          restSeconds: 0,
          caloriesBurnt: 0,
          notes: ""
        });
        this.workout.set(__spreadValues({}, current));
      }
      removeExercise(index) {
        const current = this.workout();
        if (!current || !current.exercises?.$values)
          return;
        current.exercises.$values.splice(index, 1);
        this.workout.set(__spreadValues({}, current));
      }
      deleteWorkout() {
        if (confirm("Are you sure you want to delete this workout plan?")) {
          this.workoutService.deleteWorkoutPlan(this.workoutId).subscribe({
            next: () => {
              alert("\u{1F5D1}\uFE0F Workout plan deleted!");
              this.router.navigate(["/view-workout-plan"]);
            },
            error: (err) => {
              console.error("\u274C Deletion failed:", err);
              alert("Failed to delete workout.");
            }
          });
        }
      }
      static ctorParameters = () => [
        { type: ActivatedRoute },
        { type: Router },
        { type: WorkoutPlanService }
      ];
    };
    WorkoutDetails = __decorate([
      Component({
        selector: "app-workout-details",
        standalone: true,
        imports: [CommonModule, FormsModule],
        template: workout_details_default,
        styles: [workout_details_default2]
      })
    ], WorkoutDetails);
  }
});

// src/app/component/coach/workout-details/workout-details.spec.ts
var require_workout_details_spec = __commonJS({
  "src/app/component/coach/workout-details/workout-details.spec.ts"(exports) {
    init_testing();
    init_workout_details3();
    describe("WorkoutDetails", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [WorkoutDetails]
        }).compileComponents();
        fixture = TestBed.createComponent(WorkoutDetails);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_workout_details_spec();
//# sourceMappingURL=spec-app-component-coach-workout-details-workout-details.spec.js.map
