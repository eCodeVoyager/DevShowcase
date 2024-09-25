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
import { Link } from "react-router-dom";
import { routeNames } from "../../../../routes/route.data";

export default function AuthenticationImage() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to DevShowCase!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
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
        <Button fullWidth mt="xl" size="md">
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
