import {
  Component,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-SLZOMOAS.js";

// angular:jit:template:src/app/component/client/quotes/quotes.html
var quotes_default;
var init_quotes = __esm({
  "angular:jit:template:src/app/component/client/quotes/quotes.html"() {
    quotes_default = '<div class="quote-box">\n  <blockquote class="blockquote text-center">\n    <p class="mb-0">{{ selectedQuote }}</p>\n  </blockquote>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/client/quotes/quotes.css
var quotes_default2;
var init_quotes2 = __esm({
  "angular:jit:style:src/app/component/client/quotes/quotes.css"() {
    quotes_default2 = "/* src/app/component/client/quotes/quotes.css */\n.quote-box {\n  padding: 20px;\n  margin: 10px auto;\n  background-color: #f8f9fa;\n  border-left: 5px solid #007bff;\n  font-style: italic;\n  font-size: 1.2rem;\n  max-width: 600px;\n}\n/*# sourceMappingURL=quotes.css.map */\n";
  }
});

// src/app/component/client/quotes/quotes.ts
var Quotes;
var init_quotes3 = __esm({
  "src/app/component/client/quotes/quotes.ts"() {
    "use strict";
    init_tslib_es6();
    init_quotes();
    init_quotes2();
    init_core();
    Quotes = class Quotes2 {
      motivationalQuotes = [
        "Push yourself, because no one else is going to do it for you.",
        "The body achieves what the mind believes.",
        "No pain, no gain. Shut up and train.",
        "Your only limit is you.",
        "Train insane or remain the same.",
        "Results happen over time, not overnight. Work hard, stay consistent.",
        "Fitness is not about being better than someone else. It's about being better than you used to be.",
        "You don\u2019t have to be extreme, just consistent.",
        "Sweat is just fat crying.",
        "Wake up. Work out. Look hot. Kick ass.",
        "When you feel like quitting, think about why you started.",
        "If it doesn\u2019t challenge you, it won\u2019t change you.",
        "Strive for progress, not perfection.",
        "You are stronger than you think.",
        "Success starts with self-discipline."
      ];
      selectedQuote = "";
      ngOnInit() {
        const randomIndex = Math.floor(Math.random() * this.motivationalQuotes.length);
        this.selectedQuote = this.motivationalQuotes[randomIndex];
      }
    };
    Quotes = __decorate([
      Component({
        selector: "app-quotes",
        imports: [],
        template: quotes_default,
        styles: [quotes_default2]
      })
    ], Quotes);
  }
});

export {
  Quotes,
  init_quotes3 as init_quotes
};
//# sourceMappingURL=chunk-JH4VO4RP.js.map
