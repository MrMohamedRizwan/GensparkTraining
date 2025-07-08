import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-EMV2JX7I.js";
import "./chunk-WLXXB6W3.js";
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
