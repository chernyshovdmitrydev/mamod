<script>
export default {
  name: "FormCheckbox",
  props: {
    value: {
      type: Boolean,
    },
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    type: {
      type: String,
    },
    err: {
      type: Object,
    },
  },
};
</script>

<template>
  <label class="checkbox" for="checkbox">
    <input class="checkbox__inp" id="checkbox" @input="$emit('input', $event.target.checked)" type="checkbox" />
    <span class="checkbox__name"> {{ this.name }} </span>
    <span class="checkbox__desc"> {{ this.desc }} </span>
  </label>
</template>

<style scoped>
.checkbox {
  display: inline-block;
}
.checkbox__inp {
  opacity: 0;
  width: 0;
  height: 0;
  appearance: none;
}
.checkbox__name {
  display: inline-block;
  position: relative;
  font-size: 18px;
  padding-left: 44px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 10px;
}

.checkbox__desc {
  display: inline-block;
  padding-left: 44px;
  color: #696977;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0,0015em;
}

.checkbox__name::before {
  display: block;
  content: "";
  width: 39px;
  height: 19px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #3586ff;
  border-radius: 18px;
  cursor: pointer;
}

.checkbox__name::after {
  display: block;
  content: "";
  position: absolute;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: #ffffff;
  left: 0px;
  top: 0px;
  transition: left 0.3s ease;
  cursor: pointer;
}

.checkbox__inp:checked + .checkbox__name::after {
  left: 19px;
}

.checkbox__inp:focus + .checkbox__name::before {
  outline: 1px solid black;
}
</style>
