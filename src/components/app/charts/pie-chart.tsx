import ReactECharts from "echarts-for-react";

interface IPieChart {
  data: dataPie[];
}

interface dataPie {
  value: number;
  name: string;
}

export function PieChart({ data }: IPieChart) {
  const option = {
    series: [
      {
        name: "Main Chart",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data,
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "360px", width: "100%" }} />
  );
}
