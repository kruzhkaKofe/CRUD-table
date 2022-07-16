<template>
  <v-app>
    <person-overview :person="loadedPerson" />
  </v-app>
</template>

<script>
import PersonOverview from "@/components/PersonOverview";

export default {
  components: {
    PersonOverview,
  },

  data: () => ({
    personId: null,
    persons: [],
  }),

  computed: {
    loadedPerson() {
      return this.persons.find((i) => i.id == this.personId);
    },
  },

  watch: {
    $route(toRoute) {
      this.personId = toRoute.params.id;
    },
  },

  created() {
    this.persons = JSON.parse(localStorage.getItem("persons"));
    this.personId = this.$route.params.id;
  },
};
</script>

<style lang="sass" scoped></style>
