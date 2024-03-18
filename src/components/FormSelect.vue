<script>
export default {
  name: "FormSelect",
  props: {
    value: {
      type: Number,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
    },
    err: {
      type: Object,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        document.addEventListener("click", this.closeOption);
      } else {
        document.removeEventListener("click", this.closeOption);
      }
    },
    selectOption(name,value) {
      this.$emit("input", value);
      this.selectedOption = name;
      this.isOpen = false;
      document.removeEventListener("click", this.closeOption);
    },
    closeOption(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.isOpen = false;
        document.removeEventListener("click", this.closeOption);
      }
    },
  },
};
</script>

<template>
  <div class="select-container" ref="dropdown">
    <div tabindex="0" @keydown.enter="toggleDropdown" class="select" :style="{ borderColor: err.$error ? 'red' : '' }" :class="{ 'isOpen': isOpen }"  @click="toggleDropdown">
      <span
        class="select__placeholder"
        :class="{ 'select__placeholder_chosen': selectedOption }"
        >{{ selectedOption || name }}</span
      >
    </div>
    <ul v-if="isOpen" class="option-container">
      <li
        class="option"
        :class="{ 'selected': selectedOption === option.name }"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.name,option.value)"
        @keydown.enter="selectOption(option.name, option.value)"
        tabindex="0"
      >
        {{ option.name }}
      </li>
    </ul>
    <span  class="input__error">{{ err?.$errors[0]?.$message }}</span>
  </div>
</template>

<style scoped>
.select-container {
  position: relative;
}

.select {
  border: 1px solid #e6e6eb;
  border-radius: 11px;
  padding: 9px;
  font-size: 14px;
  line-height: 19px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.select:focus {
  outline: none;
  border: 1px solid #3586ff;
}

.select__placeholder {
  color: #9e9e9e;
  font-size: 14px;
  letter-spacing: -0, 0015em;
}

.select__placeholder_chosen {
  color: black;
}

.option-container {
  position: absolute;
  list-style-type: none;
  border: 1px solid #e6e6eb;
  background: #ffffff;
  overflow: hidden;
  border-radius: 11px;
  width: 100%;

  z-index: 1000;
  font-size: 14px;
  font-weight: 600;
}

.option {
  padding: 10px 20px;
  border-bottom: 0px;
  cursor: pointer;
  background-color: white;
}

.option:hover {
  background-color: #e6e6eb;
}

.selected {
  background-color: #3586ff;
}
.isOpen {
  border: 1px solid #3586ff;
}

.input__error {
  position: absolute;
  width: 100%;
  height: 25px;
  top: -50%;
  left: 0;
  color: red;
} 
</style>
