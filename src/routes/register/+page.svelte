<script>
  /** @type {{ data: import('./$types').PageData }} */
  import { API_URL, HEADERS } from '$lib';
  let { data } = $props();

  let errorText = $state('');
  let username = $state('');

  const register = async () => {
    let res = await fetch(`http://${API_URL}/register`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        username: username
      })
    });
    res = await res.json()
    if (!res.acc_num) {
      errorText = res.msg;
    }
  }

  const register_input = (key) => {
    if (key == 'Enter') {
      register();
    }
  }

</script>

<svelte:head>
    <title>Register</title> 
</svelte:head>

<div class='flex flex-col justify-center items-center h-dvh gap-y-4'>
  <h1 class='text-4xl'> Register </h1>
  <form class='flex flex-col items-center'>
    <input
      id='register_input'
      type='text'
      class='input text-center w-100'
      placeholder='Enter a new username'
      bind:value = {username} 
      onkeydown={k => register_input(k.key)}
    >
    <label for='register_input' class='text-error'>{errorText}</label>
  </form>
  <button class='btn' onclick={register}>Register</button>
  <a href='/login' class='btn'>Login Instead</a>
</div>