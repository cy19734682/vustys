<template>
  <div class="keyboardInput">
    <!-- 自定义输入框 -->
    <div class="input-box" ref="topInput" v-on:click.stop="focus">
      <!-- 右侧内容 -->
      <div class="content">
        <p class="input">{{val}}</p>
        <p class="placeholder" v-show="val.length === 0">
          {{placeholder}}
        </p>
        <!-- 光标 -->
        <p class="cursor" :style="{visibility: cursor ? 'visible' : 'hidden'}"></p>
      </div>
    </div>
    <!-- 自定义键盘 -->
    <keyboard
        :show="keyboard"
        :animated="animated"
        @typing="typing"
        @complete="blur"
    />
  </div>

</template>
<script>
  import keyboard from './keyboard'

  export default {
    name: 'KeyboardInput',
    components: {
      keyboard
    },
    created() {
      this.val = this.value;//初始化输入框的值
    },
    props: {
      value: {
        default: ""
      },
      editValue: {
        default: ""
      },
      animated: {
        default: "animated"
      },
      isNeedMt: {
        default: true
      },
      inter: {
        default: 5
      },
      decimal: {
        default: 2
      },
      placeholder: {
        default: ''
      },
      isPwd: {
        default: false
      },
      isOnlyNum: {
        default: false
      }
    },
    data() {
      return {
        cursor: false,
        keyboard: false, /*value 在组件中的值*/
        val: '',
        pwdVal: '',
        aIllegal: [
          '00',
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '0..',
          '.'
        ],
        cursorDuration: 600,
        bodyHeight: '',
        bodyOverflow: ''
      }
    },
    watch: {
      editValue: function (value) {
        this.val = value;
        this.$emit('input', this.val);
      },
    },
    mounted() {
      document.addEventListener('click', this.blur, false);
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener("click", this.blur, false);
      })
    },
    methods: {
      /**
       * 初始化清空输入框
       */
      initInput() {
        let childLength = this.$parent.$children.length;
        for (let i = 0; i < childLength; i++) {
          if (this.$parent.$children[i].$el.className == 'keyboard') {
            this.$parent.$children[i].val = "";
            this.$parent.$children[i].pwdVal = "";
          }
        }
      }, /*focus*/
      focus() {
        if (this.isNeedMt) {
          this.keyBoardPageScroll();
        }
        this.initKeyBoard();
        /*显示键盘*/
        this.showKeyboard();
        /*显示光标*/
        this.showCursor();
        /*闪烁光标*/
        this.blinkCursor();
        this.openOrColseKey(true);
      }, //点击初始化（解决多个输入框时光标和键盘同时存在的问题）
      initKeyBoard() {
        let childLength = this.$parent.$children.length;
        for (let i = 0; i < childLength; i++) {
          if (this.$parent.$children[i].$el.className == 'keyboard') {
            this.$parent.$children[i].keyboard = false
            this.$parent.$children[i].cursor = false
            clearInterval(this.$parent.$children[i].intervalID);
          }
        }
      },
      blinkCursor() {
        clearInterval(this.intervalID);
        this.intervalID = setInterval(() => {
          this.cursor = !this.cursor;
        }, this.cursorDuration);
      },
      unblinkCursor() {
        clearInterval(this.intervalID);
      }, //处理一些输入框过低时键盘挡住输入框的情况。
      keyBoardPageScroll() {
        let topH = this.$refs.topInput.offsetHeight;//元素的高度
        let heightStyle = this.$refs.topInput.getBoundingClientRect().top; //距离顶部高度
        let h = document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
        let d = h - topH - heightStyle;
        let $article = document.getElementById("app")
        if ($article) {
          let scrollTop = $article.scrollTop;//获取滚动条距离顶部的高度
          if (d < 250) {
            setTimeout(() => {
              $article.setAttribute("style", "margin-top:-" + (250 + scrollTop - d) + 'px');
            }, 200);
          }
        }

      }, /*blur*/
      blur() {
        if (this.isNeedMt) {
          let $article = document.getElementById("app")
          if ($article) {
            if ($article.offsetTop !== 0) {
              $article.setAttribute("style", "margin-top:0");
            }
          }
        }
        /*隐藏光标*/
        this.hideCursor();
        /*停止光标闪烁*/
        this.unblinkCursor();

        /*隐藏键盘*/
        this.hideKeyboard();
        /*
         附加 00, 如果用户输入了一个以 . 结尾的值就点完成了,
         那么这个时候就在后面加上00
         */
        this.toCompletion();
        /*通知父组件, 老子值出来了*/
        /*
         校验用户输入的金额是不是为 0, 如果是的话, 直接重置
         */
        this.checkValue();

        this.notify();
        this.openOrColseKey(false);
      },
      openOrColseKey(bool) {
        this.$emit('isOpenShow', bool);
      },
      showKeyboard() {
        this.keyboard = true;
      },
      hideKeyboard() {
        this.keyboard = false;
      },
      showCursor() {
        this.cursor = true;
      },
      hideCursor() {
        this.cursor = false;
      },
      checkValue() {
        if (!this.isPwd && parseFloat(this.val) === 0) {
          this.val = '';
        }
      }, /*判读是否需要加0*/
      toCompletion() {
        //需要输入密码就不需要加0
        if (this.isPwd || this.decimal <= 0) {
          return;
        }
        if (this.val && this.val.length > 0) {
          let list = this.val.split('.');
          if (typeof list[1] === 'undefined') {
            if (this.val !== '') {
              this.val = this.val + '.';
              this.completion(this.decimal);
            }
          }
          else {
            if (list[1].length < this.decimal) {
              this.completion(this.decimal - list[1].length);
            }
          }
        }
      },
      completion(len) {
        let v = '';
        for (let i = 0; i < len; i++) {
          v = v + '0';
        }
        this.val = this.val + v;
      },
      notify() {
        if (this.isPwd) {
          this.$emit('input', this.pwdVal);
        }
        else {
          this.$emit('input', this.val);
        }
      },
      del() {
        /*删除值并不会触发值的校验, 所以需要手动再触发一次*/
        this.val = this.val.slice(0, -1);
        if (this.isPwd) {
          this.pwdVal = this.pwdVal.slice(0, -1);
        }
        this.notify();
      }, /*输入*/
      typing(value) {
        /*如果是点击删除*/
        if (value === '') {
          this.del();
        }
        let oldValue = '';
        /*保存旧的值*/
        if (this.isPwd) {
          oldValue = this.pwdVal;
          /***判断密码长度***/
          if (this.accuracy(this.val)) {
            /*获取新的值*/
            if (value != '') {
              this.val = this.val + "*";
            }
            this.pwdVal = this.pwdVal + value;
          }
        }
        else {
          oldValue = this.val;
          /*获取新的值*/
          this.val = this.val + value;
          /*检验新值, 如果没有通过检测, 恢复值（不是密码输入框才需要检测）;如果是纯数字也不需要校验规则*/
          if (!this.passCheck(this.val) && !this.isOnlyNum) {
            this.val = oldValue;
            return;
          }
        }
        /*为了让外界同步输入, 需要发送事件*/
        this.notify();
      },
      passCheck(val) {
        /*验证规则*/
        let aRules = [
          this.illegalInput,
          this.illegalValue,
          this.accuracy
        ]
        return aRules.every((item) => {
          return item(val);
        });
      },
      illegalInput(val) {
        if (this.aIllegal.indexOf(val) > -1) {
          return false;
        }
        return true;
      }, /*非法值*/
      illegalValue(val) {
        if (parseFloat(val) != val) {
          return false;
        }
        return true;
      }, /*验证精度*/
      accuracy(val) {
        let v = val.split('.')
        if (v[0].length >= this.inter) {
          return false;
        }
        if (v[1] && (v[1].length) > this.decimal) {
          return false;
        }
        return true;
      }
    }
  }

</script>
