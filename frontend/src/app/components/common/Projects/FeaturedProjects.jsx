import { Box, SimpleGrid, Title } from "@mantine/core";
import ProjectCard from "./ProjectCard";

const FeaturedProjects = ({ title = null }) => {
  return (
    <Box mt={20}>
      {title && <Title mb={{ base: 30, md: 50 }}>{title}</Title>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* <div className="bg-teal-300 h-20"></div> */}
        {/* <div className="bg-red-300 h-20"></div> */}
        <ProjectCard />
        <ProjectCard />
      </div>
    </Box>
  );
};
export default FeaturedProjects;
