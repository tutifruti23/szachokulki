<template>
  <view class="container">
    <board-component >
  </view>
</template>

<script>
import BoardComponent from './components/board.vue';

export default {
  components: {
    BoardComponent
  }
};
</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
.test {
  background-color: pink;
  width: 20px;
  height: 20px;
  display: flex;
}
</style>
