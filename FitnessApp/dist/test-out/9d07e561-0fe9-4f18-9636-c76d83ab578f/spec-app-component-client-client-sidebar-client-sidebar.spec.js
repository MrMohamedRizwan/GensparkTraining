import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-ORPN7MBG.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-OHMDPQAH.js";
import "./chunk-64UFXOXL.js";
import "./chunk-ZUUSI7SG.js";
import "./chunk-TAHKWTMY.js";
import "./chunk-K73EO5Y7.js";
import "./chunk-2GLLT4WP.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-EQ4BJPU7.js";

// src/app/component/client/client-sidebar/client-sidebar.spec.ts
var require_client_sidebar_spec = __commonJS({
  "src/app/component/client/client-sidebar/client-sidebar.spec.ts"(exports) {
    init_testing();
    init_client_sidebar();
    init_testing2();
    describe("ClientSidebar", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ClientSidebar, RouterTestingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ClientSidebar);
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
export default require_client_sidebar_spec();
//# sourceMappingURL=spec-app-component-client-client-sidebar-client-sidebar.spec.js.map
