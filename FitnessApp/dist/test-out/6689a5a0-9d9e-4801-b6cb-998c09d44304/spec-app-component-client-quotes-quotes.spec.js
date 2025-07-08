import {
  Quotes,
  init_quotes
} from "./chunk-LSWZSWAR.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-EQ4BJPU7.js";

// src/app/component/client/quotes/quotes.spec.ts
var require_quotes_spec = __commonJS({
  "src/app/component/client/quotes/quotes.spec.ts"(exports) {
    init_testing();
    init_quotes();
    describe("Quotes", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Quotes]
        }).compileComponents();
        fixture = TestBed.createComponent(Quotes);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_quotes_spec();
//# sourceMappingURL=spec-app-component-client-quotes-quotes.spec.js.map
