import { getChartColorsArray } from "@/app/utils.ts";

//basic range area charts
const basicRangeAreaChart = {
  series: [
    {
      name: "New York Temperature",
      data: [
        {
          x: "Jan",
          y: [-2, 4],
        },
        {
          x: "Feb",
          y: [-1, 6],
        },
        {
          x: "Mar",
          y: [3, 10],
        },
        {
          x: "Apr",
          y: [8, 16],
        },
        {
          x: "May",
          y: [13, 22],
        },
        {
          x: "Jun",
          y: [18, 26],
        },
        {
          x: "Jul",
          y: [21, 29],
        },
        {
          x: "Aug",
          y: [21, 28],
        },
        {
          x: "Sep",
          y: [17, 24],
        },
        {
          x: "Oct",
          y: [11, 18],
        },
        {
          x: "Nov",
          y: [6, 12],
        },
        {
          x: "Dec",
          y: [1, 7],
        },
      ],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "rangeArea",
    },
    stroke: {
      curve: "straight",
    },
    markers: {
      hover: {
        sizeOffset: 5,
      },
    },
    colors: getChartColorsArray('["bg-custom-500"]'),
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: (val: any) => {
          return val + "°C";
        },
      },
    },
  },
};

//Combo
const comboChart = {
  series: [
    {
      type: "rangeArea",
      name: "Team B Range",

      data: [
        {
          x: "Jan",
          y: [1100, 1900],
        },
        {
          x: "Feb",
          y: [1200, 1800],
        },
        {
          x: "Mar",
          y: [900, 2900],
        },
        {
          x: "Apr",
          y: [1400, 2700],
        },
        {
          x: "May",
          y: [2600, 3900],
        },
        {
          x: "Jun",
          y: [500, 1700],
        },
        {
          x: "Jul",
          y: [1900, 2300],
        },
        {
          x: "Aug",
          y: [1000, 1500],
        },
      ],
    },

    {
      type: "rangeArea",
      name: "Team A Range",
      data: [
        {
          x: "Jan",
          y: [3100, 3400],
        },
        {
          x: "Feb",
          y: [4200, 5200],
        },
        {
          x: "Mar",
          y: [3900, 4900],
        },
        {
          x: "Apr",
          y: [3400, 3900],
        },
        {
          x: "May",
          y: [5100, 5900],
        },
        {
          x: "Jun",
          y: [5400, 6700],
        },
        {
          x: "Jul",
          y: [4300, 4600],
        },
        {
          x: "Aug",
          y: [2100, 2900],
        },
      ],
    },

    {
      type: "line",
      name: "Team B Median",
      data: [
        {
          x: "Jan",
          y: 1500,
        },
        {
          x: "Feb",
          y: 1700,
        },
        {
          x: "Mar",
          y: 1900,
        },
        {
          x: "Apr",
          y: 2200,
        },
        {
          x: "May",
          y: 3000,
        },
        {
          x: "Jun",
          y: 1000,
        },
        {
          x: "Jul",
          y: 2100,
        },
        {
          x: "Aug",
          y: 1200,
        },
        {
          x: "Sep",
          y: 1800,
        },
        {
          x: "Oct",
          y: 2000,
        },
      ],
    },
    {
      type: "line",
      name: "Team A Median",
      data: [
        {
          x: "Jan",
          y: 3300,
        },
        {
          x: "Feb",
          y: 4900,
        },
        {
          x: "Mar",
          y: 4300,
        },
        {
          x: "Apr",
          y: 3700,
        },
        {
          x: "May",
          y: 5500,
        },
        {
          x: "Jun",
          y: 5900,
        },
        {
          x: "Jul",
          y: 4500,
        },
        {
          x: "Aug",
          y: 2400,
        },
        {
          x: "Sep",
          y: 2100,
        },
        {
          x: "Oct",
          y: 1500,
        },
      ],
    },
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: "rangeArea",
      animations: {
        speed: 500,
      },
    },
    colors: getChartColorsArray(
      '["bg-sky-100", "bg-orange-100", "bg-sky-500", "bg-orange-500"]'
    ),
    // colors: ['#d4526e', '#33b2df', '#d4526e', '#33b2df'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: [0.24, 0.24, 1, 1],
    },
    forecastDataPoints: {
      count: 2,
    },
    stroke: {
      curve: "straight",
      width: [0, 0, 2, 2],
    },
    legend: {
      show: true,
      customLegendItems: ["Team B", "Team A"],
      inverseOrder: true,
    },
    title: {
      text: "Range Area with Forecast Line (Combo)",
    },
    markers: {
      hover: {
        sizeOffset: 5,
      },
    },
  },
};
export { basicRangeAreaChart, comboChart };
