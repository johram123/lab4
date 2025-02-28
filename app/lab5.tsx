import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { CallAPI } from "../components/callAPI";


const Lab5 = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <Text style={styles.header} >Lab 5</Text>
            <View style={styles.apiComponent}>
                {isVisible && <CallAPI />}
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                    <Text>Toggle API call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {    
        flex: 1, 
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "gray",
    },
    header: {
        alignItems: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    apiComponent: {
        alignItems: "center",
    },
    button: {
        padding: 10,
        width: 120,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#dfe6ef",    
    },
});

export default Lab5;