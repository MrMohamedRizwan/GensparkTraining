import {
  ToastService,
  init_ToastService
} from "./chunk-W6RVIMSA.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-54MGAL5N.js";

// angular:jit:template:src/app/toasssss/toasssss.html
var toasssss_default;
var init_toasssss = __esm({
  "angular:jit:template:src/app/toasssss/toasssss.html"() {
    toasssss_default = '<p>toasssss works!</p>\n<button (click)="showSuccess()">Click</button>\n';
  }
});

// angular:jit:style:src/app/toasssss/toasssss.css
var toasssss_default2;
var init_toasssss2 = __esm({
  "angular:jit:style:src/app/toasssss/toasssss.css"() {
    toasssss_default2 = "/* src/app/toasssss/toasssss.css */\n/*# sourceMappingURL=toasssss.css.map */\n";
  }
});

// src/app/toasssss/toasssss.ts
var Toasssss;
var init_toasssss3 = __esm({
  "src/app/toasssss/toasssss.ts"() {
    "use strict";
    init_tslib_es6();
    init_toasssss();
    init_toasssss2();
    init_core();
    init_ToastService();
    Toasssss = class Toasssss2 {
      toastr;
      constructor(toastr) {
        this.toastr = toastr;
      }
      showSuccess() {
        console.log("TOast");
        this.toastr.showToast("fnuhabudbh", "duagugda", "error");
      }
      static ctorParameters = () => [
        { type: ToastService }
      ];
    };
    Toasssss = __decorate([
      Component({
        selector: "app-toasssss",
        imports: [],
        template: toasssss_default,
        styles: [toasssss_default2]
      })
    ], Toasssss);
  }
});

// src/app/toasssss/toasssss.spec.ts
var require_toasssss_spec = __commonJS({
  "src/app/toasssss/toasssss.spec.ts"(exports) {
    init_testing();
    init_toasssss3();
    describe("Toasssss", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Toasssss]
        }).compileComponents();
        fixture = TestBed.createComponent(Toasssss);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_toasssss_spec();
//# sourceMappingURL=spec-app-toasssss-toasssss.spec.js.map
