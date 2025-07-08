import {
  CaochSidebar,
  init_caoch_sidebar
} from "./chunk-FQAREYJV.js";
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

// src/app/component/coach/caoch-sidebar/caoch-sidebar.spec.ts
var require_caoch_sidebar_spec = __commonJS({
  "src/app/component/coach/caoch-sidebar/caoch-sidebar.spec.ts"(exports) {
    init_testing();
    init_caoch_sidebar();
    describe("CaochSidebar", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CaochSidebar]
        }).compileComponents();
        fixture = TestBed.createComponent(CaochSidebar);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_caoch_sidebar_spec();
//# sourceMappingURL=spec-app-component-coach-caoch-sidebar-caoch-sidebar.spec.js.map
