<template>
<div class="run-loader"></div>
</template>

<style type="scss" scope lang="scss">
.run-loader {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-width: 5px;
  border-style: solid;
  border-color: #4A9EB1;
  border-right-color: transparent;
  border-radius: 50%;
  animation: loader-rotate 1s linear infinite;
  transition: border-color 2s;
}

@keyframes loader-rotate {
  0% {
    transform: rotate(0);
    border-color: #4A9EB1;
    border-right-color: transparent;
  }
  30% {
     border-color: #4CAF50;
     border-right-color: transparent;
  }
  60% {
     border-color: #aebe14;
     border-right-color: transparent;
  }
  80% {
     border-color: #607D8B;
     border-right-color: transparent;
  }
  100% {
    transform: rotate(360deg);
    border-color: #4A9EB1;
    border-right-color: transparent;
  }
}
</style>