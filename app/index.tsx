import { useRouter } from "expo-router";
import { Button, View } from "react-native";


export default function App() {
    const router = useRouter();

    return (
        <View>
            <Button title="To lab 1" onPress = {() => router.push("lab4")} />
        </View>
    )
};