import {
  Quotes,
  init_quotes
} from "./chunk-7PBBBUDK.js";
import {
  TestBed,
  init_testing
} from "./chunk-M6CJ4AGH.js";
import {
  __async,
  __commonJS
} from "./chunk-X6QY723D.js";

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
