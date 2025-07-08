import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-JRE6BCIQ.js";
import "./chunk-JORF2EMQ.js";
import {
  LoginComponet,
  ToastrService,
  init_login_componet,
  init_ngx_toastr
} from "./chunk-N52CCLXK.js";
import {
  UserService,
  init_UserService
} from "./chunk-U7SWEQEB.js";
import {
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-4BOFPGSM.js";
import {
  ToastService,
  init_ToastService
} from "./chunk-7VXAEEP7.js";
import "./chunk-XZQZQLJQ.js";
import "./chunk-VOWP6SJ3.js";
import "./chunk-E5G6P5QB.js";
import "./chunk-G6SPFJGI.js";
import {
  TestBed,
  init_testing
} from "./chunk-M6CJ4AGH.js";
import {
  __async,
  __commonJS,
  init_esm,
  of,
  throwError
} from "./chunk-X6QY723D.js";

// src/app/component/login-componet/login-componet.spec.ts
var require_login_componet_spec = __commonJS({
  "src/app/component/login-componet/login-componet.spec.ts"(exports) {
    init_testing();
    init_login_componet();
    init_forms();
    init_testing2();
    init_UserService();
    init_ToastService();
    init_ngx_toastr();
    init_esm();
    describe("LoginComponet", () => {
      let component;
      let fixture;
      let userServiceSpy;
      let toastServiceSpy;
      let toastrSpy;
      beforeEach(() => __async(null, null, function* () {
        userServiceSpy = jasmine.createSpyObj("UserService", ["validateUser"]);
        toastServiceSpy = jasmine.createSpyObj("ToastService", ["showToast"]);
        toastrSpy = jasmine.createSpyObj("ToastrService", ["success"]);
        yield TestBed.configureTestingModule({
          imports: [
            LoginComponet,
            ReactiveFormsModule,
            FormsModule,
            RouterTestingModule
            // ✅ include this to provide real Router & RouterLink
          ],
          providers: [
            { provide: UserService, useValue: userServiceSpy },
            { provide: ToastService, useValue: toastServiceSpy },
            { provide: ToastrService, useValue: toastrSpy }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponet);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
      it("should call validateUser and show success toast on successful login", () => {
        userServiceSpy.validateUser.and.returnValue(of({}));
        component.handleLogin();
        expect(userServiceSpy.validateUser).toHaveBeenCalled();
        expect(toastServiceSpy.showToast).toHaveBeenCalledWith("Success", "Login completed successfully.", "success");
      });
      it("should show error toast on login failure", () => {
        userServiceSpy.validateUser.and.returnValue(throwError(() => "Invalid credentials"));
        component.handleLogin();
        expect(userServiceSpy.validateUser).toHaveBeenCalled();
        expect(toastServiceSpy.showToast).toHaveBeenCalledWith("Login Failed", "Invalid credentials", "error");
      });
    });
  }
});
export default require_login_componet_spec();
//# sourceMappingURL=spec-app-component-login-componet-login-componet.spec.js.map
