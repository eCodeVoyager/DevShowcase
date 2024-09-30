import { Container, Title, Text, Button, SimpleGrid } from "@mantine/core";

export function NotFoundImage() {
  return (
    <Container className={"h-screen flex items-center justify-center"}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <img src={"/images/assets/not-found.svg"} className="md:hidden" />
        <div>
          <Title size={36} mb={10}>
            Something is not right...
          </Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className="!w-full md:!w-auto"
          >
            Get back to home page
          </Button>
        </div>
        <img src={"/images/assets/not-found.svg"} className="hidden md:block" />
      </SimpleGrid>
    </Container>
  );
}
