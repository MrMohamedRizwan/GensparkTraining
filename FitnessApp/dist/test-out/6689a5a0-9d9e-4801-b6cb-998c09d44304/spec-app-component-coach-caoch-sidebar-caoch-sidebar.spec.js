import {
  CaochSidebar,
  init_caoch_sidebar
} from "./chunk-Q7GGJE6F.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-OHMDPQAH.js";
import "./chunk-64UFXOXL.js";
import "./chunk-TAHKWTMY.js";
import "./chunk-K73EO5Y7.js";
import "./chunk-2GLLT4WP.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-EQ4BJPU7.js";

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
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
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
