import { Button, Paper, PasswordInput, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { routeNames } from "../../../../routes/route.data";
import AuthService from "../../../../services/AuthService";
import {
  LoginValidator,
  SetPasswordValidator,
} from "../../../../utils/validator";
import classes from "../Login/AuthenticationImage.module.css";
export default function ResetPassword() {
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.email) {
      navigate(routeNames.forgotPassword);
    }
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: yupResolver(SetPasswordValidator),
  });
  const handleSetPassword = async (values) => {
    form.validate();
    try {
      setLoading(true);
      const data = await AuthService.forgotPasswordSet({
        email: state.email,
        password: values.password,
      });
      if (data?.success) {
        toast.success(data.message, {
          description: "You can now login with your new password.",
        });
        navigate(routeNames.login);
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
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={12} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Set your new password
        </Title>

        <PasswordInput
          label="New password"
          placeholder="* * * * * * * * *"
          size="md"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm password"
          placeholder="* * * * * * * * *"
          mt="md"
          size="md"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
        />
        <Button
          onClick={form.onSubmit((values) => handleSetPassword(values))}
          fullWidth
          mt="xl"
          size="md"
          loading={loading}
        >
          Set Password
        </Button>
      </Paper>
    </div>
  );
}
