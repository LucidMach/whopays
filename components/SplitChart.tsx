import {
  background,
  backgroundTint,
  foreground,
  primary,
  primaryHSV,
  primaryTintHSV,
} from "@/constants/colors";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import PieChart from "react-native-pie-chart";
import Slider from "@react-native-community/slider";

// types
import { Contact } from "expo-contacts";

interface Props {
  noOfContacts: number;
  splitAmount: number;
  selectedContacts: Contact[];
  selectContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
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

const SplitChart: React.FC<Props> = ({
  noOfContacts,
  splitAmount,
  selectedContacts,
  selectContacts,
}) => {
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
    <View
      style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
    >
      <PieChart
        style={{ margin: 12 }}
        widthAndHeight={128}
        series={series}
        sliceColor={sliceColor} // using hsl even tho og colors were in HSV cuz im lazy 👀
        coverRadius={0.45}
        coverFill={background}
      />
      <FlatList
        style={{ flexGrow: 0, width: "80%", margin: 12 }}
        data={selectedContacts}
        renderItem={({ item, index }) => (
          <View key={item.id}>
            <TouchableOpacity
              onPress={() => {
                selectContacts((contacts) =>
                  contacts.filter((contact) => contact !== item)
                );
              }}
            >
              <Text
                style={{
                  color: foreground,
                  margin: 12,
                  borderColor: primary,
                  borderWidth: 2,
                  textAlign: "center",
                  padding: 8,
                  borderRadius: 200,
                }}
              >
                {item.name ? item.name.toString() : ""}: {series[index]}
              </Text>
            </TouchableOpacity>
            <Slider
              // haptic feedback on full numbers
              // float processing
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={splitAmount}
              value={series[index]}
              step={1}
              onValueChange={(value) => {
                const nextSeries = series.map((val, i) => {
                  if (i === index) {
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
        )}
      />
    </View>
  );
};

export default SplitChart;
