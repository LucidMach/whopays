import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";

interface Props {
  noOfContacts: number;
  splitAmount: number;
  selectedContacts: Contact[];
  series: number[]; // Add this to dynamically update the chart
}

const SplitChart: React.FC<Props> = ({ noOfContacts, series }) => {
  // Generate dynamic slice colors
  const sliceColor = series.map((_, i) => {
    const hue = (360 / noOfContacts) * i;
    return `hsl(${hue}, 70%, 50%)`;
  });

  const totalSeries = series.reduce((acc, val) => acc + val, 0);

  // If totalSeries is zero, show a fallback
  if (totalSeries === 0) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#aaa", fontSize: 16 }}>No data to display.</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <PieChart
        style={{ margin: 12 }}
        widthAndHeight={128}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.45}
        coverFill="#fff"
      />
    </View>
  );
};

export default SplitChart;
