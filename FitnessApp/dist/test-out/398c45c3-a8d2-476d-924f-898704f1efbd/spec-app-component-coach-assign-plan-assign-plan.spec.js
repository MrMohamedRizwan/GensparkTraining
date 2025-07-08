import {
  CoachService,
  init_CoachService
} from "./chunk-BPCKIZ3B.js";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-H7E76R4F.js";
import {
  ToastService,
  init_ToastService
} from "./chunk-YUUZA3MN.js";
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
  ChangeDetectorRef,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-NGZCFPTA.js";

// angular:jit:template:src/app/component/coach/assign-plan/assign-plan.html
var assign_plan_default;
var init_assign_plan = __esm({
  "angular:jit:template:src/app/component/coach/assign-plan/assign-plan.html"() {
    assign_plan_default = `<div
  class="container py-4"
  class="flex-grow-1 px-3 pt-3 overflow-auto"
  style="max-height: calc(95vh); overflow-y: auto"
>
  <h2 class="mb-1">Assign Plan</h2>
  <p class="text-muted mb-4">Assign workout and diet plans to your clients</p>

  <form (ngSubmit)="onSubmit()">
    <!-- Client Section -->
    <div class="mb-4">
      <label class="form-label fw-semibold">Select Client</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="Search client..."
        [(ngModel)]="searchClient"
        (ngModelChange)="filterList()"
        name="searchClient"
      />
      <div class="row g-3">
        <div class="col-md-6" *ngFor="let client of filteredClients">
          <div
            class="card cursor-pointer position-relative"
            [class.border-primary]="selectedClient === client.id"
            (click)="selectedClient = client.id"
          >
            <!-- Show-on-hover button -->
            <button
              type="button"
              class="btn btn-sm position-absolute top-0 end-0 m-2 expand-btn"
              style="color: #007bff; border-color: #007bff"
              (click)="showDetails(client); $event.stopPropagation()"
            >
              <i class="bi bi-arrows-expand"></i>
            </button>

            <div class="card-body">
              <h5 class="card-title mb-1">{{ client.name }}</h5>
              <p class="card-text small text-muted">{{ client.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Workout Plan Section -->
    <div class="mb-4">
      <label class="form-label fw-semibold">Select Workout Plan</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="Search workout..."
        [(ngModel)]="searchWorkout"
        (ngModelChange)="filteWorkkoutList()"
        name="searchWorkout"
      />
      <div class="row g-3">
        <div class="col-md-6" *ngFor="let plan of filteredWorkouts">
          <div
            class="card cursor-pointer"
            [class.border-info]="selectedWorkoutPlan === plan.id"
            (click)="selectedWorkoutPlan = plan.id"
          >
            <button
              type="button"
              class="btn btn-sm position-absolute top-0 end-0 m-2 expand-btn"
              style="color: #007bff; border-color: #007bff"
              (click)="showDetails(plan); $event.stopPropagation()"
            >
              <i class="bi bi-arrows-expand"></i>
            </button>
            <div class="card-body">
              <h5 class="card-title mb-1">{{ plan.title }}</h5>
              <p class="card-text small text-muted">{{ plan.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diet Plan Section -->
    <div class="mb-4">
      <label class="form-label fw-semibold">Select Diet Plan</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="Search diet..."
        [(ngModel)]="searchDiet"
        (ngModelChange)="filteDietList()"
        name="searchDiet"
      />
      <div class="row g-3">
        <div class="col-md-6" *ngFor="let plan of filteredDiets">
          <div
            class="card cursor-pointer"
            [class.border-success]="selectedDietPlan === plan.id"
            (click)="selectedDietPlan = plan.id"
          >
            <button
              type="button"
              class="btn btn-sm position-absolute top-0 end-0 m-2 expand-btn"
              style="color: #007bff; border-color: #007bff"
              (click)="showDetails(plan); $event.stopPropagation()"
            >
              <i class="bi bi-arrows-expand"></i>
            </button>

            <div class="card-body">
              <h5 class="card-title mb-1">{{ plan.title }}</h5>
              <p class="card-text small text-muted">{{ plan.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Select Due Date</label>
        <input
          type="date"
          class="form-control"
          [(ngModel)]="dueDate"
          name="startDate"
          required
        />
      </div>
    </div>

    <!-- Submit Button -->
    <div class="text-end">
      <button type="submit" class="btn btn-primary" [disabled]="isSubmitting">
        {{ isSubmitting ? 'Assigning...' : 'Assign Plan' }}
      </button>
    </div>
  </form>
</div>
`;
  }
});

