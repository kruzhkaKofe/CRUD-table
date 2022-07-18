<template>
  <v-form v-model="valid" lazy-validation>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedPerson.name"
              label="Имя*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedPerson.surname"
              label="Фамилия*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedPerson.patronymic"
              label="Отчество*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedPerson.position"
              label="Должность*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="editedPerson.salary"
              label="Оклад (y.e.)*"
              suffix="у.е."
              :rules="[rules.required, rules.salary]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="editedPerson.employment_history"
              :items="['Да', 'Нет']"
              label="Трудовая книжка*"
              :rules="[rules.required]"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="editedPerson.rate"
              :items="['Полная', 'Половина']"
              label="Ставка*"
              :rules="[rules.required]"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              offset-y
              required
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  prepend-icon="mdi-calendar"
                  v-model="editedPerson.start_date"
                  label="Выберите дату"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedPerson.start_date"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="save">
        Отправить
      </v-btn>

      <v-btn color="error" class="mr-4" @click="close"> Отмена </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  name: "AddPersonForm",

  props: {
    needEditPerson: Object,
  },

  emits: ["save", "close"],

  data: () => ({
    editedPerson: {
      id: Date.now(),
      name: "",
      surname: "",
      patronymic: "",
      position: "",
      employment_history: "",
      salary: "",
      start_date: "",
      rate: "",
    },
    // defaultPerson: {
    //   id: Date.now(),
    //   name: "",
    //   surname: "",
    //   patronymic: "",
    //   position: "",
    //   employment_history: "",
    //   salary: "",
    //   start_date: "",
    //   rate: "",
    // },
    rules: {
      required: (value) => !!value || "Обязательно.",
      string: (value) => {
        const pattern = /^[А-ЯЁ][а-яё]+$/;
        return pattern.test(value) || "Введите с большой буквы.";
      },
      salary: (value) => {
        const pattern = /^\s*\d+?\d+\s*$/;
        return pattern.test(value) || "Введите цифры.";
      },
    },
    valid: true,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
  }),

  methods: {
    save() {
      this.$emit("save", this.editedPerson);
    },

    close() {
      this.$emit("close");
    },
  },

  created() {
    // if (
    //   JSON.stringify(this.needEditPerson) !== JSON.stringify(this.editedPerson)
    // ) {
    //   this.editedPerson = this.needEditPerson;
    // } else {
    //   return;
    // }

    this.editedPerson = this.needEditPerson;
  },
};
</script>

<style lang="sass" scoped></style>
