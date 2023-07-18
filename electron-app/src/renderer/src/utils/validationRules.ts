export const requiredRule = (value: any) => {
  return !value ? 'This field is required' : true
}

export const ageRule = (value: any) => {
  return value < 5 || value > 80 ? 'Age must be 5-80 years' : true
}

export const heightRule = (value: any) => {
  return value < 50 || value > 250 ? 'Height must be 50-250 sm' : true
}

export const weightRule = (value: any) => {
  return value < 30 || value > 200 ? 'Weight must be 30-200 kg' : true
}
