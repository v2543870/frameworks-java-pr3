<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { id: 1, title: 'Кава', amount: 80 },
  { id: 2, title: 'Інтернет', amount: 300 }
]);
const title = ref('');
const amount = ref('');
const onlyExpensive = ref(false);

const addExpense = () => {
  if (!title.value || !amount.value) return;
  items.value.push({ id: Date.now(), title: title.value, amount: Number(amount.value) });
  title.value = '';
  amount.value = '';
};

const removeExpense = (id) => {
  items.value = items.value.filter(item => item.id !== id);
};

const clearAll = () => {
  items.value = [];
};

const total = computed(() => items.value.reduce((sum, item) => sum + item.amount, 0));
const visibleItems = computed(() =>
  onlyExpensive.value ? items.value.filter(item => item.amount > 200) : items.value
);
</script>

<template>
  <div>
    <h2>Трекер витрат (Vue 3)</h2>

    <input v-model="title" placeholder="Назва" />
    <input type="number" v-model.number="amount" placeholder="Сума" />
    <button @click="addExpense">Додати</button>

    <label>
      <input type="checkbox" v-model="onlyExpensive" />
      Показати тільки витрати &gt; 200 грн
    </label>

    <p v-if="items.length === 0">Список витрат порожній</p>
    <template v-else>
      <ul>
        <li v-for="item in visibleItems" :key="item.id">
          {{ item.title }} — {{ item.amount }} грн
          <button @click="removeExpense(item.id)">×</button>
        </li>
      </ul>
      <button @click="clearAll">Очистити все</button>
    </template>

    <h3>Всього: {{ total }} грн</h3>
    <p v-if="total > 1000" style="color: red;"> Увага! Ви перевищили денний ліміт бюджету!</p>
  </div>
</template>