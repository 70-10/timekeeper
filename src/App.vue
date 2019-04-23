<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 id="title" class="title has-text-centered">{{ count }}</h1>
        <progress class="progress is-success" :value="timer" :max="max">{{ count }}</progress>
        <div class="columns is-mobile">
          <div class="column is-one-third">
            <div class="has-text-centered">
              <h2 class="subtitle">Hour</h2>
            </div>
            <p class="buttons has-addons is-centered">
              <button class="button" @click="subtract(1 * 60 * 60)">
                <span class="icon">
                  <i class="fas fa-minus"></i>
                </span>
              </button>
              <button class="button" @click="add(1 * 60 * 60)">
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
              </button>
            </p>
          </div>
          <div class="column is-one-third">
            <div class="has-text-centered">
              <h2 class="subtitle">Minute</h2>
            </div>
            <p class="buttons has-addons is-centered">
              <button class="button" @click="subtract(1 * 60 )">
                <span class="icon">
                  <i class="fas fa-minus"></i>
                </span>
              </button>
              <button class="button" @click="add(1 * 60 )">
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
              </button>
            </p>
          </div>
          <div class="column is-one-third">
            <div class="has-text-centered">
              <h2 class="subtitle">Second</h2>
            </div>
            <p class="buttons has-addons is-centered">
              <button class="button" @click="subtract(1)">
                <span class="icon">
                  <i class="fas fa-minus"></i>
                </span>
              </button>
              <button class="button" @click="add(1)">
                <span class="icon">
                  <i class="fas fa-plus"></i>
                </span>
              </button>
            </p>
          </div>
        </div>

        <p class="buttons has-addons is-centered">
          <button class="button" @click="set(5 * 60)">5 minutes</button>
          <button class="button" @click="set(15 * 60)">15 minutes</button>
          <button class="button" @click="set(20 * 60)">20 minutes</button>
          <button class="button" @click="set(30 * 60)">30 minutes</button>
        </p>

        <p class="buttons">
          <button class="button" @click="start">start</button>
          <button class="button" @click="stop">stop</button>
          <button class="button" @click="reset">reset</button>
        </p>
      </div>
    </div>
    <git-hub-badge/>
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

  set(num: number): void {
    this.timer = num;
    this.max = num;
  }

  add(num: number): void {
    this.timer += num;
    this.max += num;
  }

  subtract(num: number): void {
    if (this.max <= 0) {
      return;
    }

    if (this.max - num <= 0) {
      this.reset();
      return;
    }

    this.add(-1 * num);
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
