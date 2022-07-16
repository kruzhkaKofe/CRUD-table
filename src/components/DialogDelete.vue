<template>
  <v-dialog :value="value" @input="updateValue" max-width="500px">
    <v-card>
      <v-card-title class="text-h6 justify-center"
        >Уверены, что хотите удалить?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-2" text @click="closeDelete">Отмена</v-btn>
        <v-btn color="green darken-2" text @click="deletePersonConfirm"
          >Подтвердить</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },

  emits: ["closeDelete", "deletePersonConfirm"],

  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
    closeDelete() {
      this.$emit("closeDelete");
    },
    deletePersonConfirm() {
      this.$emit("deletePersonConfirm");
    },
  },
};
</script>
