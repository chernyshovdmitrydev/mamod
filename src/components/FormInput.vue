<script>
export default {
  name: "FormInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: Boolean,
      default: false,
    },
    err: {
      type: Object,
    },
  },
  data() {
    return {
      inputType: this.type,
    };
  },
  methods: {
    toggleInputType() {
      this.inputType = this.inputType === "password" ? "text" : "password";
    },
  },
};
</script>

<template>
  <div class="input-container">
    <input
      :type="inputType"
      class="input"
      :style="{ borderColor: err.$error ? 'red' : '' }"
      :value="value"
      @input="$emit('input', $event.target.value.trim())"
      :placeholder="name"
    />
    <span class="input__error">{{ err?.$errors[0]?.$message }}</span>
    <button
      class="input__button"
      v-if="password"
      @click.prevent="toggleInputType"
    >
      <img
        :src="
          inputType === 'password'
            ? '/svg/showed.svg'
            : '/svg/hided.svg'
        "
        alt=""
      />
    </button>
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
  position: relative;
}
.input {
  border: 1px solid #e6e6eb;
  border-radius: 11px;
  padding: 9px;
  font-size: 14px;
  line-height: 19px;
  width: 100%;
}

.input:focus {
  outline: none;
  border: 1px solid #3586ff;
}

.input::placeholder {
  color: #9e9e9e;
  font-size: 14px;
  letter-spacing: -0, 0015em;
  font-family: "Montserrat", Arial, sans-serif;
}

.input__error {
  position: absolute;
  width: 100%;
  height: 25px;
  top: -50%;
  left: 0;
  color: red;
}

.input__button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 3%;
}
</style>
