import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./ForgotPassword.module.css";
import classesTwo from "../Login/AuthenticationImage.module.css";
import { Link } from "react-router-dom";
import { routeNames } from "../../../../routes/route.data";

export default function ForgotPassword() {
  return (
    <div className={classesTwo.wrapper}>
      <Paper className={classes.form} radius={12} p={30}>
        <Container size={460} my={30}>
          <Title className={classes.title} ta="center">
            Forgot your password?
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Enter your email to get a OTP.
          </Text>

          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <TextInput
              label="Your email"
              placeholder="me@domain.com"
              required
            />
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Link
                to={routeNames.login}
                className={classes.control + " text-foreground-muted text-sm"}
              >
                <Center inline>
                  <IconArrowLeft
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Link>
              <Button className={classes.control}>Reset password</Button>
            </Group>
          </Paper>
        </Container>
      </Paper>
    </div>
  );
}
