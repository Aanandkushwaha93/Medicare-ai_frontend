import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        {/* <ErrorOutlineIcon
          sx={{ fontSize: 100, color: "error.main" }}
        /> */}

        <Typography variant="h2" fontWeight="bold">
          404
        </Typography>

        <Typography variant="h5">
          Page Not Found
        </Typography>

        <Typography color="text.secondary">
          Sorry, the page you are looking for does not exist.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;