<template>
  <v-toolbar dark color="green darken-3" class="mb-1">
    <v-text-field
      :value="search"
      @input="updateSearch"
      clearable
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Поиск"
    ></v-text-field>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-spacer></v-spacer>
      <v-select
        :value="sortBy"
        @input="updateSort"
        flat
        solo-inverted
        hide-details
        :items="keys"
        prepend-inner-icon="mdi-magnify"
        label="Сортировать по"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn-toggle :value="sortDesc" @change="updateDesc" mandatory>
        <v-btn large depressed color="green" :value="false">
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn large depressed color="green" :value="true">
          <v-icon>mdi-arrow-down</v-icon></v-btn
        >
      </v-btn-toggle>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: "DataIteratorToolbar",

  props: {
    search: String,
    sortBy: String,
    sortDesc: Boolean,
    keys: Array,
  },

  methods: {
    updateSearch(value) {
      this.$emit("update:search", value);
    },

    updateSort(value) {
      this.$emit("update:sortBy", value);
    },

    updateDesc(value) {
      this.$emit("update:sortDesc", value);
    },
  },
};
</script>
