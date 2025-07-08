import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-OIMNZHYY.js";
import "./chunk-H7E76R4F.js";
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

// src/app/component/client/client-sidebar/client-sidebar.spec.ts
var require_client_sidebar_spec = __commonJS({
  "src/app/component/client/client-sidebar/client-sidebar.spec.ts"(exports) {
    init_testing();
    init_client_sidebar();
    describe("ClientSidebar", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ClientSidebar]
        }).compileComponents();
        fixture = TestBed.createComponent(ClientSidebar);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_client_sidebar_spec();
//# sourceMappingURL=spec-app-component-client-client-sidebar-client-sidebar.spec.js.map
