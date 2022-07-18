<template>
  <v-data-iterator
    :items="persons"
    :search="search"
    :items-per-page="5"
    :sort-desc="sortDesc"
    :sort-by="sortBy.toLowerCase()"
    :no-data-text="'Список пуст!'"
    :no-results-text="'Совпадений не найдено!'"
    :footer-props="{
      itemsPerPageText: 'Строк на странице:',
      showFirstLastPage: true,
    }"
  >
    <template v-slot:header>
      <v-toolbar dark color="green darken-3" class="mb-1">
        <v-text-field
          v-model="search"
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
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="keys"
            prepend-inner-icon="mdi-magnify"
            label="Сортировать по"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="sortDesc" mandatory>
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

    <template v-slot:default="props">
      <v-data-table
        :headers="headers"
        :items="props.items"
        :hide-default-footer="true"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Список сотрудников</v-toolbar-title>
            <v-spacer></v-spacer>
            <add-person-dialog v-model="dialog" :editedIndex="editedIndex">
              <v-form v-model="valid" ref="form" lazy-validation>
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
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
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
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                  >
                    Отправить
                  </v-btn>

                  <v-btn color="error" class="mr-4" @click="close">
                    Отмена
                  </v-btn>
                </v-card-actions>
              </v-form>
            </add-person-dialog>
            <delete-dialog
              v-model="dialogDelete"
              @deletePersonConfirm="deletePersonConfirm"
              @closeDelete="closeDelete"
            />
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <profile-buttons
            :item="item"
            @deletePerson="deletePerson"
            @editPerson="editPerson"
            @openDetails="openDetails"
          />
        </template>
      </v-data-table>
    </template>
  </v-data-iterator>
</template>

<script>
import ProfileButtons from "@/components/ProfileButtons";
import DeleteDialog from "@/components/DeleteDialog";
import AddPersonDialog from "@/components/AddPersonDialog";

export default {
  components: { ProfileButtons, DeleteDialog, AddPersonDialog },

  data: () => ({
    persons: [
      {
        id: 1,
        name: "Василий",
        surname: "Антонов",
        patronymic: "Николаевич",
        position: "Разработчик",
        employment_history: "Да",
        salary: "1000",
        start_date: "02-05-2015",
        rate: "Полная",
      },
      {
        id: 2,
        name: "Алиса",
        surname: "Тихонова",
        patronymic: "Степановна",
        position: "Учитель",
        employment_history: "Нет",
        salary: "500",
        start_date: "08-08-2010",
        rate: "Половина",
      },
      {
        id: 3,
        name: "Валентин",
        surname: "Калашников",
        patronymic: "Михайлович",
        position: "Таксист",
        employment_history: "Да",
        salary: "450",
        start_date: "19-09-2020",
        rate: "Полная",
      },
      {
        id: 4,
        name: "Ева",
        surname: "Румянцева",
        patronymic: "Романовна",
        position: "Тренер",
        employment_history: "Нет",
        salary: "850",
        start_date: "03-02-2022",
        rate: "Половина",
      },
      {
        id: 5,
        name: "Антон",
        surname: "Антонов",
        patronymic: "Антонович",
        position: "Продавец",
        employment_history: "Да",
        salary: "300",
        start_date: "02-05-2015",
        rate: "Полная",
      },
      {
        id: 6,
        name: "Екатерина",
        surname: "Тихонова",
        patronymic: "Александровна",
        position: "Электрик",
        employment_history: "Нет",
        salary: "500",
        start_date: "08-08-2010",
        rate: "Половина",
      },
      {
        id: 7,
        name: "Ярослав",
        surname: "Кузнецов",
        patronymic: "Михайлович",
        position: "Сантехник",
        employment_history: "Да",
        salary: "450",
        start_date: "19-09-2020",
        rate: "Полная",
      },
    ],
    headers: [
      {
        text: "Имя",
        value: "name",
        align: "center",
        sortable: false,
        width: "200px",
      },
      {
        text: "Фамилия",
        value: "surname",
        align: "center",
        sortable: false,
        width: "200px",
      },
      {
        text: "Отчество",
        value: "patronymic",
        align: "center",
        sortable: false,
        width: "200px",
      },
      {
        text: "Должность",
        value: "position",
        align: "center",
        sortable: false,
        width: "200px",
      },
      {
        text: "",
        value: "actions",
        align: "center",
        sortable: false,
        width: "200px",
      },
    ],
    keys: [
      { text: "Имени", value: "name" },
      { text: "Фамилии", value: "surname" },
      { text: "Отчеству", value: "patronymic" },
      { text: "Должности", value: "position" },
    ],
    search: "",
    sortBy: "",
    sortDesc: false,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
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
    defaultPerson: {
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
    openDetails(person) {
      this.$router.push(`/details/${person.id}`);
    },

    editPerson(person) {
      this.editedIndex = this.persons.indexOf(person);
      this.editedPerson = person;
      this.$nextTick(() => {
        this.dialog = true;
      });
    },

    deletePerson(person) {
      this.editedIndex = this.persons.indexOf(person);
      this.editedPerson = person;
      this.dialogDelete = true;
    },

    deletePersonConfirm() {
      this.persons.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.save();
        this.$nextTick(() => {
          this.reset();
        });
      }
    },

    reset() {
      this.$refs.form.reset();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedPerson = this.defaultPerson;
        this.editedIndex = -1;
        this.reset();
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedPerson = this.defaultPerson;
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.persons[this.editedIndex], this.editedPerson);
      } else {
        this.persons.push(this.editedPerson);
      }
      this.close();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },

    persons: {
      handler(newVal) {
        const updPersons = JSON.stringify(newVal);
        localStorage.setItem("persons", updPersons);
      },
      deep: true,
    },
  },

  created() {
    if (localStorage.getItem("persons") === null) {
      localStorage.setItem("persons", JSON.stringify(this.persons));
    }
    if (localStorage.getItem("persons") !== null) {
      this.persons = JSON.parse(localStorage.getItem("persons"));
    }
  },
};
</script>
