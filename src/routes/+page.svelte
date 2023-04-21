<script lang="ts">
  import numeral from "numeral";

  let time = 60;
  let max = 60;
  let interval = null;

  $: percentage = (time / max) * 100;
  $: timeNumeral = numeral(time).format("00:00:00");

  function start() {
    if (time <= 0) {
      return;
    }
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

  function setTime(minutes: number) {
    reset();

    time = max = minutes * 60;
  }

  function addTime(minutes: number) {
    reset();

    const tmp = time;
    if (tmp + minutes * 60 <= 0) {
      time = max = 0;
      return;
    }
    time = max = time + minutes * 60;
  }
</script>

<main
  class="main"
  style="background-image: linear-gradient(
      to top,
      rgb(92, 191, 148) 0% {percentage}%,
      white {percentage}%
    );"
>
  <span class="time">{timeNumeral}</span>

  <div class="buttons">
    {#if !interval}
      <button on:click={start} class="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="icon"
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
          class="icon"
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
        class="icon"
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
  <div class="buttons">
    <button on:click={() => addTime(-60)} class="button">-1h</button>
    <button on:click={() => addTime(-1)} class="button">-1m</button>
    <button on:click={() => setTime(0)} class="button">0</button>
    <button on:click={() => addTime(1)} class="button">+1m</button>
    <button on:click={() => addTime(60)} class="button">+1h</button>
  </div>
</main>

<style lang="postcss">
  .main {
    @apply flex flex-col space-y-3;
    @apply items-center justify-center;
    @apply h-screen;
  }

  .time {
    @apply text-7xl md:text-9xl;
    @apply font-bold text-gray-700;
  }

  .buttons {
    @apply inline-flex space-x-4;
    @apply items-center;
  }
  .button {
    @apply ring-1 ring-gray-700 rounded-full;
    @apply inline-flex items-center;
    @apply px-4 py-2;
    @apply font-bold text-gray-700;
    @apply hover:bg-gray-700 hover:text-green-500;
  }

  .icon {
    @apply w-5 h-5;
    @apply mr-2;
  }
</style>
