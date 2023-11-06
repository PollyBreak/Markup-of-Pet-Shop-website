document.addEventListener('DOMContentLoaded', () => {

  const xValues = ["Cats", "Dogs", "Birds", "Reptiles", "Hamsters"];
  const yValues = [45, 47, 60, 35, 27];
  const barColors = ["red", "green","pink","orange","purple"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: ""
      }
    }
  });
});


