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
} from "./chunk-I33ILCKL.js";

// angular:jit:template:src/app/component/unauthorized/unauthorized.html
var unauthorized_default;
var init_unauthorized = __esm({
  "angular:jit:template:src/app/component/unauthorized/unauthorized.html"() {
    unauthorized_default = "<p>unauthorized works!</p>\n";
  }
});

// angular:jit:style:src/app/component/unauthorized/unauthorized.css
var unauthorized_default2;
var init_unauthorized2 = __esm({
  "angular:jit:style:src/app/component/unauthorized/unauthorized.css"() {
    unauthorized_default2 = "/* src/app/component/unauthorized/unauthorized.css */\n/*# sourceMappingURL=unauthorized.css.map */\n";
  }
});

// src/app/component/unauthorized/unauthorized.ts
var Unauthorized;
var init_unauthorized3 = __esm({
  "src/app/component/unauthorized/unauthorized.ts"() {
    "use strict";
    init_tslib_es6();
    init_unauthorized();
    init_unauthorized2();
    init_core();
    Unauthorized = class Unauthorized2 {
    };
    Unauthorized = __decorate([
      Component({
        selector: "app-unauthorized",
        imports: [],
        template: unauthorized_default,
        styles: [unauthorized_default2]
      })
    ], Unauthorized);
  }
});

// src/app/component/unauthorized/unauthorized.spec.ts
var require_unauthorized_spec = __commonJS({
  "src/app/component/unauthorized/unauthorized.spec.ts"(exports) {
    init_testing();
    init_unauthorized3();
    describe("Unauthorized", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Unauthorized]
        }).compileComponents();
        fixture = TestBed.createComponent(Unauthorized);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_unauthorized_spec();
//# sourceMappingURL=spec-app-component-unauthorized-unauthorized.spec.js.map
