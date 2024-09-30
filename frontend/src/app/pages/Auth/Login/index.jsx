import {
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Cookie from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { routeNames } from "../../../../routes/route.data";
import AuthService from "../../../../services/AuthService";
import { LoginValidator } from "../../../../utils/validator";
import AuthUiLayout from "../../../Layouts/AuthUiLayout";
export default function AuthenticationImage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(LoginValidator),
  });
  const handleLogin = async (values) => {
    form.validate();
    try {
      setLoading(true);
      const data = await AuthService.login(values);
      if (data?.success) {
        toast.success("Login successful", {
          description: "You are being redirected to the dashboard",
        });
        navigate(routeNames.dashboard);
        if (keepLoggedIn) {
          Cookie.set("token", data.data.accessToken, { expires: 7 });
        } else {
          Cookie.set("token", data.data.accessToken);
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
    <AuthUiLayout title={"Welcome back to DevShowCase!"}>
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
        <Link to={routeNames.forgotPassword} className="text-blue-500 text-sm ">
          Forgot your password?
        </Link>
      </Text>
      <Checkbox
        onChange={() => setKeepLoggedIn((pre) => !pre)}
        label="Keep me logged in"
        mt="xl"
        size="md"
      />
      <Button
        onClick={form.onSubmit((values) => handleLogin(values))}
        fullWidth
        mt="xl"
        size="md"
        loading={loading}
      >
        Login
      </Button>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{" "}
        <Link to={routeNames.register} fw={700} className="text-blue-500">
          Register
        </Link>
      </Text>
    </AuthUiLayout>
  );
}
