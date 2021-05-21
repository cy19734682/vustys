##counterUpper 模拟密码输入框

###属性
* title：字符串，标题
* forgetShow：布尔值，是否显示修改密码
* cancelText：字符串，取消按钮文案，默认“取消”
* okText：字符串，确认按钮文案，默认“确认”
* mask：布尔值，是否显示遮罩，默认true
* disorder：布尔值，键盘是否乱序，默认false
* pwdLength：数字，密码长度，输入完成自动提交，默认0不作限制

###事件
* onComplete：输入完成回调
* onForget：忘记密码点击回调
* onHide：关闭弹框回调