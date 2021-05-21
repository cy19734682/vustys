<template>
  <span>{{moneyAmount}}</span>
</template>

<script>

  export default {
    name:"counterUpper",
    data() {
      return {
        timer: null,
        moneyAmount: '0.00'
      }
    },
    props: {
      amount: {
        // default: '0'
      },
      time: { // 总时长
        type: Number,
        default: 500
      },
      delay: { // 刷新时间
        type: Number,
        default: 10
      }
    },
    created() {

    },
    mounted() {
      this.moneyAmount = this.amount;
    },
    watch: {
      amount(val) {
        if(this.timer) {
          clearInterval(this.timer);
        }
        if(val === '' || isNaN(val.replace(/[,]/g, ''))) {
          this.moneyAmount = val;
        } else {
          if(parseFloat(val.replace(/[,]/g, '')) != 0) {
            this.counterUpper();
          } else {
            this.moneyAmount = val;
          }
        }
      }
    },
    methods: {
       counterUpper() {
         let money = this.amount;
         let symbol = '';
         if(typeof(money) == 'number') {
           money = money.toString();
         }
         if(money.substr(0, 1) == '+') {
           money = money.substring(1);
           symbol = '+';
         } else if(money.substr(0, 1) == '-') {
           money = money.substring(1);
           symbol = '-';
         }
         let time = this.time;
         let delay = this.delay;
         let divisions = time / delay;
         let num = money || 0;
         let nums = [num];
         let isComma = /[0-9]+,[0-9]+/.test(num);
         num = num.replace(/,/g, '');
         if(isNaN(num) || !num.replace(/\s/g, '')) {
           this.moneyAmount = this.amount;
           return;
         }
         let isFloat = /^[0-9]+\.[0-9]+$/.test(num);
         let decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
         for (let i = divisions; i >= 1; i--) {
             // 默认其为整数
             var newNum = parseInt(Math.round(num / divisions * i));
             // 判断是否为浮点数
             if (isFloat) {
                 newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
             }
             // 判断其是否为带逗号的金额格式
             if (isComma) {
                 while (/(\d+)(\d{3})/.test(newNum.toString())) {
                     newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                 }
             }
             nums.unshift(newNum);
         }
         this.timer = setInterval(() => {
           let newVal = nums.shift();
           if(isNaN(newVal.replace(/[,]/g, '')) || newVal === '') {
             this.moneyAmount = this.amount;
           } else {
             this.moneyAmount = symbol + newVal;
           }

           if(!nums.length) {
             clearInterval(this.timer);
           }
         }, delay)
         this.$once('hook:beforeDestroy', () => {        
          clearInterval(this.timer);                                    
        })
       },
    },
  }
</script>
