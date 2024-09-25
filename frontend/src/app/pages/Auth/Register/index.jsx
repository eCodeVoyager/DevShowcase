import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Box,
} from "@mantine/core";
import classes from "../Login/AuthenticationImage.module.css";
import { Link } from "react-router-dom";
import { routeNames } from "../../../../routes/route.data";

export default function Register() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Be a Part of DevShowCase!
        </Title>
        <Box>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
          />
        </Box>
        <Box my="md">
          <TextInput label="Username" placeholder="username" size="md" />
        </Box>
        <Box>
          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
          />
        </Box>
        <Box mt={"md"}>
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Your password"
            size="md"
          />
        </Box>

        <Button fullWidth mt="xl" size="md">
          Register
        </Button>

        <Text ta="center" mt="md">
          All ready have an account?{" "}
          <Link to={routeNames.login} fw={700} className="text-blue-500">
            Login
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