// angular:jit:style:src/app/component/coach/assign-plan/assign-plan.css
var assign_plan_default2;
var init_assign_plan2 = __esm({
  "angular:jit:style:src/app/component/coach/assign-plan/assign-plan.css"() {
    assign_plan_default2 = "/* src/app/component/coach/assign-plan/assign-plan.css */\n.cursor-pointer {\n  cursor: pointer;\n}\n.card.border-primary,\n.card.border-info,\n.card.border-success {\n  background-color: #f8f9fa;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.card:hover {\n  border-color: #007bff;\n  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);\n}\n.card.selected {\n  border-color: #0056b3;\n  box-shadow: 0 0 12px rgba(0, 86, 179, 0.3);\n}\n.expand-btn {\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.expand-btn:hover {\n  border-color: #007bff;\n  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);\n  color: #007bff;\n  background-color: #e6f0ff;\n}\n.card:hover .expand-btn {\n  display: block;\n  opacity: 1;\n}\n/*# sourceMappingURL=assign-plan.css.map */\n";
  }
});

// src/app/component/coach/assign-plan/assign-plan.ts
var AssignPlan;
var init_assign_plan3 = __esm({
  "src/app/component/coach/assign-plan/assign-plan.ts"() {
    "use strict";
    init_tslib_es6();
    init_assign_plan();
    init_assign_plan2();
    init_common();
    init_core();
    init_forms();
    init_CoachService();
    init_router();
    init_ToastService();
    AssignPlan = class AssignPlan2 {
      fb;
      coachService;
      cdr;
      route;
      router;
      toastService;
      form;
      selectedClient = "";
      selectedWorkoutPlan = "";
      selectedDietPlan = "";
      isSubmitting = false;
      clients = [];
      workoutPlans = [];
      dueDate;
      dietPlans = [];
      filteredClients = [];
      filteredWorkouts = [];
      filteredDiets = [];
      searchClient = "";
      searchWorkout = "";
      searchDiet = "";
      constructor(fb, coachService, cdr, route, router, toastService) {
        this.fb = fb;
        this.coachService = coachService;
        this.cdr = cdr;
        this.route = route;
        this.router = router;
        this.toastService = toastService;
        this.form = this.fb.group({});
      }
      ngOnInit() {
        const clientId = this.route.snapshot.paramMap.get("clientId");
        if (clientId) {
          this.selectedClient = clientId;
        }
        this.fetchClients();
        this.fetchWorkouts();
        this.fetchDiets();
      }
      selectedClientDetails = null;
      showDetails(details) {
        this.selectedClientDetails = details;
        if (details && details.email) {
          this.router.navigate(["/client-details", details.id]);
        } else if (details && details.exercises) {
          this.router.navigate(["/workout-details", details.id]);
        } else if (details && details.mealTypes) {
          this.router.navigate(["/diet-details", details.id]);
        }
        console.log("Client Details:", details);
      }
      fetchClients() {
        this.coachService.getClientsList().subscribe({
          next: (res) => {
            this.clients = res.items.$values;
            console.log("Fetched clients:", this.clients);
            this.filterList();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error("Error fetching clients:", err);
          }
        });
      }
      fetchWorkouts() {
        this.coachService.getWorkouts().subscribe({
          next: (res) => {
            this.workoutPlans = res.items.$values;
            console.log("Fetched workoutPlans:", this.workoutPlans);
            this.filteWorkkoutList();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error("Error fetching workoutPlans:", err);
          }
        });
      }
      fetchDiets() {
        this.coachService.getDiets().subscribe({
          next: (res) => {
            this.dietPlans = res.items.$values;
            console.log("Fetched dietPlans:", this.dietPlans);
            this.filteDietList();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error("Error fetching dietPlans:", err);
          }
        });
      }
      filterList() {
        this.filteredClients = this.clients.filter((c) => c.name.toLowerCase().includes(this.searchClient.toLowerCase()));
      }
      filteWorkkoutList() {
        this.filteredWorkouts = this.workoutPlans.filter((w) => w.title.toLowerCase().includes(this.searchWorkout.toLowerCase()));
      }
      filteDietList() {
        this.filteredDiets = this.dietPlans.filter((d) => d.title.toLowerCase().includes(this.searchDiet.toLowerCase()));
      }
      onSubmit() {
        return __async(this, null, function* () {
          console.log(this.selectedClient, this.selectedWorkoutPlan, this.selectedDietPlan);
          if (!this.selectedClient || !this.selectedWorkoutPlan || !this.selectedDietPlan) {
            alert("Please select a client, workout plan, and diet plan.");
            return;
          }
          this.isSubmitting = false;
          const selectedClient = this.clients.find((c) => c.id === this.selectedClient);
          const selectedWorkout = this.workoutPlans.find((w) => w.id === this.selectedWorkoutPlan);
          const selectedDiet = this.dietPlans.find((d) => d.id === this.selectedDietPlan);
          const selectDueDate = this.dueDate;
          const Workoutpayload = {
            clientEmail: selectedClient.email,
            WorkoutPlanID: selectedWorkout.id,
            // DietPlanID: '',
            dueDate: selectDueDate
          };
          const DietPayload = {
            clientEmail: selectedClient.email,
            // WorkoutPlanID: '',
            DietPlanID: selectedDiet.id,
            dueDate: selectDueDate
          };
          this.coachService.assignPlanToClient(Workoutpayload).subscribe({
            next: () => {
              this.selectedClient = "";
              this.selectedWorkoutPlan = "";
              this.selectedDietPlan = "";
              this.selectedClientDetails = "";
              this.toastService.showToast("Successful", "Plan Assigned", "success");
              this.isSubmitting = false;
              alert("Plans successfully assigned!");
            },
            error: (err) => {
              console.error("Failed to assign plan:", err);
              this.toastService.showToast("Failed", err, "error");
              alert("Failed to assign Workout plan. Please try again.");
            },
            complete: () => {
              this.isSubmitting = false;
            }
          });
          this.coachService.assignPlanToClient(DietPayload).subscribe({
            next: () => {
              this.toastService.showToast("Successful", "Plan Assigned", "success");
              this.selectedClient = "";
              this.selectedWorkoutPlan = "";
              this.selectedDietPlan = "";
              this.selectedClientDetails = "";
              this.isSubmitting = false;
              alert("Plans successfully assigned!");
            },
            error: (err) => {
              console.error("Failed to assign plan:", err);
              this.toastService.showToast("Failed", err, "error");
              alert("Failed to assign Diet plan. Please try again.");
            },
            complete: () => {
              this.isSubmitting = false;
            }
          });
        });
      }
      static ctorParameters = () => [
        { type: FormBuilder },
        { type: CoachService },
        { type: ChangeDetectorRef },
        { type: ActivatedRoute },
        { type: Router },
        { type: ToastService }
      ];
    };
    AssignPlan = __decorate([
      Component({
        selector: "app-assign-plan",
        standalone: true,
        imports: [CommonModule, ReactiveFormsModule, FormsModule],
        template: assign_plan_default,
        styles: [assign_plan_default2]
      })
    ], AssignPlan);
  }
});

// src/app/component/coach/assign-plan/assign-plan.spec.ts
var require_assign_plan_spec = __commonJS({
  "src/app/component/coach/assign-plan/assign-plan.spec.ts"(exports) {
    init_testing();
    init_assign_plan3();
    describe("AssignPlan", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [AssignPlan]
        }).compileComponents();
        fixture = TestBed.createComponent(AssignPlan);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_assign_plan_spec();
//# sourceMappingURL=spec-app-component-coach-assign-plan-assign-plan.spec.js.map
