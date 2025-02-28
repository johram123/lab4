import { useRouter } from "expo-router";
import { Button, View } from "react-native";


export default function App() {
    const router = useRouter();

    return (
        <View>
            <Button title="To lab 4" onPress = {() => router.push("lab4")} />
            <Button title="To lab 5" onPress = {() => router.push("lab5")} />
        </View>
    );
};  