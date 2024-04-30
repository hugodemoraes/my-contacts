import { TextInput, TextInputProps, View, ViewProps } from "react-native";

import { theme } from "@/theme";

import { styles } from "./styles";

function Input({ style, children }: ViewProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={theme.colors.gray_300}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };
