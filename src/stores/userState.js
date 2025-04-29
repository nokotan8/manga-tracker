import { writable } from "svelte/store";
import { browser } from "$app/environment";

const storedUsername = browser && localStorage.getItem("username");
const storedToken = browser && localStorage.getItem("token");

export const username = writable(storedUsername || "");
export const token = writable(storedToken || "");

username.subscribe((value) => {
    browser && localStorage.setItem("username", value);
    // If you don't read it chrome won't save it???
    browser && localStorage.getItem("username");
});

token.subscribe((value) => {
    browser && localStorage.setItem("token", value);
    browser && localStorage.getItem("token");
});
