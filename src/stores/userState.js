import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedUsername = browser && localStorage.getItem('username');
const storedAccNum = browser && localStorage.getItem('accNum')

export const username = writable(storedUsername || '');
export const accountNum = writable(storedAccNum || '');

username.subscribe(value => {
  browser && localStorage.setItem('username', value);
});

 accountNum.subscribe(value => {
  browser && localStorage.setItem('accNum', value)
})