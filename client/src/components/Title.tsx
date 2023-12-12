import { Typography, TypographyProps } from "@mui/material";

const Title: React.FC<{
  title: string | undefined;
  variant: TypographyProps["variant"];
}> = ({ title, variant }) => {
  return (
    <>
      <Typography variant={variant}>
        {title}
      </Typography>
    </>
  );
};

export default Title;
