import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-4BOFPGSM.js";
import {
  CommonModule,
  init_common
} from "./chunk-G6SPFJGI.js";
import {
  TestBed,
  init_testing
} from "./chunk-M6CJ4AGH.js";
import {
  Component,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-X6QY723D.js";

// angular:jit:template:src/app/chat-component/chat-component.html
var chat_component_default;
var init_chat_component = __esm({
  "angular:jit:template:src/app/chat-component/chat-component.html"() {
    chat_component_default = `<div class="container mt-4">
  <h4 class="text-primary mb-3">Coach Chat</h4>

  <!-- Chat Box -->
  <div
    class="chat-box border rounded p-3 mb-3 bg-light"
    style="height: 400px; overflow-y: auto"
  >
    <div *ngFor="let msg of messages()">
      <div
        [ngClass]="{
          'text-end': msg.senderId === currentUserId,
          'text-start': msg.senderId !== currentUserId
        }"
      >
        <div
          [class]="
            'd-inline-block px-3 py-2 rounded mb-1 ' +
            (msg.senderId === currentUserId ? 'bg-primary text-white' : 'bg-white border')
          "
        >
          {{ msg.content }}
        </div>
        <div class="text-muted small">{{ msg.sentAt | date: 'shortTime' }}</div>
      </div>
    </div>
  </div>

  <!-- Message Input -->
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Type your message..."
      [formControl]="messageControl"
      (keyup.enter)="sendMessage()"
    />
    <button class="btn btn-primary" (click)="sendMessage()">Send</button>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/chat-component/chat-component.css
var chat_component_default2;
var init_chat_component2 = __esm({
  "angular:jit:style:src/app/chat-component/chat-component.css"() {
    chat_component_default2 = "/* src/app/chat-component/chat-component.css */\n/*# sourceMappingURL=chat-component.css.map */\n";
  }
});

// src/app/chat-component/chat-component.ts
var ChatComponent;
var init_chat_component3 = __esm({
  "src/app/chat-component/chat-component.ts"() {
    "use strict";
    init_tslib_es6();
    init_chat_component();
    init_chat_component2();
    init_common();
    init_core();
    init_forms();
    ChatComponent = class ChatComponent2 {
      currentUserId = "client-id";
      messageControl = new FormControl("");
      messages = signal([
        {
          senderId: "client-id",
          content: "Hi Coach, I have a question.",
          sentAt: /* @__PURE__ */ new Date()
        },
        { senderId: "coach-id", content: "Sure! Go ahead.", sentAt: /* @__PURE__ */ new Date() }
      ]);
      sendMessage() {
        const content = this.messageControl.value?.trim();
        if (!content)
          return;
        this.messages.update((msgs) => [
          ...msgs,
          { senderId: this.currentUserId, content, sentAt: /* @__PURE__ */ new Date() }
        ]);
        this.messageControl.reset();
      }
    };
    ChatComponent = __decorate([
      Component({
        selector: "app-chat-component",
        imports: [CommonModule, FormsModule, ReactiveFormsModule],
        template: chat_component_default,
        styles: [chat_component_default2]
      })
    ], ChatComponent);
  }
});

// src/app/chat-component/chat-component.spec.ts
var require_chat_component_spec = __commonJS({
  "src/app/chat-component/chat-component.spec.ts"(exports) {
    init_testing();
    init_chat_component3();
    describe("ChatComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ChatComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_chat_component_spec();
//# sourceMappingURL=spec-app-chat-component-chat-component.spec.js.map
