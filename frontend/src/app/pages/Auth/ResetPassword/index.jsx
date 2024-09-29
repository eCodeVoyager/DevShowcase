import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./ForgotPassword.module.css";
import classesTwo from "../Login/AuthenticationImage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { routeNames } from "../../../../routes/route.data";
import { ResetPasswordValidator } from "../../../../utils/validator";
import { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import AuthService from "../../../../services/AuthService";
import { toast } from "sonner";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: yupResolver(ResetPasswordValidator),
  });
  const handleSendVerifyOtpForResetPassword = async (values) => {
    form.validate();
    try {
      setLoading(true);
      const data = await AuthService.sendVerifyOtpForResetPassword(values);
      if (data?.success) {
        toast.success(data.message || "OTP sent.", {
          description: "Please check your email for the OTP.",
        });
        navigate(routeNames.verify, {
          state: { email: values.email, originPage: "forgot-password" },
        });
      } else {
        throw new Error(data?.message || "An error occurred");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data.message || error.message || "An error occurred",
        {
          description: "Please try again.",
        }
      );
    } finally {
      setLoading(false);
    }
  };
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
              key={form.key("email")}
              {...form.getInputProps("email")}
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
              <Button
                onClick={form.onSubmit((values) =>
                  handleSendVerifyOtpForResetPassword(values)
                )}
                loading={loading}
                className={classes.control}
              >
                Reset password
              </Button>
            </Group>
          </Paper>
        </Container>
      </Paper>
    </div>
  );
}
