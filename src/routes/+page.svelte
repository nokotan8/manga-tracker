<script>
  import '../app.css'
  import { API_URL } from '$lib';

  let errorText = ''
  let email = ''

  const login = (key) => {
    if (key == 'Enter') {
      // Email regex
      if (/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
        console.log('send to backend')
      } else {
        errorText = 'Please enter a valid email'
      }
    } else {
      errorText = ''
    }
  }
</script>

<svelte:head>
  <title>Home</title> 
</svelte:head>

<div class='flex flex-col items-center justify-center h-dvh gap-5'>
  <h1 class='text-5xl'>
    Name that I'm too lazy to think of
  </h1>
  <p>
    An app to track your manga reading progress
  </p>

  <input
    id='login_input'
    type='text'
    class='input text-center'
    placeholder='Enter your email to get started'
    bind:value = {email}
    on:keydown={k => login(k.key)}
  >
  <label for='login_input'>{errorText}</label>
</div>


