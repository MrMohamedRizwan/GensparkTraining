import {
  LoginComponet,
  init_login_componet
} from "./chunk-CLMDAV4B.js";
import "./chunk-UWUEIKVM.js";
import "./chunk-VC5DMEMI.js";
import "./chunk-VAM7ZMGK.js";
import "./chunk-W25TYQ46.js";
import "./chunk-OSO6IUH2.js";
import "./chunk-XSFPB7SI.js";
import "./chunk-62KLJIS4.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-U4LD2BTV.js";

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
