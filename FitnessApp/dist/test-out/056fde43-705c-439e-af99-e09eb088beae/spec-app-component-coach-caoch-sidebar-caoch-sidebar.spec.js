import {
  CaochSidebar,
  init_caoch_sidebar
} from "./chunk-NS2XMN27.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-JRE6BCIQ.js";
import "./chunk-JORF2EMQ.js";
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
  __commonJS
} from "./chunk-X6QY723D.js";

// src/app/component/coach/caoch-sidebar/caoch-sidebar.spec.ts
var require_caoch_sidebar_spec = __commonJS({
  "src/app/component/coach/caoch-sidebar/caoch-sidebar.spec.ts"(exports) {
    init_testing();
    init_caoch_sidebar();
    init_testing2();
    describe("CaochSidebar", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CaochSidebar, RouterTestingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(CaochSidebar);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should clear localStorage and navigate to / on logout", () => {
        const navigateSpy = spyOn(component.router, "navigate");
        const clearSpy = spyOn(localStorage, "clear");
        component.handleLogout();
        expect(clearSpy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(["/"]);
      });
    });
  }
});
export default require_caoch_sidebar_spec();
//# sourceMappingURL=spec-app-component-coach-caoch-sidebar-caoch-sidebar.spec.js.map
