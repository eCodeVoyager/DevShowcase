import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
} from "@mantine/core";
import classes from "./AuthenticationImage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { routeNames } from "../../../../routes/route.data";
import { useForm, yupResolver } from "@mantine/form";
import { LoginValidator } from "../../../../utils/validator";
import { useState } from "react";

export default function AuthenticationImage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(LoginValidator),
  });
  const handleLogin = (values) => {
    form.validate();
    try {
      setLoading(true);
      // TODO: Implement login logic
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={12} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to DevShowCase!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <Text className="text-end" mt={4}>
          <Link
            to={routeNames.forgotPassword}
            className="text-blue-500 text-sm "
          >
            Forgot your password?
          </Link>
        </Text>
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button
          onClick={form.onSubmit((values) => handleLogin(values))}
          fullWidth
          mt="xl"
          size="md"
        >
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Link to={routeNames.register} fw={700} className="text-blue-500">
            Register
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
