import { Box, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { routeNames } from "../../../routes/route.data";
const Home = () => {
  return (
    <Box>
      <Title>TItle</Title>
      <Button>
        <Link to={routeNames.dashboard}>Button</Link>
      </Button>
    </Box>
  );
};
export default Home;
