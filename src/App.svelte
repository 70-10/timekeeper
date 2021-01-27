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
        clearInterval(interval);
        return;
      }
    }, 1000);
  }

  function pose() {
    clearInterval(interval);
    interval = null;
  }

  const reset = () => {
    if (interval) {
      pose();
    }
    time = 60;
    max = 60;
  };
</script>

<main
  class="flex flex-col items-center justify-center h-screen"
  style="background-image: linear-gradient(
      to right,
      rgb(92, 191, 148) 0% {percentage}%,
      white {percentage}%
    );"
>
  <span class="text-7xl md:text-9xl font-bold">{timeNumeral}</span>

  {#if !interval}
    <button on:click={start} class="border rounded-lg bg-white py-1 px-3"
      >start</button
    >
  {:else}
    <button on:click={pose} class="border rounded-lg bg-white py-1 px-3"
      >Pose</button
    >
  {/if}
  <br />
  <button on:click={reset} class="border rounded-lg bg-white py-1 px-3"
    >Reset</button
  >
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
