##counterUpper 模拟键盘金额输入框

###属性
* value：数字，输入值，推荐使用v-model绑定
* editValue：数字，想要修改的值
* animated：字符串，动画，默认animated
* isNeedMt：布尔值，是否需要阻止遮挡输入框，默认true
* inter：数字，输入精度（最大长度），默认5
* decimal：数字，保留几位小数，默认2
* placeholder：字符串，输入框提示
* isPwd：布尔值，是否是密码输入框
* isOnlyNum：布尔值，是否是存数字

###事件
* input：输入值回调
* isOpenShow：通知父组件输入框已弹起