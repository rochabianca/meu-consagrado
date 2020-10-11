import Vue from "vue";

Vue.filter("price", value => {
  const price = Number(value)
    .toFixed(2)
    .replace(".", ",");
  return `R$ ${price}`;
});

Vue.filter("date", date => {
  const d = new Date(date);
  let dateFormated = "";
  let hour = d.getHours();
  let minutes = d.getMinutes();
  if (hour < 10) hour = `0${hour}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (hour === 0 || hour < 3) {
    dateFormated = `${d.getDate()}/${d.getMonth()} - `;
  }
  return `${dateFormated} ${hour}:${minutes}`;
});
