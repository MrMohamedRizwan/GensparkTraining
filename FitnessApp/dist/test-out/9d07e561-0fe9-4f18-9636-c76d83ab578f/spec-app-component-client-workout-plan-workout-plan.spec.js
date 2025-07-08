import {
  WorkoutPlanService,
  init_WorkoutPlanService
} from "./chunk-PPUCMQOR.js";
import {
  ActivatedRoute,
  Router,
  init_router
} from "./chunk-TAHKWTMY.js";
import "./chunk-K73EO5Y7.js";
import {
  CommonModule,
  init_common
} from "./chunk-2GLLT4WP.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_testing,
  init_tslib_es6,
  of,
  signal,
  throwError
} from "./chunk-EQ4BJPU7.js";

// angular:jit:template:src/app/component/client/workout-plan/workout-plan.html
var workout_plan_default;
var init_workout_plan = __esm({
  "angular:jit:template:src/app/component/client/workout-plan/workout-plan.html"() {
    workout_plan_default = `<div class="container my-5">
  <div *ngIf="Workouts() as plan; else loading">
    <div class="mb-4">
      <h2 class="fw-bold">{{ plan.title }}</h2>
      <p class="text-muted">{{ plan.description }}</p>
      <div class="text-muted">
        <strong>Duration:</strong> {{ plan.durationInWeeks }} weeks
      </div>
    </div>

    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Today's Exercises</h5>
      </div>
      <div class="card-body">
        <div
          *ngFor="let ex of plan.exercises?.$values; let i = index"
          class="mb-3 border-bottom pb-3"
        >
          <div class="d-flex align-items-start">
            <input
              type="checkbox"
              class="form-check-input mt-1 me-3"
              [checked]="isCompleted(ex.id)"
              (change)="toggleExercise(ex.id)"
              id="ex-{{ i }}"
            />
            <div>
              <label
                [for]="'ex-' + i"
                class="form-label fw-semibold mb-1"
                [class.text-decoration-line-through]="isCompleted(ex.id)"
              >
                {{ ex.name }}
              </label>
              <div class="text-muted small">
                {{ ex.sets }} sets \xD7 {{ ex.reps }} reps \u2022 {{ ex.restSeconds }}s
                rest
              </div>
              <div class="text-secondary fst-italic small mt-1">
                {{ ex.notes }}
              </div>
            </div>
          </div>
        </div>

        <button
          class="btn btn-success w-100 mt-3"
          [disabled]="completedExercises().size === 0"
          (click)="submitWorkout()"
        >
          Submit Workout
        </button>
      </div>
    </div>
  </div>

  <ng-template #loading>
    <div class="alert alert-info">Loading your workout...</div>
  </ng-template>
</div>
`;
  }
});

// angular:jit:style:src/app/component/client/workout-plan/workout-plan.css
var workout_plan_default2;
var init_workout_plan2 = __esm({
  "angular:jit:style:src/app/component/client/workout-plan/workout-plan.css"() {
    workout_plan_default2 = "/* src/app/component/client/workout-plan/workout-plan.css */\n.text-decoration-line-through {\n  text-decoration: line-through;\n}\n.cc {\n  padding: 0 10%;\n}\n/*# sourceMappingURL=workout-plan.css.map */\n";
  }
});

