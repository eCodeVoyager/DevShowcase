import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { routeNames } from "../../../../routes/route.data";
import AuthService from "../../../../services/AuthService";
import { ResetPasswordValidator } from "../../../../utils/validator";
import classesTwo from "../Login/AuthenticationImage.module.css";
import classes from "./ForgotPassword.module.css";

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
                  <MdArrowRightAlt size={20} className="-rotate-180" />
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
