<template>
  <v-dialog v-model="showDialogDelete" max-width="500px">
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
  name: "DeleteDialog",

  props: {
    value: Boolean,
  },

  methods: {
    closeDelete() {
      this.$emit("closeDelete");
    },
    deletePersonConfirm() {
      this.$emit("deletePersonConfirm");
    },
  },

  computed: {
    showDialogDelete: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="sass" scoped></style>
