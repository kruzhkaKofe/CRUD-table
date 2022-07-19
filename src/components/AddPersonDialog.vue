<template>
  <v-dialog :value="value" @input="updateValue" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green darken-2" dark class="mb-2" v-bind="attrs" v-on="on">
        Добавить сотрудника
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddPersonDialog",

  props: {
    value: Boolean,
    editedIndex: Number,
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Новый профиль" : "Изменить профиль";
    },
  },

  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="sass" scoped></style>
