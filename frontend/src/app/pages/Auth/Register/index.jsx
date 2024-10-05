import { Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { routeNames } from "../../../../routes/route.data";
import AuthService from "../../../../services/AuthService";
import { RegisterValidator } from "../../../../utils/validator";
import AuthUiLayout from "../../../Layouts/AuthUiLayout";
import { sendOtp } from "../../../../utils/sendOTP";
export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: yupResolver(RegisterValidator),
  });
  const handleRegister = async (values) => {
    form.validate();
    try {
      setLoading(true);
      const data = await AuthService.registerUser({
        email: values.email,
        username: values.username,
        password: values.password,
      });
      if (data?.success) {
        const sendEmailResponse = await sendOtp(values.email);
        if (sendEmailResponse?.success) {
          toast.success("Registration successful", {
            description:
              "A verification email has been sent to your email address",
          });
          navigate(routeNames.verify, {
            state: { email: values.email, originPage: "register" },
          });
        } else {
          throw new Error(sendEmailResponse?.message || "An error occurred");
        }
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
    <AuthUiLayout title={"Be a part of DevShowCase!"}>
      <Box>
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
      </Box>
      <Box my="md">
        <TextInput
          label="Username"
          placeholder="username"
          size="md"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
      </Box>
      <Box>
        <PasswordInput
          label="Password"
          placeholder="Your password"
          size="md"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
      </Box>
      <Box mt={"md"}>
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Your password"
          size="md"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
        />
      </Box>

      <Button
        onClick={form.onSubmit((values) => handleRegister(values))}
        fullWidth
        mt="xl"
        size="md"
        loading={loading}
      >
        Register
      </Button>

      <Text ta="center" mt="md">
        All ready have an account?{" "}
        <Link to={routeNames.login} fw={700} className="text-blue-500">
          Login
        </Link>
      </Text>
    </AuthUiLayout>
  );
}
