import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { routeNames } from "../../../../routes/route.data";
import Container from "../../common/Container";
import Logo from "../../common/Logo";
import classes from "./HeaderMegaMenu.module.css";

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Container className={"h-full"}>
          <Group justify="space-between" h="100%">
            <Logo />
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to={routeNames.home} className={classes.link}>
                Home
              </Link>

              <Link to={routeNames.about} className={classes.link}>
                Learn
              </Link>
              <a
                href={routeNames.contribute}
                target="_blank"
                className={classes.link}
              >
                Contribute
              </a>
            </Group>

            <Group visibleFrom="sm">
              <Button variant="default">
                <Link to={routeNames.login}>Log in</Link>
              </Button>
              <Button>
                <Link to={routeNames.register}>Sign up</Link>
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link to={routeNames.home} className={classes.link}>
            Home
          </Link>

          <Link to={routeNames.about} className={classes.link}>
            Learn
          </Link>
          <a href={routeNames.contribute} className={classes.link}>
            Contribute
          </a>

          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">
              <Link to={routeNames.login}>Log in</Link>
            </Button>
            <Button>
              <Link to={routeNames.register}>Sign up</Link>
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
