import {
  LoginComponet,
  init_login_componet
} from "./chunk-LXZF4TYR.js";
import "./chunk-SPNMRDPB.js";
import "./chunk-H7E76R4F.js";
import "./chunk-YUUZA3MN.js";
import "./chunk-CS3TLFNS.js";
import "./chunk-SUCX6BSB.js";
import "./chunk-HNAQOUEP.js";
import "./chunk-5K4RIAN4.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-NGZCFPTA.js";

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
