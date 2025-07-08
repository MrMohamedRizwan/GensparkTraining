import {
  UserService,
  init_UserService
} from "./chunk-U7SWEQEB.js";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  init_forms
} from "./chunk-4BOFPGSM.js";
import "./chunk-XZQZQLJQ.js";
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
  debounceTime,
  init_core,
  init_esm,
  init_operators,
  init_tslib_es6,
  of,
  throwError
} from "./chunk-X6QY723D.js";

// src/app/component/client/client-details/client-details.spec.ts
init_testing();

// src/app/component/client/client-details/client-details.ts
init_tslib_es6();

// angular:jit:template:src/app/component/client/client-details/client-details.html
var client_details_default = `<div class="container mt-5">
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

// src/app/component/client/client-details/client-details.ts
init_core();
init_forms();
init_operators();
init_common();
init_UserService();
var ClientDetails = class ClientDetails2 {
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

// src/app/component/client/client-details/client-details.spec.ts
init_UserService();
init_forms();
init_esm();
init_common();
describe("ClientDetails Component", () => {
  let component;
  let fixture;
  let userServiceMock;
  const mockCoachesResponse = {
    items: {
      $values: [
        { id: "1", name: "Coach A" },
        { id: "2", name: "Coach B" }
      ]
    }
  };
  const mockUpdateResponse = {
    message: "Client updated successfully"
  };
  beforeEach(waitForAsync(() => {
    userServiceMock = {
      getAllCoaches: jasmine.createSpy().and.returnValue(of(mockCoachesResponse)),
      UpdateClientDetails: jasmine.createSpy().and.returnValue(of(mockUpdateResponse))
    };
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    }).overrideComponent(ClientDetails, {
      set: {
        imports: [ReactiveFormsModule, CommonModule]
      }
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
  it("should load coaches on init", () => {
    expect(userServiceMock.getAllCoaches).toHaveBeenCalled();
    expect(component.coaches.length).toBe(2);
    expect(component.filteredCoaches.length).toBe(2);
  });
  it("should submit the form and update client details", () => {
    component.updateForm.setValue({
      gender: "Male",
      goal: "Lose weight",
      height: 170,
      weight: 70,
      coachSearch: "",
      coachId: "1"
    });
    component.onSubmit();
    expect(userServiceMock.UpdateClientDetails).toHaveBeenCalledWith({
      gender: "Male",
      goal: "Lose weight",
      height: 170,
      weight: 70,
      coachId: "1"
    });
    expect(component.successMessage).toBe("Client updated successfully");
    expect(component.errorMessage).toBe("");
  });
  it("should not submit if form is invalid", () => {
    component.updateForm.reset();
    component.onSubmit();
    expect(userServiceMock.UpdateClientDetails).not.toHaveBeenCalled();
  });
  it("should handle error on update failure", () => {
    userServiceMock.UpdateClientDetails.and.returnValue(throwError(() => ({
      error: { message: "Server error" }
    })));
    component.updateForm.setValue({
      gender: "Female",
      goal: "Build muscle",
      height: 165,
      weight: 60,
      coachSearch: "",
      coachId: "2"
    });
    component.onSubmit();
    expect(component.successMessage).toBe("");
    expect(component.errorMessage).toBe("Server error");
  });
});
//# sourceMappingURL=spec-app-component-client-client-details-client-details.spec.js.map
