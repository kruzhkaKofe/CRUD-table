<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="testPerson.name"
              label="Имя*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="testPerson.surname"
              label="Фамилия*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="testPerson.patronymic"
              label="Отчество*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="testPerson.position"
              label="Должность*"
              :rules="[rules.required, rules.string]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="testPerson.salary"
              label="Оклад (y.e.)*"
              suffix="у.е."
              :rules="[rules.required, rules.salary]"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="testPerson.employment_history"
              :items="['Да', 'Нет']"
              label="Трудовая книжка*"
              :rules="[rules.required]"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="testPerson.rate"
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
                  v-model="testPerson.start_date"
                  label="Выберите дату"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="testPerson.start_date"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Отмена
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  ОК
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!valid"
        type="submit"
        color="success"
        class="mr-4"
        @click="validate"
      >
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
    value: Object,
  },

  emits: ["save", "close"],

  data: () => ({
    rules: {
      required: (value) => !!value || "Обязательно.",
      string: (value) => {
        const pattern = /^[А-ЯЁ][а-яё]+$/;
        return pattern.test(value) || "Введите с большой буквы.";
      },
      salary: (value) => {
        const pattern = /^\s*\d+?\d+\s*$/;
        return pattern.test(value) || "Введите хотя бы 2 цифры.";
      },
    },
    valid: true,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.save();
      } else {
        return;
      }
    },

    reset() {
      this.$refs.form.reset();
    },

    save() {
      this.$emit("save");
    },

    close() {
      this.$emit("close");
      this.$nextTick(() => {
        this.reset();
      });
    },
  },

  computed: {
    testPerson: {
      get() {
        return this.value;
      },
    },
  },
};
</script>

<style lang="sass" scoped></style>
