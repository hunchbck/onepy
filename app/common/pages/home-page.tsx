import type { MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | 분양인" },
    { name: "description", content: "Welcome to 분양인" },
  ];
};

export default function HomePage() {
  return (
    <div className="px-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            오늘의 상품
          </h2>
          <p className="text-xl font-light text-foreground">
            오늘의 상품을 확인해보세요.
          </p>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`productId-${index}`}
            id={`productId-${index}`}
            name="SK V1 Center"
            description="SK 에서 만드는 지식산업센터"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>
    </div>
  );
}
