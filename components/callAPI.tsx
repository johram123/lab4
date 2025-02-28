import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const CallAPI = () => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        makeAPICall();
    }, []);

    const makeAPICall = async () => {
        try
        {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            const data = await response.json();
            console.log(data);
            setData([data]);
        }
        catch (error)
        {
            setError(error as Error);

        }
        finally 
        {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text>{loading && <Text>Loading...</Text>}</Text>
            <Text>{error && <Text>{error.message}</Text>}</Text>
            <View>{data && data.map((item) => (
                <View key={item.id}>
                    <Text style={styles.item}>Title: {"\n"}{item.title}</Text>
                    <Text style={styles.item}>Body: {"\n"}{item.body}</Text>
                </View>
            ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
    },
    item: {
        marginBottom: 10,
    },
});

export {CallAPI};