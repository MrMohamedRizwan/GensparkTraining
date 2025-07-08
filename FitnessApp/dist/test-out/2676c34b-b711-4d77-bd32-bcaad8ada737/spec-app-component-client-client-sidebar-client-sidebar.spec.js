import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-ZQT5HSVZ.js";
import "./chunk-VC5DMEMI.js";
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
