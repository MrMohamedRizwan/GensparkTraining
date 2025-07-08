import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-S3QMBXQW.js";
import "./chunk-GOPKSOE6.js";
import "./chunk-6YDZZKHI.js";
import "./chunk-VDQ734U5.js";
import "./chunk-35V5GIMJ.js";
import "./chunk-UDVGPYPD.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-I33ILCKL.js";

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