// src/app/component/client/workout-plan/workout-plan.ts
var WorkoutPlan;
var init_workout_plan3 = __esm({
  "src/app/component/client/workout-plan/workout-plan.ts"() {
    "use strict";
    init_tslib_es6();
    init_workout_plan();
    init_workout_plan2();
    init_core();
    init_router();
    init_WorkoutPlanService();
    init_common();
    WorkoutPlan = class WorkoutPlan2 {
      router;
      route;
      workoutPlanService;
      constructor(router, route, workoutPlanService) {
        this.router = router;
        this.route = route;
        this.workoutPlanService = workoutPlanService;
      }
      planAssignmentId;
      Workouts = signal(null);
      completedExercises = signal(/* @__PURE__ */ new Set());
      ngOnInit() {
        const workoutPlanId = this.route.snapshot.paramMap.get("workoutPlanId");
        this.planAssignmentId = this.route.snapshot.paramMap.get("planAssignemnetId");
        console.log(this.planAssignmentId);
        this.getWorkoutPlanDetails(workoutPlanId);
      }
      getWorkoutPlanDetails(workoutPlanId) {
        this.workoutPlanService.GetParticularWorkout(workoutPlanId).subscribe({
          next: (res) => {
            this.Workouts.set(res);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
      toggleExercise(exId) {
        const updated = new Set(this.completedExercises());
        updated.has(exId) ? updated.delete(exId) : updated.add(exId);
        this.completedExercises.set(updated);
      }
      isCompleted(exId) {
        return this.completedExercises().has(exId);
      }
      submitWorkout() {
        const workout = this.Workouts();
        const completedSet = this.completedExercises();
        const exercises = workout?.exercises?.$values || [];
        const completedExercises = exercises.filter((ex) => completedSet.has(ex.id));
        const totalCalories = completedExercises.reduce((sum, ex) => sum + (ex.caloriesBurnt || 0) * ex.sets, 0);
        const completedData = completedExercises.map((ex) => ({
          exerciseId: ex.id,
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          restSeconds: ex.restSeconds,
          calories: ex.caloriesBurnt || 0
        }));
        const payload = {
          PlanAssignmentId: this.planAssignmentId,
          completedOn: (/* @__PURE__ */ new Date()).toISOString(),
          totalExercises: completedExercises.length,
          caloriesBurnt: totalCalories,
          ExercisesJSON: JSON.stringify(completedData),
          DietMealJSON: JSON.stringify([])
        };
        console.log("Workout Submission Payload:", payload);
        this.workoutPlanService.SubmitWorkoutByClient(payload).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(["client-dashboard"]);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
      static ctorParameters = () => [
        { type: Router },
        { type: ActivatedRoute },
        { type: WorkoutPlanService }
      ];
    };
    WorkoutPlan = __decorate([
      Component({
        selector: "app-workout-plan",
        imports: [CommonModule],
        template: workout_plan_default,
        styles: [workout_plan_default2]
      })
    ], WorkoutPlan);
  }
});

// src/app/component/client/workout-plan/workout-plan.spec.ts
var require_workout_plan_spec = __commonJS({
  "src/app/component/client/workout-plan/workout-plan.spec.ts"(exports) {
    init_testing();
    init_workout_plan3();
    init_router();
    init_WorkoutPlanService();
    init_esm();
    init_common();
    describe("WorkoutPlan Component", () => {
      let component;
      let fixture;
      let workoutServiceSpy;
      let routerSpy;
      const mockWorkoutPlanId = "workout123";
      const mockPlanAssignmentId = "assignment456";
      const mockWorkout = {
        id: mockWorkoutPlanId,
        title: "Full Body Workout",
        exercises: {
          $values: [
            {
              id: "ex1",
              name: "Push Up",
              sets: 3,
              reps: 15,
              restSeconds: 30,
              caloriesBurnt: 10
            },
            {
              id: "ex2",
              name: "Plank",
              sets: 2,
              reps: 1,
              restSeconds: 60,
              caloriesBurnt: 5
            }
          ]
        }
      };
      beforeEach(() => __async(null, null, function* () {
        const workoutService = jasmine.createSpyObj("WorkoutPlanService", [
          "GetParticularWorkout",
          "SubmitWorkoutByClient"
        ]);
        const router = jasmine.createSpyObj("Router", ["navigate"]);
        yield TestBed.configureTestingModule({
          imports: [
            CommonModule,
            WorkoutPlan
            // If WorkoutPlan is standalone, import it here
          ],
          providers: [
            { provide: WorkoutPlanService, useValue: workoutService },
            { provide: Router, useValue: router },
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  paramMap: {
                    get: (key) => {
                      if (key === "workoutPlanId")
                        return mockWorkoutPlanId;
                      if (key === "planAssignemnetId")
                        return mockPlanAssignmentId;
                      return null;
                    }
                  }
                }
              }
            }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(WorkoutPlan);
        component = fixture.componentInstance;
        workoutServiceSpy = TestBed.inject(WorkoutPlanService);
        routerSpy = TestBed.inject(Router);
      }));
      it("should create component", () => {
        expect(component).toBeTruthy();
      });
      it("should load workout on init", () => {
        workoutServiceSpy.GetParticularWorkout.and.returnValue(of(mockWorkout));
        fixture.detectChanges();
        expect(workoutServiceSpy.GetParticularWorkout).toHaveBeenCalledWith(mockWorkoutPlanId);
        expect(component.Workouts()?.title).toBe("Full Body Workout");
      });
      it("should handle error on load workout", () => {
        spyOn(console, "error");
        workoutServiceSpy.GetParticularWorkout.and.returnValue(throwError(() => new Error("Load error")));
        fixture.detectChanges();
        expect(console.error).toHaveBeenCalled();
      });
      it("should toggle an exercise as completed", () => {
        const exId = "ex1";
        expect(component.isCompleted(exId)).toBeFalse();
        component.toggleExercise(exId);
        expect(component.isCompleted(exId)).toBeTrue();
        component.toggleExercise(exId);
        expect(component.isCompleted(exId)).toBeFalse();
      });
      it("should submit workout with correct payload", () => {
        workoutServiceSpy.GetParticularWorkout.and.returnValue(of(mockWorkout));
        workoutServiceSpy.SubmitWorkoutByClient.and.returnValue(of({ message: "Submitted" }));
        fixture.detectChanges();
        component.toggleExercise("ex1");
        component.submitWorkout();
        expect(workoutServiceSpy.SubmitWorkoutByClient).toHaveBeenCalled();
        const submittedPayload = workoutServiceSpy.SubmitWorkoutByClient.calls.mostRecent().args[0];
        expect(submittedPayload.PlanAssignmentId).toBe(mockPlanAssignmentId);
        expect(submittedPayload.totalExercises).toBe(1);
        expect(submittedPayload.caloriesBurnt).toBe(30);
        expect(routerSpy.navigate).toHaveBeenCalledWith(["client-dashboard"]);
      });
      it("should not fail if no exercises are marked completed", () => {
        workoutServiceSpy.GetParticularWorkout.and.returnValue(of(mockWorkout));
        workoutServiceSpy.SubmitWorkoutByClient.and.returnValue(of({}));
        fixture.detectChanges();
        component.submitWorkout();
        expect(workoutServiceSpy.SubmitWorkoutByClient).toHaveBeenCalled();
        const payload = workoutServiceSpy.SubmitWorkoutByClient.calls.mostRecent().args[0];
        expect(payload.totalExercises).toBe(0);
        expect(payload.caloriesBurnt).toBe(0);
      });
    });
  }
});
export default require_workout_plan_spec();
//# sourceMappingURL=spec-app-component-client-workout-plan-workout-plan.spec.js.map
