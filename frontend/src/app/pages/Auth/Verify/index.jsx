import { Button, Group, PinInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { routeNames } from "../../../../routes/route.data";
import AuthService from "../../../../services/AuthService";
import AuthUiLayout from "../../../Layouts/AuthUiLayout";

export default function OtpVerification() {
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.email) {
      navigate(routeNames.register);
    }
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) => {
        if (value.length !== 6) {
          return "OTP must be 6 digits";
        }
        if (isNaN(value)) {
          return "OTP must be a number";
        }

        return null;
      },
    },
  });
  const handleVerifyOTP = async (values) => {
    form.validate();
    try {
      setLoading(true);
      let data;
      if (state?.originPage === "forgot-password") {
        data = await AuthService.verifyForgotPasswordOtp({
          email,
          otp: values.otp,
        });
      } else if (state?.originPage === "register") {
        data = await AuthService.verifyOtpEmail({
          email,
          otp: parseInt(values.otp),
        });
      } else {
        throw new Error("Invalid origin page");
      }
      if (data?.success) {
        toast.success(data.message || "OTP verified.");
        navigate(routeNames.forgotSetPassword, {
          state: { email },
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
      title={
        state?.originPage === "forgot-password"
          ? "Reset Password"
          : "Enter OTP to verify your account"
      }
      subTitle={"A 6-digit code has been sent to your email"}
    >
      <Group justify="center" mt="md">
        <PinInput
          key={form.key("otp")}
          {...form.getInputProps("otp")}
          type={"number"}
          length={6}
          size="lg"
          gap={"md"}
          autoFocus
        />
      </Group>

      <Button
        onClick={form.onSubmit((values) => handleVerifyOTP(values))}
        loading={loading}
        fullWidth
        mt="xl"
        size="md"
      >
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
    </AuthUiLayout>
  );
}
