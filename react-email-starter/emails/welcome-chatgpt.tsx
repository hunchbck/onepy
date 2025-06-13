// components/emails/WelcomeEmail.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Section,
  Text
} from "@react-email/components";

interface WelcomeUserProps {
  username?: string;
}

export const WelcomeEmail = ({ username }: WelcomeUserProps) => {
  return (
    <Html>
      <Head />
      <Body
        style={{ backgroundColor: "#f8f9fa", fontFamily: "Arial, sans-serif" }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#fff",
            padding: "32px",
            borderRadius: "8px"
          }}
        >
          <Heading
            style={{ color: "#222", fontSize: "24px", marginBottom: "16px" }}
          >
            👋 반가워요! <strong>{username ?? "회원"}</strong>님!
            <br />
            <strong>한평</strong>에 오신 걸 환영해요
          </Heading>
          <Text style={{ fontSize: "16px", color: "#333", lineHeight: "1.6" }}>
            분양사원이든, 건물주든
            <br />
            <strong>거래는 원활하게</strong> 되는 게 제일 중요하잖아요.
          </Text>
          <Text style={{ fontSize: "16px", color: "#333", lineHeight: "1.6" }}>
            한평은 여러분의 분양 현장을 체계적으로 관리하고,
            <br />
            필요한 정보를 정확하게, 빠르게, 그리고 손쉽게 전달해드려요.
          </Text>
          <Text style={{ fontSize: "16px", color: "#333", lineHeight: "1.6" }}>
            첫 방문이시라면, <strong>분양 프로젝트 등록</strong>부터
            시작해보세요.
            <br />
            건물주의 경우엔 <strong>분양사원 매칭</strong>도 준비돼 있어요.
          </Text>
          <Section style={{ marginTop: "32px", textAlign: "center" }}>
            <Link
              href="https://your-app-url.com"
              style={{
                backgroundColor: "#2b77e7",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-block",
                fontWeight: "bold"
              }}
            >
              한평 시작하기 →
            </Link>
          </Section>
          <Text
            style={{
              fontSize: "14px",
              color: "#777",
              marginTop: "40px",
              textAlign: "center"
            }}
          >
            언제든 다시 방문하셔도
            <br />
            한평은 늘 여러분을 기다리고 있어요.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
