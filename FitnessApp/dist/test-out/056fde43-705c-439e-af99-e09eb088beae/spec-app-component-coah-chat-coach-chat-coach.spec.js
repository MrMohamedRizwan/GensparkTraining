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
  __spreadProps,
  __spreadValues,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-X6QY723D.js";

// angular:jit:template:src/app/component/coah/chat-coach/chat-coach.html
var chat_coach_default;
var init_chat_coach = __esm({
  "angular:jit:template:src/app/component/coah/chat-coach/chat-coach.html"() {
    chat_coach_default = `<div class="container py-4" style="max-width: 900px">
  <div class="row rounded shadow bg-white">
    <!-- Sidebar: Clients List -->
    <div class="col-md-4 border-end px-0" style="background: #f8f9fa">
      <div class="p-3 border-bottom">
        <h5 class="mb-0 text-primary fw-bold">Clients</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li
          *ngFor="let client of clientList()"
          class="list-group-item list-group-item-action py-3"
          [class.active]="selectedClientId() === client"
          (click)="selectClient(client)"
          style="cursor: pointer"
        >
          <i class="bi bi-person-circle me-2 text-secondary"></i>
          {{ client }}
        </li>
      </ul>
    </div>

    <!-- Main Chat Area -->
    <div class="col-md-8 d-flex flex-column px-0" *ngIf="selectedClientId()">
      <!-- Chat Header -->
      <div class="p-3 border-bottom bg-light d-flex align-items-center">
        <i class="bi bi-chat-dots fs-4 text-primary me-2"></i>
        <span class="fw-semibold">Chat with {{ selectedClientId() }}</span>
      </div>
      <!-- Messages -->
      <div
        class="flex-grow-1 overflow-auto px-3 py-3"
        style="background: #f6f8fa; min-height: 350px; max-height: 400px"
      >
        <div *ngFor="let msg of activeMessages">
          <div
            class="d-flex mb-3"
            [ngClass]="{'justify-content-end': msg.senderId === currentUserId, 'justify-content-start': msg.senderId !== currentUserId}"
          >
            <div>
              <div
                class="px-3 py-2 rounded-3 shadow-sm"
                [ngClass]="{
                  'bg-primary text-white': msg.senderId === currentUserId,
                  'bg-white border': msg.senderId !== currentUserId
                }"
                style="max-width: 350px; word-break: break-word"
              >
                {{ msg.content }}
              </div>
              <div
                class="small text-muted mt-1 text-end"
                style="font-size: 0.8em"
              >
                {{ msg.sentAt | date: 'shortTime' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Message Input -->
      <form
        (ngSubmit)="sendMessage()"
        class="d-flex gap-2 border-top p-3 bg-white"
      >
        <input
          type="text"
          [formControl]="messageControl"
          class="form-control"
          placeholder="Type your message..."
          autocomplete="off"
        />
        <button
          type="submit"
          class="btn btn-primary px-4"
          [disabled]="!messageControl.value || messageControl.disabled"
        >
          <i class="bi bi-send"></i>
        </button>
      </form>
    </div>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/component/coah/chat-coach/chat-coach.css
var chat_coach_default2;
var init_chat_coach2 = __esm({
  "angular:jit:style:src/app/component/coah/chat-coach/chat-coach.css"() {
    chat_coach_default2 = "/* src/app/component/coah/chat-coach/chat-coach.css */\n/*# sourceMappingURL=chat-coach.css.map */\n";
  }
});

// src/app/component/coah/chat-coach/chat-coach.ts
var ChatCoach;
var init_chat_coach3 = __esm({
  "src/app/component/coah/chat-coach/chat-coach.ts"() {
    "use strict";
    init_tslib_es6();
    init_chat_coach();
    init_chat_coach2();
    init_common();
    init_core();
    init_forms();
    ChatCoach = class ChatCoach2 {
      currentUserId = "coach-id";
      // This is the coach
      selectedClientId = signal(null);
      // Currently active chat
      clientList = signal(["test1", "test2", "test3"]);
      // Can come from API
      // Store messages per client
      chatMap = signal({
        test1: [
          {
            senderId: "test1",
            content: "Hi Coach, I have a question.",
            sentAt: /* @__PURE__ */ new Date()
          },
          {
            senderId: "coach-id",
            content: "Sure! Go ahead.",
            sentAt: /* @__PURE__ */ new Date()
          }
        ],
        test2: [],
        test3: []
      });
      messageControl = new FormControl("");
      get activeMessages() {
        const id = this.selectedClientId();
        return id ? this.chatMap()[id] || [] : [];
      }
      selectClient(clientId) {
        this.selectedClientId.set(clientId);
      }
      sendMessage() {
        const content = this.messageControl.value?.trim();
        if (!content || !this.selectedClientId())
          return;
        const clientId = this.selectedClientId();
        const newMessage = {
          senderId: this.currentUserId,
          content,
          sentAt: /* @__PURE__ */ new Date()
        };
        this.chatMap.update((chats) => {
          const existing = chats[clientId] || [];
          return __spreadProps(__spreadValues({}, chats), {
            [clientId]: [...existing, newMessage]
          });
        });
        this.messageControl.reset();
      }
    };
    ChatCoach = __decorate([
      Component({
        selector: "app-chat-coach",
        imports: [CommonModule, FormsModule, ReactiveFormsModule],
        template: chat_coach_default,
        styles: [chat_coach_default2]
      })
    ], ChatCoach);
  }
});

// src/app/component/coah/chat-coach/chat-coach.spec.ts
var require_chat_coach_spec = __commonJS({
  "src/app/component/coah/chat-coach/chat-coach.spec.ts"(exports) {
    init_testing();
    init_chat_coach3();
    describe("ChatCoach", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ChatCoach]
        }).compileComponents();
        fixture = TestBed.createComponent(ChatCoach);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_chat_coach_spec();
//# sourceMappingURL=spec-app-component-coah-chat-coach-chat-coach.spec.js.map
