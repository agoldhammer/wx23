<script lang="ts">
  import { Line } from "svelte-chartjs";
  import { Chart } from "chart.js/auto";
  import "chartjs-adapter-date-fns";
  import type { ChartData, ChartDataset } from "chart.js";
  export let wxdata: any;

  let dataLine: ChartData<"line", number[]> = {
    labels: wxdata.times_text,
    // labels: wxdata.times,
    datasets: [
      {
        label: "temps",
        yAxisID: "L",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130, 158)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: wxdata.temps,
      } as ChartDataset<"line", number[]>,
      {
        label: "pressures",
        yAxisID: "R",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(184, 185, 210, .3)",
        borderColor: "rgb(35, 26, 136)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(35, 26, 136)",
        pointBackgroundColor: "rgb(255, 228, 181)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(255, 255, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: wxdata.pressures,
      } as ChartDataset<"line", number[]>,
    ],
  };
</script>

<div class="city">
  <Line
    data={dataLine}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "timeseries",
          ticks: { source: "labels" },
          time: {
            tooltipFormat: "MM-dd @ HH:mm",
            unit: "day",
            displayFormats: {
              day: "MM-dd HH:mm",
            },
          },
        },
        L: {
          type: "linear",
          display: true,
          position: "left",
        },
        R: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: (value, index, ticks) => {
              return value; // needed to eliminate comma
            },
          },
        },
      },
      plugins: {
        title: { display: true, text: `${wxdata.city}, ${wxdata.country}` },
      },
    }}
  />
</div>

<style>
  .city {
    min-width: 800px;
    height: 300px;
    margin: auto;
    padding: 20px;
    border: 2px solid gray;
    border-radius: 10px;
    overflow-x: auto;
  }
</style>
