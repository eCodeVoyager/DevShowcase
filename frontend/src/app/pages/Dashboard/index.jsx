import { Box } from "@mantine/core";
import ProfileSummary from "../../components/screens/Dashboard/ProfileSummary";
import FeaturedProjects from "../../components/common/Projects/FeaturedProjects";

const Dashboard = () => {
  return (
    <Box p="md">
      <ProfileSummary />
      <FeaturedProjects title={"Your Featured Projects"} />
    </Box>
  );
};
export default Dashboard;
