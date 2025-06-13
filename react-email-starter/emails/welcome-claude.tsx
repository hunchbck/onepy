interface WelcomeUserProps {
  username?: string;
}

export default function WelcomeEmail({ username }: WelcomeUserProps) {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        color: "#333333",
        lineHeight: "1.6"
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#2563eb",
          padding: "40px 30px",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "32px",
            fontWeight: "bold",
            margin: "0",
            letterSpacing: "-0.5px"
          }}
        >
          한평
        </h1>
        <p
          style={{
            color: "#e0e7ff",
            fontSize: "16px",
            margin: "8px 0 0 0"
          }}
        >
          부동산 분양의 새로운 기준
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "40px 30px" }}>
        {/* Welcome Message */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1f2937",
              margin: "0 0 16px 0"
            }}
          >
            한평 가족이 되어주셔서 감사합니다! 🎉 <strong>{username}</strong>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              margin: "0"
            }}
          >
            분양 업계에서 가장 믿을 수 있는 파트너가 되겠습니다
          </p>
        </div>

        {/* Main Message */}
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#374151",
              marginBottom: "20px"
            }}
          >
            안녕하세요! 👋
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "#4b5563",
              marginBottom: "20px"
            }}
          >
            복잡하고 번거로운 분양 업무, 이제 한평에서 한 번에 해결하세요.
            분양사원분들의 성공적인 영업부터 건물주분들의 안전한 거래까지,
            <strong style={{ color: "#2563eb" }}> 원활한 거래</strong>를 위한
            모든 것을 준비했습니다.
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "#4b5563",
              marginBottom: "30px"
            }}
          >
            정확한 분양정보와 체계적인 관리 시스템으로 여러분의 소중한 시간을
            아껴드릴게요. 💪
          </p>
        </div>

        {/* Features */}
        <div
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            padding: "30px",
            marginBottom: "40px"
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1f2937",
              margin: "0 0 20px 0",
              textAlign: "center"
            }}
          >
            한평만의 특별함
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
              <div
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flexShrink: 0
                }}
              >
                ✓
              </div>
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  color: "#374151"
                }}
              >
                <strong>실시간 분양정보</strong> - 최신 분양 현황을 놓치지
                마세요
              </p>
            </div>

            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
              <div
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flexShrink: 0
                }}
              >
                ✓
              </div>
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  color: "#374151"
                }}
              >
                <strong>체계적인 고객관리</strong> - 상담부터 계약까지 한 번에
              </p>
            </div>

            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
              <div
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  flexShrink: 0
                }}
              >
                ✓
              </div>
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  color: "374151"
                }}
              >
                <strong>안전한 거래환경</strong> - 믿을 수 있는 플랫폼에서
                안심하고
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <a
            href="#"
            style={{
              display: "inline-block",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
              transition: "background-color 0.2s"
            }}
          >
            지금 바로 시작하기 →
          </a>
        </div>

        {/* Closing Message */}
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#fef3c7",
            borderRadius: "8px",
            border: "1px solid #fbbf24"
          }}
        >
          <p
            style={{
              fontSize: "15px",
              color: "#92400e",
              margin: "0",
              fontWeight: "500"
            }}
          >
            💡 <strong>잠깐!</strong> 회원가입만 하고 끝내시면 아까워요.
            <br />
            지금 접속해서 첫 번째 프로젝트를 등록해보세요!
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "30px",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb"
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            margin: "0 0 10px 0"
          }}
        >
          궁금한 점이 있으시면 언제든 문의해주세요
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "#9ca3af",
            margin: "0"
          }}
        >
          한평 팀 드림 | support@hanpyeong.com
        </p>
      </div>
    </div>
  );
}
