import {
  LoginComponet,
  init_login_componet
} from "./chunk-TRDV2YXV.js";
import "./chunk-PCO5WFCU.js";
import "./chunk-GOPKSOE6.js";
import "./chunk-OUFG2IUC.js";
import "./chunk-6YDZZKHI.js";
import "./chunk-VDQ734U5.js";
import "./chunk-35V5GIMJ.js";
import "./chunk-UDVGPYPD.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-I33ILCKL.js";

// src/app/component/login-componet/login-componet.spec.ts
var require_login_componet_spec = __commonJS({
  "src/app/component/login-componet/login-componet.spec.ts"(exports) {
    init_testing();
    init_login_componet();
    describe("LoginComponet", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [LoginComponet]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponet);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_login_componet_spec();
//# sourceMappingURL=spec-app-component-login-componet-login-componet.spec.js.map
