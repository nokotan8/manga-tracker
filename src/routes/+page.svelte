<script>
  import '../app.css';
  import { API_URL, HEADERS } from '$lib';
  import ThemeButton from '$lib/components/ThemeButton.svelte';

  let errorText = $state('');
  let username = $state('');

  const login = (key) => {
    if (key == 'Enter') {
      fetch(`http://${API_URL}/register`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          username: username
        })
      });
    } else {
      errorText = '';
    }
  }
</script>

<svelte:head>
  <title>Home</title> 
</svelte:head>
<ThemeButton></ThemeButton>
<div class='flex flex-col items-center justify-center h-dvh gap-y-5'>
  <h1 class='text-5xl'>
    Name that I'm too lazy to think of
  </h1>
  <p>
    An app to track your manga reading progress
  </p>
  
  <form class='flex flex-col items-center gap-y-2'>
    <input
    id='login_input'
    type='text'
    class='input text-center w-100'
    placeholder='Enter a new username'
    bind:value = {username}
    onkeydown={k => login(k.key)}
  >
    <label for='login_input' class='text-error'>{errorText}</label>
</form>
</div>