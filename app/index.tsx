import { Redirect } from "expo-router";
import { getToken } from "@/utilis/variables";

export default function StartPage() {
  const isSignIn = getToken();
  if (isSignIn) {
    return <Redirect href="/Index" />;
  } else {
    return <Redirect href="/SignIn" />;
  }
}
