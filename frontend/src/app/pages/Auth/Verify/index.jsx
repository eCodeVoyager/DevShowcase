import { Paper, Button, Title, Text, Group, PinInput } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "../Login/AuthenticationImage.module.css";
import { routeNames } from "../../../../routes/route.data";

export default function OtpVerification() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={12} p={30} px={40}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Enter OTP to verify your account
        </Title>

        <Text ta="center" mb="md">
          A 6-digit code has been sent to your email
        </Text>

        <Group justify="center" mt="md">
          <PinInput length={6} size="lg" gap={"md"} autoFocus />
        </Group>

        <Button fullWidth mt="xl" size="md">
          Verify OTP
        </Button>

        <Text ta="center" mt="md">
          Didn&apos;t receive the OTP?{" "}
          <Button variant="subtle" color="blue" size="xs">
            Resend
          </Button>
        </Text>

        <Text ta="center" mt="md">
          <Link to={routeNames.login} fw={700} className="text-blue-500">
            Back to Login
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
