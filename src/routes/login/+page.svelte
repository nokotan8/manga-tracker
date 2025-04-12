<script>
    /** @type {{ data: import('./$types').PageData }} */
    import { API_URL, HEADERS } from '$lib';

    let { data } = $props();
    let acc_num = $state('')
    let errorText = $state('')

    const login = async () => {
        let res = await fetch(`http://${API_URL}/login`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          acc_num: acc_num
        })
      });
      res = await res.json()
      if (!res.username) {
        errorText = res.msg;
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
      bind:value = {acc_num}
      onkeydown={k => login_input(k.key)}
    >
    <label for='login_input' class='text-error' >{errorText}</label>
  </form>
  <button class='btn' onclick={login}>Login</button>
  <a href='/register' class='btn'>Register Instead</a>
</div>