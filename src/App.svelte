<script>
  import numeral from "numeral";

  let time = 60;
  let max = 60;
  let interval = null;

  $: percentage = (time / max) * 100;
  $: timeNumeral = numeral(time).format("00:00:00");

  function start() {
    interval = setInterval(() => {
      time--;
      if (time <= 0) {
        pose();
        return;
      }
    }, 1000);
  }

  function pose() {
    clearInterval(interval);
    interval = null;
  }

  function reset() {
    if (interval) {
      pose();
    }
    time = max;
  }

  function setTime(minutes) {
    reset();

    time = max = minutes * 60;
  }
</script>

<main
  class="flex flex-col items-center justify-center h-screen space-y-3"
  style="background-image: linear-gradient(
      to right,
      rgb(92, 191, 148) 0% {percentage}%,
      white {percentage}%
    );"
>
  <span class="text-7xl md:text-9xl font-bold text-white">{timeNumeral}</span>

  <div class="inline-flex items-center space-x-4">
    {#if !interval}
      <button on:click={start} class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span>Play </span>
      </button>
    {:else}
      <button on:click={pose} class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span>Pause</span>
      </button>
    {/if}
    <button on:click={reset} class="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-5 h-5 mr-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      <span>Reset</span>
    </button>
  </div>
  <div class="inline-flex items-center space-x-4">
    <button on:click={() => setTime(5)} class="button">5 minutes</button>
    <button on:click={() => setTime(15)} class="button">15 minutes</button>
    <button on:click={() => setTime(30)} class="button">30 minutes</button>
    <button on:click={() => setTime(60)} class="button">1 hour</button>
  </div>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .button {
    @apply ring-1 ring-white rounded-full;
    @apply inline-flex items-center;
    @apply px-4 py-2;
    @apply font-bold text-white;
    @apply hover:bg-white hover:text-green-500;
  }
</style>
