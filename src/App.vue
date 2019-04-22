<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 id="title" class="title has-text-centered">{{ count }}</h1>
        <progress class="progress is-success" :value="timer" :max="max">
          {{ count }}
        </progress>
        <p class="buttons">
          <button class="button" @click="add(1 * 60 * 60)">+ 1 hour</button>
          <button class="button" @click="add(1 * 60)">+ 1 minute</button>
          <button class="button" @click="add(1)">+ 1 second</button>
        </p>
        <p class="buttons">
          <button class="button" @click="start">start</button>
          <button class="button" @click="stop">stop</button>
          <button class="button" @click="reset">reset</button>
        </p>
      </div>
    </div>
    <git-hub-badge />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GitHubBadge from "./components/GitHubBadge.vue";
import numeral from "numeral";

@Component({
  components: {
    GitHubBadge
  }
})
export default class App extends Vue {
  max: number = 0;
  timer: number = 0;
  interval: number = 0;

  get count() {
    return numeral(this.timer).format("00:00:00");
  }

  start(): void {
    if (this.interval > 0) {
      return;
    }
    if (this.timer <= 0) {
      return;
    }
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.interval);
        return;
      }
    }, 1000);
  }

  stop(): void {
    clearInterval(this.interval);
    this.interval = 0;
  }

  add(num: number): void {
    this.timer += num;
    this.max += num;
  }

  reset(): void {
    clearInterval(this.interval);
    this.timer = 0;
    this.max = 0;
    this.interval = 0;
  }
}
</script>

<style lang="scss" scoped>
#title {
  font-size: 15rem;
}
progress {
  height: 3.5rem;
}
</style>
