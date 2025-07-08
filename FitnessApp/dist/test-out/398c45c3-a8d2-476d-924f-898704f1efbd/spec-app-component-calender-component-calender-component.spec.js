import {
  CalenderComponent,
  init_calender_component
} from "./chunk-QX67IRQS.js";
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
