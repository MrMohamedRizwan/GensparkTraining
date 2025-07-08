import {
  ToastComponent,
  init_toast
} from "./chunk-LXV2KIVW.js";
import "./chunk-5K4RIAN4.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-NGZCFPTA.js";

// src/app/component/toast/toast.spec.ts
var require_toast_spec = __commonJS({
  "src/app/component/toast/toast.spec.ts"(exports) {
    init_testing();
    init_toast();
    describe("Toast", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ToastComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ToastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_toast_spec();
//# sourceMappingURL=spec-app-component-toast-toast.spec.js.map
