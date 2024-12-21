import {
  background,
  backgroundTint,
  primary,
  primaryHSV,
  primaryTintHSV,
} from "@/constants/colors";
import { Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import PieChart from "react-native-pie-chart";
import { hsvToColor } from "react-native-reanimated/lib/typescript/Colors";
import Slider from "@react-native-community/slider";

interface Props {
  noOfContacts: number;
  splitAmount: number;
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const SplitChart: React.FC<Props> = ({ noOfContacts, splitAmount }) => {
  const [series, setSeries] = useState<number[]>([10]);
  const [sliceColor, setSliceColor] = useState<string[]>(["#000"]);

  const colorStep = (primaryHSV[2] - primaryTintHSV[2]) / noOfContacts;
  const evenSplitAmount = splitAmount / noOfContacts;

  useEffect(() => {
    setSeries([]);
    setSliceColor([]);

    for (let i = 0; i < noOfContacts; i++) {
      setSeries((series) => [...series, evenSplitAmount]);
      setSliceColor((sliceColor) => [
        ...sliceColor,
        hslToHex(
          primaryTintHSV[0],
          primaryTintHSV[1],
          primaryTintHSV[2] + i * colorStep // creates color for each of of the person ranging from the tint to normal shade
        ),
      ]);
    }
  }, [noOfContacts]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <PieChart
        style={{ margin: 12 }}
        widthAndHeight={128}
        series={series}
        sliceColor={sliceColor} // using hsl even tho og colors were in HSV cuz im lazy 👀
        coverRadius={0.45}
        coverFill={background}
      />
      <Text>
        Person{1}: {series[0]}
      </Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={splitAmount}
        value={series[0]}
        onValueChange={(value) => {
          const nextSeries = series.map((val, i) => {
            if (i === 0) {
              // Increment the clicked counter
              return value;
            } else {
              // The rest haven't changed
              return val;
            }
          });
          setSeries(nextSeries);
        }}
        minimumTrackTintColor={primary}
        maximumTrackTintColor={backgroundTint}
      />
    </View>
  );
};

export default SplitChart;
