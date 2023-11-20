<template>
  <div style="margin-left: 10px">
    <table class="my-table">
      <thead>
        <tr>
          <th>
            <p style="margin-bottom: 38px">ID</p>
          </th>
          <th>
            <p>Name</p>
            <input v-model="filterByName" placeholder="Search" />
          </th>
          <th>
            <p>Genre</p>
            <Multiselect
              style="width: 200px"
              mode="multiple"
              v-model="selectedGenres"
              :close-on-select="false"
              placeholder="Search"
              :options="genres"
            >
            </Multiselect>
          </th>
          <th>
            <p>Users</p>
            <Multiselect
              style="width: 200px"
              mode="multiple"
              v-model="selectedUsers"
              :close-on-select="false"
              placeholder="Search"
              :options="usersOptions"
            >
            </Multiselect>
          </th>
          <th>
            Watch numbers
            <button @click="sortByColumn('watch_numbers')" id="button">
              Sort
            </button>
          </th>

          <th>Rate</th>
          <th>Country of origin</th>
          <th>Age limit</th>
          <th>Released date</th>
          <th>
            <p>Subtitles</p>
            <div style="width: 150px">
              <Multiselect
                v-model="selectedSubtitles"
                placeholder="Search"
                :options="languages"
              >
              </Multiselect>
            </div>
          </th>
          <th>
            <p>Audio</p>
            <div style="width: 150px">
              <Multiselect
                v-model="selectedAudio"
                placeholder="Search"
                :options="languages"
              >
              </Multiselect>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in filteredAndSortedTableData" :key="row.id">
          <td>{{ row.film_id }}</td>
          <td>{{ row.film_name }}</td>
          <td>{{ String([...new Set(row.genre_names)]) }}</td>
          <td>{{ row.users }}</td>
          <td>{{ row.watch_numbers }}</td>
          <td>{{ row.rate }}</td>
          <td>{{ row.country_of_origin }}</td>
          <td>{{ row.age_limit }}</td>
          <td>{{ row.released_data }}</td>
          <td v-if="row.subtitles">{{ row.lang_name }}</td>
          <td v-else>-</td>
          <td v-if="row.audio">{{ row.lang_name }}</td>
          <td v-else>-</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const movies = ref([]);
const users = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/movies');
    movies.value = response.data;
    const responseUsers = await axios.get('http://localhost:3000/users');
    users.value = responseUsers.data;
  } catch (error) {
    console.error('Error fetching posts', error);
  }
  return {
    movies,
    users,
  };
});

const selectedSubtitles = ref();
const selectedAudio = ref();
const selectedGenres = ref([]);
const sortBy = ref('name');
const sortOrder = ref(1);
const filterByName = ref('');
const selectedUsers = ref([]);

const usersOptions = computed(() => {
  return users.value.map((obj) => ({ value: obj.login, label: obj.login }));
});

const languages = ref({
  Amharic: 'Amharic',
  Armenian: 'Armenian',
  Avestan: 'Avestan',
  Bashkir: 'Bashkir',
  Bihari_languages: 'Bihari languages',
  Burmese: 'Bashkir',
  Central_Khmer: 'Central Khmer',
  Chamorro: 'Chamorro',
  Church_Slavic: 'Church Slavic',
  Chuvash: 'Chuvash',
  Cree: 'Cree',
  Croatian: 'Croatian',
  Czech: 'Czech',
  English: 'English',
  Esperanto: 'Esperanto',
  French: 'French',
  Galician: 'Galician',
  Ganda: 'Ganda',
  Georgian: 'Georgian',
  Gujarati: 'Gujarati',
  Hebrew: 'Hebrew',
  Herero: 'Herero',
  Hindi: 'Hindi',
  Ido: 'Ido',
  Kazakh: 'Kazakh',
  Lao: 'Lao',
  Latvian: 'Latvian',
  Limburgan: 'Limburgan',
  Luba_Katanga: 'Luba-Katanga',
  Maori: 'Maori',
  Mongolian: 'Mongolian,',
  Northern_Sami: 'Northern Sami',
  Norwegian: 'Norwegian',
  Norwegian_Nynorsk: 'Norwegian Nynorsk',
  Occitan: 'Occitan',
  Ojibwa: 'Ojibwa',
  Oriya: 'Oriya',
  Pali: 'Pali',
  Panjabi: 'Panjabi',
  Russian: 'Russian',
  Slovak: 'Slovak',
  South_Ndebele: 'South Ndebele',
  Swedish: 'Swedish',
  Tagalog: 'Tagalog',
  Telugu: 'Telugu',
  Tigrinya: 'Tigrinya',
  Tonga: 'Tonga',
  Tsonga: 'Tsonga',
  Tswana: 'Tswana',
  Turkish: 'Turkish',
  Twi: 'Twi',
  Urdu: 'Urdu',
  Xhosa: 'Xhosa',
  Zulu: 'Zulu',
});

const genres = ref([
  { value: 'Action', label: 'Action' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Western', label: 'Western' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Fantasy', label: 'Fantasy' },
]);

const sortByColumn = (column) => {
  if (sortBy.value === column) {
    sortOrder.value *= -1; // Reverse the sorting order if clicking on the same column
  } else {
    sortBy.value = column;
    sortOrder.value = 1; // Default to ascending order for a new column
  }

  movies.value.sort((a, b) => {
    const aValue = a[column];
    const bValue = b[column];

    if (aValue < bValue) {
      return -1 * sortOrder.value;
    } else if (aValue > bValue) {
      return 1 * sortOrder.value;
    } else {
      return 0;
    }
  });
};

const filteredAndSortedTableData = computed(() => {
  let filteredData = movies.value;

  // Apply filter by movie name
  if (filterByName.value.trim() !== '') {
    filteredData = filteredData.filter((row) =>
      row.film_name.toLowerCase().includes(filterByName.value.toLowerCase())
    );
  }

  // Apply filter by audio
  if (selectedAudio.value) {
    filteredData = filteredData.filter(
      (row) => selectedAudio.value.includes(row.lang_name) && row.audio == true
    );
  }

  // Apply filter by subtitles
  if (selectedSubtitles.value) {
    filteredData = filteredData.filter(
      (row) =>
        selectedSubtitles.value.includes(row.lang_name) && row.subtitles == true
    );
  }

  // Apply filter by genres
  if (selectedGenres.value.length > 0) {
    filteredData = filteredData.filter((row) =>
      selectedGenres.value.every((genre) => row.genre_names.includes(genre))
    );
  }

  // Apply filter by movie users
  if (selectedUsers.value.length > 0) {
    filteredData = filteredData.filter((row) =>
      selectedUsers.value.every((users_row) => row.users.includes(users_row))
    );
  }

  // Sort the filtered data based on the selected column and order
  return filteredData.sort((a, b) => {
    const aValue = a[sortBy.value];
    const bValue = b[sortBy.value];

    if (aValue < bValue) {
      return -1 * sortOrder.value;
    } else if (aValue > bValue) {
      return 1 * sortOrder.value;
    } else {
      return 0;
    }
  });
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.multiselect {
  min-height: 10px;
  height: 22px;
  font-size: 12px;
}

::v-deep .multiselect-option {
  font-size: 12px;
}

.my-table th,
.my-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

::v-deep .multiselect-dropdown {
  max-height: 500px;
}

#button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 5px;
}
</style>
