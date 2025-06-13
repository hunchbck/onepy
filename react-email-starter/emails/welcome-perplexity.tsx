import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text
} from "@react-email/components";

interface WelcomeUserProps {
  username?: string;
}

export default function WelcomePerplexity({ username }: WelcomeUserProps) {
  return (
    <Html lang="ko">
      <Head />
      <Preview>
        {username ?? "회원"}님! 한평에 오신 걸 환영합니다! 원활한 거래의 시작
      </Preview>
      <Body
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily: "Pretendard, sans-serif"
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 32,
            maxWidth: 480,
            margin: "40px auto"
          }}
        >
          <Section>
            <Text style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              안녕하세요, 한평입니다 👋
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
              {username ?? "회원"}님! 한평에 가입해주셔서 진심으로 감사드려요.
              <br />
              저희는 분양사원과 건물주님 모두 <b>원활한 거래</b>를 경험하실 수
              있도록
              <br />
              최신 분양 정보와 효율적인 소통 환경을 제공합니다.
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
              이제 한평에서, 원하는 정보를 쉽고 빠르게 찾고
              <br />
              거래의 모든 과정을 한눈에 관리해보세요.
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 28 }}>
              앞으로도 <b>원활한 거래</b>를 위해 항상 곁에서 도와드릴게요.
              <br />
              궁금한 점이 있으면 언제든 한평을 찾아주세요!
            </Text>
            <Text style={{ fontSize: 15, color: "#1d72e8", fontWeight: 600 }}>
              지금 바로 한평에 다시 접속해서
              <br />
              새로운 분양 정보를 확인해보세요!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
