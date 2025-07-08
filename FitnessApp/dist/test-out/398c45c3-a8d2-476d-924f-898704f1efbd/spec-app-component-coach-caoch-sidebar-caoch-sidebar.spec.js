import {
  CaochSidebar,
  init_caoch_sidebar
} from "./chunk-U2V2IYWP.js";
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
