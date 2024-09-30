import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { routeNames } from "../../../../routes/route.data";
import AuthService from "../../../../services/AuthService";
import { ResetPasswordValidator } from "../../../../utils/validator";
import AuthUiLayout from "../../../Layouts/AuthUiLayout";

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
    <AuthUiLayout
      title={"Forgot your password?"}
      subTitle={"Enter your email to get a OTP."}
    >
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="me@domain.com"
          required
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <Group justify="space-between" mt="lg">
          <Link
            to={routeNames.login}
            className={" text-foreground-muted text-sm"}
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
          >
            Reset password
          </Button>
        </Group>
      </Paper>
    </AuthUiLayout>
  );
}
