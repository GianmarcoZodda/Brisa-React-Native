import strings from "../../utils/strings/strings";
import Btn from "../components/Btn";
import EyeIcon from "../components/EyeIcon";
import InputField from "../components/InputField";
import { StyleSheet, View } from "react-native";


const RegisterScreen = () => {

return(
<View style={styles.container}>
    <EyeIcon></EyeIcon>

    <InputField value="" onValueChange={() => {}} label="name"></InputField>

    <InputField value="" onValueChange={() => {}} label="surname"></InputField>

    <InputField value="" onValueChange={() => {}} label="email" ></InputField>

    <InputField value="" onValueChange={() => {}} label="password" isPassword={true}></InputField>

    <Btn  onPress={() => {}}
        text={strings.registrarme}></Btn>
</View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Centra verticalmente
      alignItems: 'center', // Centra horizontalmente
      padding: 16,
    },
    text:{
        marginBottom: 6,
    }
});


export default RegisterScreen;