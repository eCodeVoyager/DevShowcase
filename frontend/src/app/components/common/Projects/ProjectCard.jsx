import { Box, Button, Group, Tooltip } from "@mantine/core";
import ImagesSlider from "../ImageSlider";
import { FaGithub } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";

const images = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
];
const ProjectCard = () => {
  return (
    <Box
      className="bg-background-muted text-foreground rounded-lg max-h-[600px]"
      py={"lg"}
      px={{ base: "lg", lg: "xl" }}
    >
      <Group justify="space-between" align="start">
        <Box className="lgxl:flex-[.7]">
          <h2 className="tracking-wider font-Syne text-3xl font-semibold">
            SOTTO-JACHAI
          </h2>
          <Group wrap="wrap" mt={20} gap={12} justify="space-between">
            {["React", "NodeJs", "JWT", "Express.js", "MongoDB", "Brain"].map(
              (techItem, idx) => (
                <Box
                  key={idx}
                  className="border-[1.5px] px-2 py-1 border-foreground rounded text-xs font-medium flex-1 text-center tracking-wider font-Raleway"
                >
                  {techItem}
                </Box>
              )
            )}
          </Group>
        </Box>
        <Box className="my-5 lg:my-0 lg:flex-1 flex justify-end shrink-0">
          <ImagesSlider images={images} />
        </Box>
      </Group>
      <Group wrap="nowrap" mt={25} justify="space-between">
        <Box className="border-[1.5px] p-2 border-foreground rounded text-sm whitespace-nowrap  lg:text-base font-semibold  text-center tracking-wider font-Raleway">
          Full-Stack Project
        </Box>
        <Group
          wrap="nowrap"
          className="!flex-row-reverse lg:!flex-row"
          gap={{ base: 1, lg: 5 }}
        >
          <Tooltip label="Github">
            <a href="#" target="_blank" rel="noreferrer">
              <FaGithub size={36} className="text-foreground" />
            </a>
          </Tooltip>
          <Button variant="outline" color="dark">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-lg"
            >
              <span>Live </span>
              <FiExternalLink />
            </a>
          </Button>
        </Group>
      </Group>
    </Box>
  );
};
export default ProjectCard;
