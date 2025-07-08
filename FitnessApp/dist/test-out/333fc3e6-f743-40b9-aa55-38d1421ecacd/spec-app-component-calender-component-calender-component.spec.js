import {
  CalenderComponent,
  init_calender_component
} from "./chunk-SRN5HNLO.js";
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

// src/app/component/calender-component/calender-component.spec.ts
var require_calender_component_spec = __commonJS({
  "src/app/component/calender-component/calender-component.spec.ts"(exports) {
    init_testing();
    init_calender_component();
    describe("CalenderComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CalenderComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CalenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_calender_component_spec();
//# sourceMappingURL=spec-app-component-calender-component-calender-component.spec.js.map
