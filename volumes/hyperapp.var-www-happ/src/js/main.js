import "../../node_modules/jquery/dist/jquery.js"
import "../../node_modules/popper.js/dist/umd/popper.js"
import "../../node_modules/bootstrap/dist/js/bootstrap.js"
import { h, app } from "hyperapp"

const MAX_LENGTH = 120;
const OFFSET = 10;

const OverflowWidget = ({ text, offset, count }) => (
  <div class="overflow">
    <h1>Whoops! Too long.</h1>
    <p>
      ...{text.slice(0, offset)}
      <span class="overflow-text">{text.slice(count)}</span>
    </p>
  </div>
);

const Tweetbox = ({ count, text, update }) => (
  <main>
    <div class="container">
      <ul class="flex-outer">
        <li>
          <textarea placeholder="What's up?" value={text} oninput={update} />
        </li>

        <li class="flex-inner">
          <span class={count > OFFSET ? "" : "overflow-count"}>{count}</span>

          <button
            onclick={() => alert(text)}
            disabled={count >= MAX_LENGTH || count < 0}
          >
            Tweet
          </button>
        </li>
      </ul>

      {count < 0 && (
        <OverflowWidget
          text={text.slice(count - OFFSET)}
          offset={OFFSET}
          count={count}
        />
      )}
    </div>
  </main>
);

const state = {
  text: "",
  count: MAX_LENGTH
};

const actions = {
  update: text => state => ({
    text,
    count: state.count + state.text.length - text.length
  })
};

const view = (state, actions) => (
  <Tweetbox
    text={state.text}
    count={state.count}
    update={e => actions.update(e.target.value)}
  />
);

const main = app(state, actions, view, document.body);