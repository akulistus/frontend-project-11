import { string } from "yup";
import { render } from "./renderer";
import onChange from "on-change";

const state = {
    validInput: true,
    links: [],
};

const watchedState = onChange(state, (path, value, prevValue) => render(state));

const urlChecker = string().url();

export { watchedState, urlChecker };