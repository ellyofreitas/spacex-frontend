<template>
  <section>
    <div class="stars stars1"></div>
    <div class="stars stars2"></div>
    <div class="stars stars3"></div>
    <div class="stars stars4"></div>
    <div class="stars stars5"></div>
    <div class="stars stars6"></div>
    <div class="stars stars7"></div>
    <div class="stars stars8"></div>
    <slot />
  </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000200;
  display: flex;
  justify-content: center;
  align-items: center;
}
section .stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  animation: animate 8s ease-in-out infinite, backgroundmove 16s linear infinite;
}
section .stars.stars1 {
  animation-delay: 0s;
  background: url('../assets/star1.png');
}
section .stars.stars2 {
  animation-delay: -1s;
  background: url('../assets/star2.png');
}
section .stars.stars3 {
  animation-delay: -2s;
  background: url('../assets/star3.png');
}
section .stars.stars4 {
  animation-delay: -3s;
  background: url('../assets/star4.png');
}
section .stars.stars5 {
  animation-delay: -4s;
  background: url('../assets/star5.png');
}
section .stars.stars6 {
  animation-delay: -5s;
  background: url('../assets/star6.png');
}
section .stars.stars7 {
  animation-delay: -6s;
  background: url('../assets/star7.png');
}
section .stars.stars8 {
  animation-delay: -7s;
  background: url('../assets/star8.png');
}
@keyframes animate {
  0%,
  20%,
  40%,
  60%,
  80%,
  100% {
    opacity: 0;
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    opacity: 1;
  }
}
@keyframes backgroundmove {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
