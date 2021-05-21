import counterUpper from './components/counterUpper/counterUpper.vue'
import keyboardInput from './components/keyboard/keyboardInput.vue'
import pwdKeyboard from './components/pwdKeyboard/pwdKeyboard.vue'
import dateUtils from "./methods/dateUtils.js"
import stringUtils from "./methods/stringUtils.js"
import "./style/index.less"
const components = [
  counterUpper,
  keyboardInput,
  pwdKeyboard
]
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
  
  const methodsR = Object.assign(dateUtils,stringUtils)
  Object.keys(methodsR).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype,key)) {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return methodsR[key]
          }
        })
      }
    }
  )
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  install,
  ...components
}

export default API