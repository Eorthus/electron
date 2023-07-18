<template>
  <Form v-if="!sumCalories" @submit="submitHandler" class="form-calculation">
    <div class="flex-col">
      <Field v-model="form.age" name="age" type="number" :rules="ageRule" placeholder="Age" />
      <ErrorMessage name="age" />
    </div>
    <div class="flex-col">
      <Field
        v-model="form.height"
        name="height"
        type="number"
        :rules="heightRule"
        placeholder="Height (sm)"
      />
      <ErrorMessage name="height" />
    </div>
    <div class="flex-col">
      <Field
        v-model="form.weight"
        name="weight"
        type="number"
        :rules="weightRule"
        placeholder="Weight (kg)"
      />
      <ErrorMessage name="weight" />
    </div>
    <div class="flex-col">
      <Field v-model="form.sport" name="sport" as="select" :rules="requiredRule">
        <option value="" disabled>Physical activity</option>
        <option v-for="(item, index) in activitiesList" :key="index" :value="item">
          {{ item.title }}
        </option>
      </Field>
      <ErrorMessage name="sport" />
    </div>
    <div class="flex-col mt-2 mb-2">
      <div class="justify-center">
        <div class="justify-center">
          <Field
            v-model="form.gender"
            name="gender"
            type="radio"
            value="female"
            :rules="requiredRule"
          />
          <p class="ml-2 mr-2">Female</p>
        </div>
        <div class="justify-center">
          <Field
            v-model="form.gender"
            name="gender"
            type="radio"
            value="male"
            :rules="requiredRule"
          />
          <p class="ml-2 mr-2">Male</p>
        </div>
      </div>
      <ErrorMessage name="gender" />
    </div>
    <div class="justify-center">
      <button type="submit">Send</button>
    </div>
  </Form>
  <div v-if="sumCalories" class="flex-col items-center">
    <p style="color: white">Your daily calories:</p>
    <h1>{{ sumCalories.toFixed(2) }} KCal</h1>
    <button @click="resetHandler" class="mt-2">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { requiredRule, ageRule, heightRule, weightRule } from '@renderer/utils/validationRules'
import { ref } from 'vue'

const activitiesList = ref([
  { title: 'Zero activity', id: 1, coefficient: 1.2 },
  { title: 'Low activity', id: 1, coefficient: 1.2 },
  { title: 'Middle activity', id: 1, coefficient: 1.2 },
  { title: 'Hard activity', id: 1, coefficient: 1.2 },
  { title: 'Extreme activity', id: 1, coefficient: 1.2 }
])

const genderMap = {
  female: -161,
  male: 5
}

type FormType = {
  age?:number
  height?:number
  weight?:number
  sport?:{
    title:string
    id:number
    coefficient: number
  }
  gender?:string
}

const form = ref<FormType>({
  age: undefined,
  height: undefined,
  weight: undefined,
  sport: undefined,
  gender: undefined
})

const sumCalories = ref(0)

const submitHandler = () => {
  const { age, height, weight, sport, gender } = form.value

  sumCalories.value =
    //@ts-ignore
    (10 * weight + 6.25 * height - 5 * age + genderMap[gender]) * sport?.coefficient
}

const resetHandler = () => {
  form.value = {
    age: undefined,
    height: undefined,
    weight: undefined,
    sport: undefined,
    gender: undefined
  }

  sumCalories.value = 0
}
</script>
<style scoped lang="scss"></style>
