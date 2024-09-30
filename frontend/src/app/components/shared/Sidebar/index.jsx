import { Code, Group, ScrollArea, rem } from "@mantine/core";

import { LuGaugeCircle } from "react-icons/lu";
import { MdOutlineEventNote } from "react-icons/md";

import classes from "./NavbarNested.module.css";
import classesUser from "./UserButton.module.css";

import { Avatar, Text, UnstyledButton } from "@mantine/core";
import { BiChevronRight } from "react-icons/bi";
import { LinksGroup } from "../Navigations/LinksGroup";
import Logo from "../../common/Logo";
import { FaGear } from "react-icons/fa6";

const mockdata = [
  { label: "Dashboard", icon: LuGaugeCircle },
  {
    label: "Projects",
    icon: MdOutlineEventNote,
    initiallyOpened: true,
    links: [
      { label: "All Projects", link: "#" },
      { label: "Create new Project", link: "/" },
    ],
  },
  {
    label: "Settings",
    icon: FaGear,
    links: [
      { label: "Profile", link: "/" },
      { label: "API", link: "/" },
    ],
  },
  {
    label: "Security",
    icon: LuGaugeCircle,
    links: [
      { label: "Enable 2FA", link: "#" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "#" },
    ],
  },
];

export default function Sidebar() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UnstyledButton className={classesUser.user}>
          <Group>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Harriette Spoonlicker
              </Text>

              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>

            <BiChevronRight />
          </Group>
        </UnstyledButton>
      </div>
    </nav>
  );
}
