import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-LPPKGCEZ.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-JRE6BCIQ.js";
import "./chunk-JORF2EMQ.js";
import "./chunk-4BOFPGSM.js";
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
