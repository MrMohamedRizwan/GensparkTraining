import {
  LoginComponet,
  init_login_componet
} from "./chunk-LAG2A5NN.js";
import "./chunk-DM2JQH2D.js";
import "./chunk-WLXXB6W3.js";
import "./chunk-W6RVIMSA.js";
import "./chunk-X422K7CE.js";
import "./chunk-54TAVEMT.js";
import "./chunk-MWUV55VP.js";
import "./chunk-LSLPQO3F.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-54MGAL5N.js";

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
