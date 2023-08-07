const today = new Date();

export const sampleDates = [
  new Date(today),
  new Date(
    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 1}`,
  ),
  new Date(
    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 2}`,
  ),
  new Date(
    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 3}`,
  ),
  new Date(
    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 4}`,
  ),
  new Date(
    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 5}`,
  ),
];
