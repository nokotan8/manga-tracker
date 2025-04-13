<script>
    /** @type {{ data: import('./$types').PageData }} */
    import { API_URL, HEADERS } from '$lib';
    import { goto } from '$app/navigation';
    import { username, accountNum } from '../../../stores/userState';
    import axios from 'axios';

    let { data } = $props();
    let accNum = $state('')
    let errorText = $state('')

    const login = async () => {
      try {
        const res = await axios.post(`http://${API_URL}/auth/login`, { acc_num: accNum }, { headers: HEADERS });
        username.set(res.data.username);
        accountNum.set(accNum);

        goto('/home')
      } catch (error) {
        errorText = error.response.data.msg;
      }
    }
    const login_input = (key) => {
        if (key == 'Enter') {
          login()
        }
    }

</script>

<svelte:head>
    <title>Login</title> 
</svelte:head>

<div class='flex flex-col justify-center items-center h-dvh gap-y-4'>
  <h1 class='text-4xl'> Login </h1>
  <form class='flex flex-col items-center gap-y'>
    <input
      id='login_input'
      type='password'
      class='input text-center w-100'
      placeholder='Account Number'
      bind:value = {accNum}
      onkeydown={k => login_input(k.key)}
    >
    <label for='login_input' class='text-error' >{errorText}</label>
  </form>
  <button class='btn' onclick={login}>Login</button>
  <a href='/register' class='btn'>Register Instead</a>
</div>