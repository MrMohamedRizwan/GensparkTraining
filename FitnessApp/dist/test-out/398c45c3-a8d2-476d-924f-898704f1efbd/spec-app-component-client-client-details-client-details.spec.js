import {
  UserService,
  init_UserService
} from "./chunk-SPNMRDPB.js";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  init_forms
} from "./chunk-H7E76R4F.js";
import "./chunk-CS3TLFNS.js";
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
  debounceTime,
  init_core,
  init_operators,
  init_testing,
  init_tslib_es6
} from "./chunk-NGZCFPTA.js";

// angular:jit:template:src/app/component/client/client-details/client-details.html
var client_details_default;
var init_client_details = __esm({
  "angular:jit:template:src/app/component/client/client-details/client-details.html"() {
    client_details_default = `<div class="container mt-5">
  <div class="card shadow p-4">
    <h4 class="text-center mb-4">Complete Your Profile</h4>

    <!-- \u{1F514} Success/Error Messages -->
    <div *ngIf="successMessage" class="alert alert-success" role="alert">
      <i class="bi bi-check-circle me-2"></i> {{ successMessage }}
    </div>
    <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
      <i class="bi bi-exclamation-triangle me-2"></i> {{ errorMessage }}
    </div>

    <form [formGroup]="updateForm" (ngSubmit)="onSubmit()">
      <!-- Personal Info -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Gender</label>
          <select class="form-select" formControlName="gender">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Goal</label>
          <input
            type="text"
            class="form-control"
            formControlName="goal"
            placeholder="e.g., Build muscle"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Height (cm)</label>
          <input type="number" class="form-control" formControlName="height" />
        </div>
        <div class="col-md-6">
          <label class="form-label">Weight (kg)</label>
          <input type="number" class="form-control" formControlName="weight" />
        </div>
      </div>

      <!-- Coach Selection -->
      <div class="mb-3">
        <label class="form-label">Search Coach</label>
        <input
          type="text"
          class="form-control"
          formControlName="coachSearch"
          placeholder="Search by coach name"
        />
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        <div
          class="col"
          *ngFor="let coach of filteredCoaches"
          (click)="selectCoach(coach)"
        >
          <div
            class="card h-100 shadow-sm coach-card"
            [ngClass]="{ 'border-primary border-2': updateForm.value.coachId === coach.id }"
            style="cursor: pointer"
          >
            <div class="card-body">
              <h5 class="card-title mb-1">{{ coach.name }}</h5>
              <p class="card-text mb-1">
                <strong>Experience:</strong> {{ coach.yearsOfExperience }} years
              </p>
              <p class="card-text small text-muted">
                <strong>Email:</strong> {{ coach.email }}
              </p>
              <div
                *ngIf="updateForm.value.coachId === coach.id"
                class="badge bg-primary mt-2"
              >
                Selected
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hidden CoachId -->
      <input type="hidden" formControlName="coachId" />

      <button
        class="btn btn-success w-100 mt-2"
        type="submit"
        [disabled]="updateForm.invalid"
      >
        Submit Profile
      </button>
    </form>
  </div>
</div>
`;
  }
});

// src/app/component/client/client-details/client-details.ts
var ClientDetails;
var init_client_details2 = __esm({
  "src/app/component/client/client-details/client-details.ts"() {
    "use strict";
    init_tslib_es6();
    init_client_details();
    init_core();
    init_forms();
    init_operators();
    init_common();
    init_UserService();
    ClientDetails = class ClientDetails2 {
      fb;
      userService;
      updateForm;
      coaches = [];
      filteredCoaches = [];
      successMessage = "";
      errorMessage = "";
      constructor(fb, userService) {
        this.fb = fb;
        this.userService = userService;
      }
      ngOnInit() {
        this.updateForm = this.fb.group({
          gender: ["", Validators.required],
          goal: ["", Validators.required],
          height: ["", [Validators.required, Validators.min(50)]],
          weight: ["", [Validators.required, Validators.min(30)]],
          coachSearch: [""],
          coachId: ["", Validators.required]
        });
        this.loadCoaches();
        this.updateForm.get("coachSearch")?.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
          this.filteredCoaches = this.coaches.filter((coach) => coach.name.toLowerCase().includes(value.toLowerCase()));
        });
      }
      loadCoaches() {
        this.userService.getAllCoaches().subscribe({
          next: (res) => {
            this.coaches = res?.items?.$values || [];
            console.log("Coaches loaded:", this.coaches);
            this.filteredCoaches = this.coaches;
          },
          error: () => {
            this.errorMessage = "Failed to load coaches.";
          }
        });
      }
      selectCoach(coach) {
        this.updateForm.patchValue({ coachId: coach.id });
      }
      onSubmit() {
        if (this.updateForm.invalid)
          return;
        console.log("Form submitted:", this.updateForm.value);
        const { gender, goal, height, weight, coachId } = this.updateForm.value;
        const data = {
          gender,
          goal,
          height,
          weight,
          coachId
        };
        this.userService.UpdateClientDetails(data).subscribe({
          next: (res) => {
            this.successMessage = res.message;
            this.errorMessage = "";
          },
          error: (err) => {
            this.successMessage = "";
            this.errorMessage = err?.error?.message || "Update failed";
          }
        });
      }
      static ctorParameters = () => [
        { type: FormBuilder },
        { type: UserService }
      ];
    };
    ClientDetails = __decorate([
      Component({
        selector: "app-client-details",
        standalone: true,
        imports: [ReactiveFormsModule, CommonModule],
        template: client_details_default
      })
    ], ClientDetails);
  }
});

// src/app/component/client/client-details/client-details.spec.ts
var require_client_details_spec = __commonJS({
  "src/app/component/client/client-details/client-details.spec.ts"(exports) {
    init_testing();
    init_client_details2();
    describe("ClientDetails", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ClientDetails]
        }).compileComponents();
        fixture = TestBed.createComponent(ClientDetails);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_client_details_spec();
//# sourceMappingURL=spec-app-component-client-client-details-client-details.spec.js.map
