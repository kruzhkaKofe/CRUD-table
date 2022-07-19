<template>
  <v-container class="d-flex">
    <v-btn
      :x-small="true"
      text
      color="green darken-2"
      class="mr-2"
      @click="openDetails(item)"
    >
      Инфо
    </v-btn>
    <v-btn
      :x-small="true"
      text
      color="green darken-2"
      class="mr-2"
      @click="editPerson(item)"
    >
      Изменить
    </v-btn>
    <v-btn
      :x-small="true"
      text
      color="green darken-2"
      @click="deletePerson(item)"
    >
      Удалить
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "PersonButtons",

  emits: ["deletePerson", "editPerson", "openDetails"],

  props: {
    item: Object,
  },

  methods: {
    deletePerson(person) {
      this.$emit("deletePerson", person);
    },
    editPerson(person) {
      this.$emit("editPerson", person);
    },
    openDetails(person) {
      this.$emit("openDetails", person);
    },
  },
};
</script>

<style lang="sass" scoped></style>
