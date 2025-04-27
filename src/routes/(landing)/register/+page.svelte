<script>
    /** @type {{ data: import('./$types').PageData }} */
    import { API_URL, HEADERS } from "$lib";
    import { goto } from "$app/navigation";
    import { token, username } from "../../../stores/userState";
    import axios from "axios";

    let { data } = $props();

    let errorText = $state("");
    let givenUsername = $state("");
    let givenPwd = $state("");
    let givenPwdConfirm = $state("");

    const register = async () => {
        if (givenPwd.localeCompare(givenPwdConfirm)) {
            errorText = "Passwords do not match";
            return;
        }

        try {
            const res = await axios.post(
                `http://${API_URL}/auth/register`,
                { username: givenUsername, password: givenPwd },
                { headers: HEADERS },
            );

            username.set(givenUsername);
            token.set(res.data.token);

            goto("/home");
        } catch (error) {
            if (error.response) {
                errorText = error.response.data.errors[0];
            } else {
                errorText = "Something went wrong";
            }
        }
    };
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<div class="flex flex-col gap-y-4 justify-center items-center h-dvh">
    <h1 class="text-4xl">Register</h1>
    <form class="flex flex-col gap-y-3 items-center">
        <input
            id="register_input"
            type="text"
            class="text-center input w-100"
            placeholder="Username"
            bind:value={givenUsername}
        />
        <input
            type="password"
            class="text-center input w-100"
            placeholder="Password"
            bind:value={givenPwd}
        />
        <input
            type="password"
            class="text-center input w-100"
            placeholder="Confirm Password"
            bind:value={givenPwdConfirm}
        />
        <label for="register_input" class="text-error">{errorText}</label>
        <button class="btn" onclick={register}>Register</button>
    </form>
    <a href="/login" class="mt-0 btn">Login Instead</a>
</div>
