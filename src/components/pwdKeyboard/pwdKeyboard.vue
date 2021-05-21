<!--
    属性:
    isShow: Boolean, 组件是否可见，使用 v-model 绑定
    title： 组件标题
    cancel-text: 取消按钮的显示文字
    forget-show: 是否显示‘忘记密码？’
    mask:  Boolean, 是否需要显示遮罩层，默认：true
    disorder: Boolean, 键值是否混乱排序，默认：false
    pwdLength:Number 密码长度，输入完成自动提交，默认0不作限制
    事件: 
    @onHide: 点击取消 或 遮罩层时触发，组件同时关闭
    @onForget: 点击‘忘记密码’时触发
    @onComplete: 完成事件，当输入密码长度到达6位填满空格时触发，提交请求一般写在此事件的监听事件中, 参数argument === password(输入的密码,String)
-->
<template>
  <div class="h-password-keyboard-component">
    <div :class="{'h-maskbg': mask}" v-if="isShow" @click="_onCancel"></div>
    <transition name="slide">
      <div class="h-pkc-content animated" v-if="isShow" @click.stop.prevent="">
        <div class="h-pkc-header">
          <span @click="_onCancel" class="cancel-btn">{{cancelText}}</span>
          <span @click="_onConfirm" class="ok-btn" v-if="pwdLength === 0">{{okText}}</span>
          <h4 class="h-pkc-title">{{title}}</h4>
        </div>
        <div class="password-show-box">
          <span v-for="(item, index) in password" :key="'key1'+index" :class="{on: password[index]}"></span>
        </div>
        <div class="forget-box" v-if="forgetShow"><span class="forget-btn" @click="_onForget">忘记密码？</span></div>
        <div class="h-keyboard">

          <table v-if="keyType==='1'" class="h-keyboard-table" border="0" cellspacing="0" cellpadding="0">
            <tr v-for="(row, num) in [0,1,2,3]" :key="'key2'+num">
              <template v-if="row !== 3">
                <td v-for="(item, index) in [0,1,2]" :key="'key3'+index"><span
                    @click.stop="_keyEvent($event)"
                ><i>{{keyCode[num*3+1+index]}}</i></span></td>
              </template>
              <template v-else>
                <td @click="_changeKeyType('2')"><span><i>abc</i></span></td>
                <td><span class="single" @click="_keyEvent($event)"><i>{{keyCode[0]}}</i></span></td>
                <td><span @click="_keyEvent($event,'del')" class="delone keybg"><img
                    class="del"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAhCAMAAAChvXjxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEIUExURQAAAOXl5eXl5a+vr8nJyb29veXl5eXl5eXl5eHh4dPT09XV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5dvb2+Xl5eXl5eXl5dzc3OXl5eXl5eXl5eXl5dzc3OXl5WJiYuXl5cPDw8vLy+Xl5eXl5cvLy9vb2+Xl5eXl5Xt7e+Xl5eHh4eTk5JCQkOTk5EZGRvT09G1tbfb29vf393BwcG5ubnR0dFlZWU9PT0pKSldXV0dHR5+fn2FhYW9vb4yMjH19fVFRUWBgYGhoaP///2JiYsPDw3Z2dufn52NjY4KCgoqKiuzs7O3t7Xp6emVlZXt7e5CQkFRUVOPj43Nzc5iYmJKSklHv7cEAAAAwdFJOUwB6bP6B/gh/YICAf0Z1dHwUJH4VRYFUOGOBN3MmaoCA/mn9f1VxgH9XU/5Hf4D+f2uUVSgAAAEpSURBVDjLndVnUwIxEAbgtQJ2xN4VRLHgckqxYUWxYQH1//8T94YBkk0u3l6+3dw8N3t5NxsAdS0/3uG/q6IRWM3eIgpVfLSCoZZi5hYfUIpmElcoRfOxG5SiZOwapWhq8hKlaLhv4IK9eG956mPx7YWjiaEz/rX7k4KiiseFD4b6B0/NGsqKIlNi5cVHzm2V9xQzPsrtVO3/21HcEBo78IJ2qa0MQ+jwM3hvfWUaQl+uREiZhlDTmeNPrfZrCTfvMlSbllcHHe05TenbVAD7Cc9l9JS7Oe3OVl3GovyOWLB3RG+vuQruPTUfptpdPm7pci0fUs8hztNrQ8u0/FQ3Tm5qWn5yAVbW5TMCYCnCNKIjEmHuAWTWNuQo0iwH2EzLbw2A7a1Q99MfsT0bCCNxrYAAAAAASUVORK5CYII="
                    height="16" width="26"
                /></span></td>
              </template>
            </tr>
          </table>
          <table v-if="keyType==='2'" class="h-keyboard-table-abc" border="0" cellspacing="0" cellpadding="0">
            <tr v-for="(row, num) in [0,1,2,3]" :key="'key4'+num">
              <template v-if="row !== 3">
                <td v-for="(item, index) in [0,1,2,3,4,5,6,7]" :key="'key5'+index"><span
                    @click.stop="_keyEvent($event)"
                ><i>{{abckeyCode[num*8+2+index]}}</i></span>
                </td>
              </template>
              <template v-else>
                <td @click="_changeKeyType('1')" colspan="2"><span><i>123</i></span></td>
                <td @click="_changeKeyType('3')" colspan="2"><span><i>ABC</i></span></td>
                <td><span class="single" @click="_keyEvent($event)"><i>{{abckeyCode[0]}}</i></span></td>
                <td><span class="single" @click="_keyEvent($event)"><i>{{abckeyCode[1]}}</i></span></td>
                <td colspan="2"><span @click="_keyEvent($event,'del')" class="delone keybg"><img
                    class="del"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAhCAMAAAChvXjxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEIUExURQAAAOXl5eXl5a+vr8nJyb29veXl5eXl5eXl5eHh4dPT09XV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5dvb2+Xl5eXl5eXl5dzc3OXl5eXl5eXl5eXl5dzc3OXl5WJiYuXl5cPDw8vLy+Xl5eXl5cvLy9vb2+Xl5eXl5Xt7e+Xl5eHh4eTk5JCQkOTk5EZGRvT09G1tbfb29vf393BwcG5ubnR0dFlZWU9PT0pKSldXV0dHR5+fn2FhYW9vb4yMjH19fVFRUWBgYGhoaP///2JiYsPDw3Z2dufn52NjY4KCgoqKiuzs7O3t7Xp6emVlZXt7e5CQkFRUVOPj43Nzc5iYmJKSklHv7cEAAAAwdFJOUwB6bP6B/gh/YICAf0Z1dHwUJH4VRYFUOGOBN3MmaoCA/mn9f1VxgH9XU/5Hf4D+f2uUVSgAAAEpSURBVDjLndVnUwIxEAbgtQJ2xN4VRLHgckqxYUWxYQH1//8T94YBkk0u3l6+3dw8N3t5NxsAdS0/3uG/q6IRWM3eIgpVfLSCoZZi5hYfUIpmElcoRfOxG5SiZOwapWhq8hKlaLhv4IK9eG956mPx7YWjiaEz/rX7k4KiiseFD4b6B0/NGsqKIlNi5cVHzm2V9xQzPsrtVO3/21HcEBo78IJ2qa0MQ+jwM3hvfWUaQl+uREiZhlDTmeNPrfZrCTfvMlSbllcHHe05TenbVAD7Cc9l9JS7Oe3OVl3GovyOWLB3RG+vuQruPTUfptpdPm7pci0fUs8hztNrQ8u0/FQ3Tm5qWn5yAVbW5TMCYCnCNKIjEmHuAWTWNuQo0iwH2EzLbw2A7a1Q99MfsT0bCCNxrYAAAAAASUVORK5CYII="
                    height="16" width="26"
                /></span></td>
              </template>
            </tr>
          </table>
          <table v-if="keyType==='3'" class="h-keyboard-table-abc" border="0" cellspacing="0" cellpadding="0">
            <tr v-for="(row, num) in [0,1,2,3]" :key="'key6'+num">
              <template v-if="row !== 3">
                <td v-for="(item, index) in [0,1,2,3,4,5,6,7]" :key="'key7'+index"><span
                    @click.stop="_keyEvent($event)"
                ><i>{{ABCkeyCode[num*8+2+index]}}</i></span>
                </td>
              </template>
              <template v-else>
                <td @click="_changeKeyType('1')" colspan="2"><span><i>123</i></span></td>
                <td @click="_changeKeyType('2')" colspan="2"><span><i>abc</i></span></td>
                <td><span class="single" @click="_keyEvent($event)"><i>{{ABCkeyCode[0]}}</i></span></td>
                <td><span class="single" @click="_keyEvent($event)"><i>{{ABCkeyCode[1]}}</i></span></td>
                <td colspan="2"><span @click="_keyEvent($event,'del')" class="delone keybg"><img
                    class="del"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAhCAMAAAChvXjxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEIUExURQAAAOXl5eXl5a+vr8nJyb29veXl5eXl5eXl5eHh4dPT09XV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5dvb2+Xl5eXl5eXl5dzc3OXl5eXl5eXl5eXl5dzc3OXl5WJiYuXl5cPDw8vLy+Xl5eXl5cvLy9vb2+Xl5eXl5Xt7e+Xl5eHh4eTk5JCQkOTk5EZGRvT09G1tbfb29vf393BwcG5ubnR0dFlZWU9PT0pKSldXV0dHR5+fn2FhYW9vb4yMjH19fVFRUWBgYGhoaP///2JiYsPDw3Z2dufn52NjY4KCgoqKiuzs7O3t7Xp6emVlZXt7e5CQkFRUVOPj43Nzc5iYmJKSklHv7cEAAAAwdFJOUwB6bP6B/gh/YICAf0Z1dHwUJH4VRYFUOGOBN3MmaoCA/mn9f1VxgH9XU/5Hf4D+f2uUVSgAAAEpSURBVDjLndVnUwIxEAbgtQJ2xN4VRLHgckqxYUWxYQH1//8T94YBkk0u3l6+3dw8N3t5NxsAdS0/3uG/q6IRWM3eIgpVfLSCoZZi5hYfUIpmElcoRfOxG5SiZOwapWhq8hKlaLhv4IK9eG956mPx7YWjiaEz/rX7k4KiiseFD4b6B0/NGsqKIlNi5cVHzm2V9xQzPsrtVO3/21HcEBo78IJ2qa0MQ+jwM3hvfWUaQl+uREiZhlDTmeNPrfZrCTfvMlSbllcHHe05TenbVAD7Cc9l9JS7Oe3OVl3GovyOWLB3RG+vuQruPTUfptpdPm7pci0fUs8hztNrQ8u0/FQ3Tm5qWn5yAVbW5TMCYCnCNKIjEmHuAWTWNuQo0iwH2EzLbw2A7a1Q99MfsT0bCCNxrYAAAAAASUVORK5CYII="
                    height="16" width="26"
                /></span></td>
              </template>
            </tr>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'pwdKeyboard',
    data() {
      return {
        isShow: false,
        keyCode: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ],
        abckeyCode: [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z'
        ],
        ABCkeyCode: [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ],
        password: [],
        keyType: '1' //1 数字 ，2 小写字母 ，3 大写字母
      }
    },
    props: {
      title: {
        type: String,
        default: '请输入密码'
      },
      forgetShow: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      okText: {
        type: String,
        default: '确认'
      },
      mask: {
        type: Boolean,
        default: true
      },
      disorder: {
        type: Boolean,
        default: false
      },
      pwdLength: {
        type: Number,
        default: 0
      }
    },
    watch: {
      password(val) {
        if (this.pwdLength > 0 && val.length >= this.pwdLength) {
          this.$emit('onComplete', this.password.join(''))
          this._onCancel()
        }
      },
    },
    created() {
      this._keyInit()
    },
    methods: {
      open() {
        this.isShow = true
        this._keyInit()
      },
      _keyInit() {
        this.password = []
        if (this.disorder) {
          this.keyCode.sort(function () {
            return 0.5 - Math.random()
          })
          this.abckeyCode.sort(function () {
            return 0.5 - Math.random()
          })
          this.ABCkeyCode.sort(function () {
            return 0.5 - Math.random()
          })
        }
      },
      _keyEvent(e, type) {
        let len = this.password.length
        if (type === 'del') {
          this.password.pop()
          return
        }
        if (this.pwdLength > 0 && len >= this.pwdLength) {
          return
        }
        this.password.push(e.currentTarget.innerText)
      },
      _onCancel() {
        this.password = []
        this.isShow = false
      },
      _onConfirm() {
        let len = this.password.length
        if (len < 1) {
          return
        }
        this.$emit('onComplete', this.password.join(''))
        this._onCancel()
      },
      _onForget() {
        this.$emit('onForget')
      },
      _onHide() {
        this.$emit('onHide')
      },
      _changeKeyType(type) {
        this.keyType = type;
      }
    }
  }
  document.addEventListener('click', function () {
  }, false);
</script>
