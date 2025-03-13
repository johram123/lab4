import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  getUsers,
  insertUser,
  deleteUser,
  updateUser,
} from "../lib/supabase_crud";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const Lab6 = () => {
  const [tableInfos, setTableInfos] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedEmail, setUpdatedEmail] = useState<string>("");

  const [userUpdateToggle, setUserUpdateToggle] = useState<number[]>([]);

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  useEffect(() => {
    loadTable();
  }, []);

  const handleToggle = (id: any) => {
    if (userUpdateToggle.includes(id)) {
      setUserUpdateToggle(userUpdateToggle.filter((item) => item !== id));
    } else {
      setUserUpdateToggle([...userUpdateToggle, id]);
    }
  };

  const loadTable = async () => {
    try {
      const tableInfo = await getUsers();
      setTableInfos(tableInfo);
    } catch (error) {
      alert("Retrieving Users failed.");
    }
  };

  const updateUserHandle = async (user: User) => {
    if (!emailRegex.test(updatedEmail) || updatedName === "") {
      Alert.alert("Invalid inputs");
      return;
    }
    try {
      await updateUser(user);
      console.log(user);
      loadTable();
      handleToggle(user.id);
      Alert.alert("User successfully updated");
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setUpdatedEmail("");
      setUpdatedName("");
    }
  };

  const deleteUserHandle = async (id: any) => {
    try {
      await deleteUser(id);
      loadTable();
      Alert.alert("User successfully deleted.");
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const insertUserHandle = async () => {
    if (!emailRegex.test(email) || name === "") {
      Alert.alert("Invalid inputs");
      return;
    }

    try {
      await insertUser({ name, email });
      loadTable();
      Alert.alert("User successfully inserted.");
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setEmail("");
      setName("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Lab 6</Text>
      <View style={styles.dataContainer}>
        {tableInfos.map((tableInfo) => (
          <View key={tableInfo.id}>
            <TouchableOpacity
              style={styles.data}
              onPress={() => handleToggle(tableInfo.id)}
            >
              <View style={{ width: 150, marginLeft: 10 }}>
                <Text>{tableInfo.name}</Text>
                <Text>{tableInfo.email}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => deleteUserHandle(tableInfo.id)}
              >
                <Text>X</Text>
              </TouchableOpacity>
              {userUpdateToggle.includes(tableInfo.id) && (
                <View>
                  <TextInput
                    value={updatedName}
                    onChangeText={setUpdatedName}
                    placeholder="Enter Updated Name"
                    style={styles.textUpdateInput}
                  />
                  <TextInput
                    value={updatedEmail}
                    onChangeText={setUpdatedEmail}
                    placeholder="Enter Updated Email"
                    style={styles.textUpdateInput}
                  />
                  <TouchableOpacity
                    style={styles.submitUpdate}
                    onPress={() =>
                      updateUserHandle({
                        id: tableInfo.id,
                        name: updatedName,
                        email: updatedEmail,
                      })
                    }
                  >
                    <Text>Update User!</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
          style={styles.textInput}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity onPress={insertUserHandle} style={styles.submitButton}>
        <Text>Add new user!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Lab6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    width: "100%",
    backgroundColor: "#3e4d80",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
  },
  data: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    width: "100%",
    height: 100,
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "lightgreen",
    width: 150,
    height: 50,
    borderRadius: 10,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    width: 40,
    backgroundColor: "red",
    alignItems: "center",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 2,
  },
  textInput: {
    marginTop: 30,
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 3,
    textAlign: "center",
  },
  textUpdateInput: {
    borderRadius: 10,
    borderWidth: 3,
    textAlign: "center",
  },
  submitUpdate: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
});
