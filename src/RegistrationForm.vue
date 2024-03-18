<script>
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, not, email, helpers } from "@vuelidate/validators";
import FormInput from "./components/FormInput.vue";
import FormSelect from "./components/FormSelect.vue";
import FormCheckbox from "./components/FormCheckbox.vue";
import { arrayOptions } from "./data";
export default {
  name: "App",
  components: {
    FormInput,
    FormSelect,
    FormCheckbox,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: "",
      email: "",
      role: 0,
      password: "",
      password_repeat: "",
      isPublic: false,
      isPersonalAgree: true,
      arrayOptions: arrayOptions,
      step: "register",
    };
  },
  validations() {
    return {
      username: {
        required: helpers.withMessage("Введите имя!", required),
      },
      email: {
        required: helpers.withMessage("Введите электронную почту!", required),
        email: helpers.withMessage("Неверный формат электронной почты", email),
      },
      role: {
        required: helpers.withMessage(
          "Укажите желаемую должность!",
          not(sameAs(0))
        ),
      },
      password: {
        required: helpers.withMessage("Введите пароль!", required),
      },
      password_repeat: {
        required: helpers.withMessage("Повторите пароль!", required),
        sameAsPassword: helpers.withMessage(
          "Пароли не совпадают!",
          sameAs(this.password)
        ),
      },
      isPersonalAgree: {
        required: sameAs(true),
      },
    };
  },
  methods: {
    sendFakeApiRequest(data) {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ http_code: 200, response: "ok", data: data }));
      });
    },
    sendForm() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const formData = {
          username: this.username,
          email: this.email,
          role: this.role,
          password: this.password,
          password_repeat: this.password_repeat,
          isPublic: this.isPublic,
        };
        this.sendFakeApiRequest(formData)
          .then((response) => {
            this.step = "complete";
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<template>
  <form v-if="step === 'register'" class="form-container">
    <div class="form-block">
      <h6>Регистрация</h6>
    </div>
    <div class="form-block form-block-middle">
      <p class="form__desc">Заполните Ваши данные</p>
      <div class="inputs">
        <FormInput v-model="username" name="Имя" :err="v$.username" />
        <FormInput v-model="email" name="Email" :err="v$.email" />
        <FormSelect
          v-model="role"
          :options="arrayOptions"
          name="Должность"
          :err="v$.role"
        />
        <FormInput
          v-model="password"
          name="Пароль"
          :err="v$.password"
          type="password"
          password
        />
        <FormInput
          v-model="password_repeat"
          name="Повторите пароль"
          :err="v$.password_repeat"
          type="password"
          password
        />
      </div>
    </div>
    <div class="form-block form-block_bottom">
      <div class="row">
        <FormCheckbox
          v-model="isPublic"
          name="Хотите чтобы Ваш профиль видели другие участники платформы?"
          desc="Включает профиль для просмотра другими пользователями по ссылке"
        />
      </div>
      <div class="personal__agree">
        <input
          class="classic-checkbox"
          v-model="isPersonalAgree"
          type="checkbox"
        />
        <div :style="{ color: v$.isPersonalAgree.$error ? 'red' : '' }">
          Регистрируясь, Вы соглашаетесь &nbsp;с
          <a href="#" class="personal__agree-link"
            >политикой конфиденциальности</a
          >
          <br />
          и обработкой
          <a href="#" class="personal__agree-link">персональных данных</a>
        </div>
      </div>
      <button type="submit" @click.prevent="sendForm" class="submit-btn">
        Зарегистрироваться
      </button>
    </div>
  </form>
  <div v-else-if="step === 'complete'">
    <span>Регистрация успешно завершена</span>
  </div>
</template>

<style>
.form-container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  max-width: 960px;
  width: 100%;
  color: #000000;
  border-radius: 15px;
}

.form-block {
  padding: 16px 15px 17px 31px;
}

.form-block:not(:last-child) {
  border-bottom: 1px solid #d9d9d9;
}

.form-block h6 {
  font-size: 19px;
  font-weight: 700;
  line-height: 27px;
  letter-spacing: -0, 0015em;
}

.form__desc {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.inputs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 13px;
  row-gap: 31px;
  padding: 34px 0 13px 0;
}

.inputs > :nth-child(3) {
  grid-column: 2;
}

.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: start;
}

.form-block_bottom {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 30px;
  padding-top: 23px;
  padding-bottom: 65px;
}

.form-block_bottom > :nth-child(1) {
  grid-column: 1 / span 3;
}

.form-block_bottom > :nth-child(2) {
  grid-column: 1 / span 2;
}

.classic-checkbox {
  width: 29px;
  height: 17px;
  cursor: pointer;
}

.submit-btn {
  background: #497ada33;
  border-radius: 8px;
  border: none;

  font-size: 12px;
  line-height: 19px;
  letter-spacing: -0, 0015em;
  text-align: center;
  color: #497ada;
  max-width: 302px;
  max-height: 40px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #497ada;
  color: #ffffff;
}

.personal__agree-link {
  color: #3586ff;
  cursor: pointer;
  text-decoration: none;
}

.personal__agree {
  display: flex;
  column-gap: 5px;
  position: relative;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.0015em;
}

.checkbox-error {
  position: absolute;
  top: -40%;
  left: 20%;
  color: red;
}
</style>
