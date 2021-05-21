<template>
  <transition name="slide">
    <div class="keyboard" :class="animated" v-show="show" v-on:click.stop="fn">
      <!-- 完成 按钮-->
      <div class="done">
        <p class="text" v-on:click.stop="complete">完成</p>
      </div>
      <!-- 键盘区域 -->
      <div class="list">
        <div class="key" v-on:click.stop="typing('1')">1</div>
        <div class="key" v-on:click.stop="typing('2')">2</div>
        <div class="key" v-on:click.stop="typing('3')">3</div>
        <div class="key" v-on:click.stop="typing('4')">4</div>
        <div class="key" v-on:click.stop="typing('5')">5</div>
        <div class="key" v-on:click.stop="typing('6')">6</div>
        <div class="key" v-on:click.stop="typing('7')">7</div>
        <div class="key" v-on:click.stop="typing('8')">8</div>
        <div class="key" v-on:click.stop="typing('9')">9</div>
        <div
            class="key dot"
            v-on:click.stop="typing('.')"
        >
          <i class="iconfont icon-dot"></i>
        </div>
        <div
            class="key"
            v-on:click.stop="typing('0')"
        >0
        </div>
        <div
            class="key"
            v-on:click.stop="typing('')"
        >
          <i class="iconfont icon-keyboard-delete del"></i>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
  export default {
    name: "keyboard",
    props: {
      show: {
        default: false
      },
      animated: {
        default: "animated"
      },
    },
    methods: {
      /*防止点击完成按钮左边的空白区域收起键盘*/
      fn() {
      }, /*输入*/
      typing(val) {
        this.$emit('typing', val);
      }, /*点击完成*/
      complete() {
        this.$emit('complete');
      }
    }
  }
</script>