import { Paper, Text, Title } from "@mantine/core";

const AuthUiLayout = ({ title, subTitle = null, children }) => {
  return (
    <div
      className={`min-h-screen bg-[url('/auth-bg.jpg')] bg-cover bg-center grid place-content-center relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-black/50 backdrop-blur-sm z-10`}
    >
      <Paper
        className={`border-r border-gray-300 dark:border-gray-700 max-w-[500px] md:max-w-full z-20 h-screen md:h-auto md:rounded-lg`}
        p={30}
      >
        <Title
          order={2}
          className={`text-foreground dark:text-white/80`}
          ta="center"
          mt="md"
        >
          {title}
        </Title>
        <Text c="dimmed" fz="sm" ta="center" mb={50}>
          {subTitle && subTitle}
        </Text>

        {children}
      </Paper>
    </div>
  );
};
export default AuthUiLayout;
