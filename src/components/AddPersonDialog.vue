<template>
  <v-dialog
    :value="value"
    @input="updateValue"
    @click:outside="resetForm"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green darken-2" dark class="mb-2" v-bind="attrs" v-on="on">
        Добавить сотрудника
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <add-person-form
        ref="personForm"
        v-model="needEditedPerson"
        @close="close"
        @save="save"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import AddPersonForm from "@/components/AddPersonForm";

export default {
  components: { AddPersonForm },

  name: "AddPersonDialog",

  emits: ["save", "close"],

  props: {
    value: Boolean,
    editedIndex: Number,
    editedPerson: Object,
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Новый профиль" : "Изменить профиль";
    },

    needEditedPerson() {
      return this.editedPerson;
    },
  },

  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },

    resetForm() {
      this.$refs.personForm.reset();
    },

    save() {
      this.$emit("save");
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>
