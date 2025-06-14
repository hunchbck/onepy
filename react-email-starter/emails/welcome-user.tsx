import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text
} from "@react-email/components";

interface WelcomeUserProps {
  username?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeUser = ({ username }: WelcomeUserProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        A fine-grained personal access token has been added to your account
      </Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/github.png`}
          width="32"
          height="32"
          alt="Github"
        />

        <Text style={title}>
          환영합니다! <strong>@{username}</strong>
        </Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{username}</strong>!
          </Text>
          <Text style={text}>회원가입이 완료되었습니다.</Text>

          <Button style={button}>로그인하기</Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

WelcomeUser.PreviewProps = {
  username: "alanturing"
} as WelcomeUserProps;

export default WelcomeUser;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px"
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px"
};

const links = {
  textAlign: "center" as const
};

const link = {
  color: "#0366d6",
  fontSize: "12px"
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px"
};
