import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  rem,
  Box,
} from "@mantine/core";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { MdOutlineEventNote } from "react-icons/md";

const icons = {
  up: FaArrowUp,
  down: FaArrowDown,
  projects: MdOutlineEventNote,
};

const data = [
  {
    label: "Total Projects",
    stats: "14",
    icon: "projects",
    color: "cyan",
  },
  {
    label: "Profile Completion",
    stats: "60%",
    progress: 60,
    color: "blue",
    icon: "up",
  },
  {
    label: "Goals",
    stats: "1/4 this mo.",
    progress: 25,
    color: "teal",
    icon: "down",
  },
];

export default function ProfileSummary() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          {stat?.progress !== undefined ? (
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: stat.progress, color: stat.color }]}
              label={
                <Center>
                  <Icon
                    style={{ width: rem(20), height: rem(20) }}
                    stroke={1.5}
                  />
                </Center>
              }
            />
          ) : (
            <Box className="size-20 flex items-center justify-center rounded-full"></Box>
          )}

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return (
    <div className="w-4/5 mx-auto">
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
