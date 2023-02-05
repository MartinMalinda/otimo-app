<template>
  <!-- https://codepen.io/householdjob/pen/NQoebd -->
  <div class="scroll-prompt">
    <div class="scroll-prompt-arrow-container">
      <div class="scroll-prompt-arrow">
        <div></div>
      </div>
      <div class="scroll-prompt-arrow">
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color: white;

.scroll-prompt {

  .scroll-prompt-arrow-container {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -18px;
    animation-name: bounce;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }

  .scroll-prompt-arrow {
    animation-name: opacity;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }

  .scroll-prompt-arrow:last-child {
    animation-direction: reverse;
    margin-top: -6px;
  }

  .scroll-prompt-arrow>div {
    width: 16px;
    height: 16px;
    border-right: 2px solid $color;
    border-bottom: 2px solid $color;
    transform: rotate(45deg) translateZ(5px);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(10px);
  }
}
</style>
