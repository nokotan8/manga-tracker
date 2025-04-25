<script>
    /** @type {{ data: import('./$types').PageData }} */
    import { API_URL, HEADERS } from "$lib";
    import { goto } from "$app/navigation";
    import { token, username } from "../../../stores/userState";
    import axios from "axios";

    let { data } = $props();
    let givenUsername = $state("");
    let givenPwd = $state("");
    let givenPwdConfirm = $state("");
    let errorText = $state("");

    const login = async () => {
        try {
            const res = await axios.post(
                `http://${API_URL}/auth/login`,
                { username: givenUsername, password: givenPwd },
                { headers: HEADERS },
            );
            username.set(res.data.username);
            token.set(res.data.token);

            goto("/home");
        } catch (error) {
            if (error.response) {
                errorText = error.response.data.msg;
            } else {
                errorText = "Something went wrong";
            }
        }
    };
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="flex flex-col justify-center items-center h-dvh gap-y-4">
    <h1 class="text-4xl">Login</h1>
    <form class="flex flex-col items-center gap-y" onsubmit={login}>
        <input
            id="login_input"
            type="text"
            class="input text-center w-100 mb-3"
            placeholder="Username"
            bind:value={givenUsername}
        />
        <input
            type="password"
            class="input text-center w-100"
            placeholder="Password"
            bind:value={givenPwd}
        />
        <label for="login_input" class="text-error my-2">{errorText}</label>
        <button class="btn" type="submit">Login</button>
    </form>
    <a href="/register" class="btn">Register Instead</a>
</div>

