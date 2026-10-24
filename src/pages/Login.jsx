import { useActionState, useState } from "react";
import { useNavigate } from 'react-router';
import Swal from "sweetalert2";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  email: z
    .string()
    .email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});


function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleLogin = async (previousState, formData) => {

    const email = formData.get("email");
    const password = formData.get("password");

    try {

      const response = await fetch(
        "http://localhost:2300/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {

        reset();

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/dashboard')
        return null;
      }

    } catch (error) {

      return {
        success: false,
        message: "Server is not responding",
      };

    }
  };
  const [state, formAction, isPending] = useActionState(handleLogin, null);
  const onSubmit = (data) => {

    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    formAction(formData);
  };


  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #e3f2fd, #f5f5f5)",
      }}
    >

      <Container maxWidth="sm">

        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
          }}
        >

          <Box textAlign="center" mb={4}>

            <Typography
              variant="h4"
              fontWeight={700}
              color="primary"
            >
              Hospital Management
            </Typography>

            <Typography color="text.secondary">
              Login to your account
            </Typography>

          </Box>


          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* EMAIL */}

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"

              {...register("email")}

              error={!!errors.email}

              helperText={
                errors.email?.message
              }
            />


            {/* PASSWORD */}

            <TextField
              fullWidth
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              margin="normal"

              {...register("password")}

              error={!!errors.password}

              helperText={
                errors.password?.message
              }

              slotProps={{
                input: {

                  endAdornment: (

                    <InputAdornment position="end">

                      <IconButton
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >

                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}

                      </IconButton>

                    </InputAdornment>

                  ),
                },
              }}
            />


            {/* SERVER ERROR */}

            {state?.message && !state?.success && (

              <Typography
                color="error"
                sx={{ mt: 1 }}
              >
                {state.message}
              </Typography>

            )}


            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isPending}

              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
              }}
            >

              {isPending
                ? "Logging in..."
                : "Login"}

            </Button>


            <Typography
              textAlign="center"
              mt={3}
              color="text.secondary"
            >
              Don't have an account?{" "}

              <Typography
                component="span"
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Typography>

            </Typography>

          </Box>

        </Paper>

      </Container>

    </Box>
  );
}


export default Login;