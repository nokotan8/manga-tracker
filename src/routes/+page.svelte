<script>
  import '../app.css';
  import { API_URL } from '$lib';
  import ThemeButton from '$lib/components/ThemeButton.svelte';

  let errorText = $state('');
  let email = $state('');

  const login = (key) => {
    if (key == 'Enter') {
      console.log('send to backend');
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
    placeholder='Enter a new or existing username'
    bind:value = {email}
    onkeydown={k => login(k.key)}
  >
    <label for='login_input' class='text-error'>{errorText}</label>
</form>
</div>