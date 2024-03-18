import Vue from 'vue'
import './style.css'
import RegistrationForm from './RegistrationForm.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(RegistrationForm),
}).$mount('#registrationForm')
