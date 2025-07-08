import {
  UserService,
  init_UserService
} from "./chunk-U7SWEQEB.js";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  init_forms
} from "./chunk-4BOFPGSM.js";
import {
  ToastService,
  init_ToastService
} from "./chunk-7VXAEEP7.js";
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
  init_testing
} from "./chunk-M6CJ4AGH.js";
import {
  Component,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_tslib_es6,
  of,
  throwError
} from "./chunk-X6QY723D.js";

// angular:jit:template:src/app/component/signup-component/signup-component.html
var signup_component_default;
var init_signup_component = __esm({
  "angular:jit:template:src/app/component/signup-component/signup-component.html"() {
    signup_component_default = `<div class="container d-flex justify-content-center align-items-center vh-100">
  <div
    class="card p-4 shadow"
    style="min-width: 350px; max-width: 400px; width: 100%"
  >
    <h3 class="text-center mb-3">Sign Up</h3>

    <!-- \u2705 Alert messages -->
    <!-- <div *ngIf="successMessage" class="alert alert-success d-flex align-items-center" role="alert">
      <i class="bi bi-check-circle-fill me-2"></i> {{ successMessage }}
    </div>
    <div *ngIf="errorMessage" class="alert alert-danger d-flex align-items-center" role="alert">
      <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ errorMessage }}
    </div> -->

    <form [formGroup]="signupForm" (ngSubmit)="submitForm()">
      <!-- Name -->
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          class="form-control"
          formControlName="name"
          placeholder="Enter name"
        />
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('name')?.touched && signupForm.get('name')?.errors"
        >
          <i class="bi bi-exclamation-circle-fill"></i>
          <span *ngIf="signupForm.get('name')?.errors?.['required']"
            >Name is required.</span
          >
          <span *ngIf="signupForm.get('name')?.errors?.['bannedUsername']"
            >Invalid Username.</span
          >
        </div>
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          class="form-control"
          formControlName="email"
          placeholder="Enter email"
        />
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('email')?.touched && signupForm.get('email')?.errors"
        >
          <i class="bi bi-exclamation-circle-fill"></i>
          <span *ngIf="signupForm.get('email')?.errors?.['required']"
            >Email is required.</span
          >
          <span *ngIf="signupForm.get('email')?.errors?.['email']"
            >Enter a valid email.</span
          >
        </div>
      </div>

      <!-- Age -->
      <div class="mb-3">
        <label class="form-label">Age</label>
        <input
          class="form-control"
          type="number"
          formControlName="age"
          placeholder="Enter age"
        />
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('age')?.touched && signupForm.get('age')?.errors?.['required']"
        >
          <i class="bi bi-exclamation-circle-fill"></i> Age is required.
        </div>
      </div>

      <!-- Phone -->
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input
          class="form-control"
          type="tel"
          formControlName="phone"
          placeholder="Enter phone number"
        />
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('phone')?.touched && signupForm.get('phone')?.errors"
        >
          <i class="bi bi-exclamation-circle-fill"></i>
          <span *ngIf="signupForm.get('phone')?.errors?.['required']"
            >Phone number is required.</span
          >
          <span *ngIf="signupForm.get('phone')?.errors?.['pattern']"
            >Enter a valid phone number.</span
          >
        </div>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          class="form-control"
          type="password"
          formControlName="password"
          placeholder="Enter password"
        />
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('password')?.touched && signupForm.get('password')?.errors"
        >
          <i class="bi bi-exclamation-circle-fill"></i>
          <span *ngIf="signupForm.get('password')?.errors?.['required']"
            >Password is required.</span
          >
          <span *ngIf="signupForm.get('password')?.errors?.['minlength']"
            >At least 8 characters.</span
          >
          <span *ngIf="signupForm.get('password')?.errors?.['passwordNoNumber']"
            >Include a number.</span
          >
          <span *ngIf="signupForm.get('password')?.errors?.['passwordNoSymbol']"
            >Include a special character.</span
          >
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="form-label">Confirm Password</label>
        <input
          class="form-control"
          type="password"
          formControlName="confirmPassword"
          placeholder="Confirm password"
        />
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('confirmPassword')?.touched && signupForm.get('confirmPassword')?.errors"
        >
          <i class="bi bi-exclamation-circle-fill"></i> Confirm Password is
          required.
        </div>
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.errors?.['passwordMismatch'] && signupForm.get('confirmPassword')?.touched"
        >
          <i class="bi bi-exclamation-circle-fill"></i> Passwords do not match.
        </div>
      </div>

      <!-- Role -->
      <div class="mb-3">
        <label class="form-label">Role</label>
        <select class="form-select" formControlName="role">
          <option value="">Select Role</option>
          <option value="Client">Client</option>
          <option value="Coach">Coach</option>
        </select>
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('role')?.touched && signupForm.get('role')?.errors?.['required']"
        >
          <i class="bi bi-exclamation-circle-fill"></i> Role is required.
        </div>
      </div>

      <!-- Years of Experience (only for Coach) -->
      <div class="mb-3" *ngIf="signupForm.get('role')?.value === 'Coach'">
        <label class="form-label">Years of Experience</label>
        <input
          class="form-control"
          type="number"
          formControlName="yearsOfExperience"
          placeholder="Enter years of experience"
          min="0"
        />
        <div
          class="text-danger small mt-1"
          *ngIf="signupForm.get('yearsOfExperience')?.touched && signupForm.get('yearsOfExperience')?.errors"
        >
          <i class="bi bi-exclamation-circle-fill"></i>
          <span
            *ngIf="signupForm.get('yearsOfExperience')?.errors?.['required']"
            >Years of experience is required.</span
          >
          <span *ngIf="signupForm.get('yearsOfExperience')?.errors?.['min']"
            >Must be 2 or more.</span
          >
        </div>
      </div>

      <button
        class="btn btn-success w-100"
        type="submit"
        [disabled]="signupForm.invalid"
      >
        Create Account
      </button>

      <div class="mt-3 text-center">
        <span>Already have an account?</span>
        <a routerLink="/login" class="ms-1">Login here</a>
      </div>
    </form>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/component/signup-component/signup-component.css
var signup_component_default2;
var init_signup_component2 = __esm({
  "angular:jit:style:src/app/component/signup-component/signup-component.css"() {
    signup_component_default2 = "/* src/app/component/signup-component/signup-component.css */\n/*# sourceMappingURL=signup-component.css.map */\n";
  }
});

// src/app/misc/usernameValidator.ts
function UsernameValidation(control) {
  const banned = ["coach", "client"];
  if (control.value && banned.some((word) => control.value.toLowerCase().includes(word))) {
    return { bannedUsername: true };
  }
  return null;
}
var init_usernameValidator = __esm({
  "src/app/misc/usernameValidator.ts"() {
    "use strict";
  }
});

// src/app/misc/PasswordValidator.ts
function PasswordStrengthValidator(control) {
  const value = control.value || "";
  const minLength = 8;
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  if (value.length < minLength) {
    return { minlength: true };
  }
  if (!hasNumber) {
    return { passwordNoNumber: true };
  }
  if (!hasSymbol) {
    return { passwordNoSymbol: true };
  }
  return null;
}
var init_PasswordValidator = __esm({
  "src/app/misc/PasswordValidator.ts"() {
    "use strict";
  }
});

// src/app/misc/passwordMatchValidation.ts
function passwordsMatchValidator(control) {
  const password = control.get("password")?.value;
  const confirmPassword = control.get("confirmPassword")?.value;
  return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
}
var init_passwordMatchValidation = __esm({
  "src/app/misc/passwordMatchValidation.ts"() {
    "use strict";
  }
});

// src/app/component/signup-component/signup-component.ts
var SignupComponent;
var init_signup_component3 = __esm({
  "src/app/component/signup-component/signup-component.ts"() {
    "use strict";
    init_tslib_es6();
    init_signup_component();
    init_signup_component2();
    init_core();
    init_forms();
    init_UserService();
    init_usernameValidator();
    init_PasswordValidator();
    init_passwordMatchValidation();
    init_router();
    init_common();
    init_ToastService();
    SignupComponent = class SignupComponent2 {
      fb;
      userService;
      router;
      toastService;
      signupForm;
      constructor(fb, userService, router, toastService) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.toastService = toastService;
        this.signupForm = new FormGroup({
          name: new FormControl("roshan", [
            Validators.required,
            UsernameValidation
          ]),
          email: new FormControl("roshan@gmail.com", [
            Validators.required,
            Validators.email
          ]),
          age: new FormControl("22", [Validators.required]),
          phone: new FormControl("1234567890", [
            Validators.required,
            Validators.pattern("^\\+?[0-9]{10,15}$")
          ]),
          password: new FormControl("root@123", [
            Validators.required,
            PasswordStrengthValidator
          ]),
          confirmPassword: new FormControl("root@123", [Validators.required]),
          role: new FormControl("", [Validators.required]),
          yearsOfExperience: new FormControl("32", [
            Validators.required,
            Validators.min(1)
          ])
        }, { validators: passwordsMatchValidator });
      }
      ngOnInit() {
        this.signupForm.get("name")?.valueChanges.subscribe((value) => {
          console.log("passwod changed:", value, "Errors:", this.signupForm.get("password")?.errors);
        });
      }
      submitForm() {
        const user = this.signupForm.value;
        this.userService.addUser(user).subscribe({
          next: (response) => {
          },
          error: (error) => {
            console.error("Error adding user:", error);
          }
        });
      }
      static ctorParameters = () => [
        { type: FormBuilder },
        { type: UserService },
        { type: Router },
        { type: ToastService }
      ];
    };
    SignupComponent = __decorate([
      Component({
        selector: "app-signup-component",
        imports: [FormsModule, ReactiveFormsModule, CommonModule],
        template: signup_component_default,
        styles: [signup_component_default2]
      })
    ], SignupComponent);
  }
});

// src/app/component/signup-component/signup-component.spec.ts
var require_signup_component_spec = __commonJS({
  "src/app/component/signup-component/signup-component.spec.ts"(exports) {
    init_testing();
    init_signup_component3();
    init_forms();
    init_router();
    init_esm();
    init_UserService();
    init_ToastService();
    describe("SignupComponent", () => {
      let component;
      let fixture;
      let mockUserService;
      let mockToastService;
      let mockRouter;
      beforeEach(() => __async(null, null, function* () {
        mockUserService = {
          addUser: jasmine.createSpy("addUser").and.returnValue(of({}))
        };
        mockToastService = {
          showToast: jasmine.createSpy("showToast")
        };
        mockRouter = {
          navigate: jasmine.createSpy("navigate")
        };
        yield TestBed.configureTestingModule({
          imports: [SignupComponent, ReactiveFormsModule, FormsModule],
          providers: [
            { provide: UserService, useValue: mockUserService },
            { provide: ToastService, useValue: mockToastService },
            { provide: Router, useValue: mockRouter }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
      it("should initialize the form with default values", () => {
        const form = component.signupForm;
        expect(form).toBeDefined();
        expect(form.get("name")?.value).toBe("roshan");
        expect(form.get("email")?.value).toBe("roshan@gmail.com");
        expect(form.get("password")?.value).toBe("root@123");
      });
      it("should mark form invalid if required fields are missing", () => {
        component.signupForm.patchValue({ name: "", email: "", password: "" });
        expect(component.signupForm.valid).toBeFalse();
      });
      it("should call userService.addUser on valid form submission", () => {
        component.signupForm.patchValue({
          role: "Client"
          // ensure required field is filled
        });
        component.submitForm();
        expect(mockUserService.addUser).toHaveBeenCalledWith(component.signupForm.value);
      });
      it("should handle error response from userService", () => {
        mockUserService.addUser.and.returnValue(throwError(() => "Signup Failed"));
        spyOn(console, "error");
        component.submitForm();
        expect(console.error).toHaveBeenCalledWith("Error adding user:", "Signup Failed");
      });
    });
  }
});
export default require_signup_component_spec();
//# sourceMappingURL=spec-app-component-signup-component-signup-component.spec.js.map
