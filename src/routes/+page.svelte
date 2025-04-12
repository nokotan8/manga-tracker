<script>
  import { API_URL, HEADERS } from '$lib';
  import ThemeButton from '$lib/components/ThemeButton.svelte';
</script>

<svelte:head>
  <title>Manga Tracker</title> 
</svelte:head>

<div class='flex flex-col items-center justify-center h-dvh gap-y-5'>
  <h1 class='text-5xl'>
    Name that I'm too lazy to think of
  </h1>
  <p>
    An app to track your manga reading progress
  </p>
  
  <div class='flex flex-row gap-x-5'>
    <a href='/login' class='btn'>Login</a>
    <a href='/register' class='btn'>Register</a>
  </div>
</div>