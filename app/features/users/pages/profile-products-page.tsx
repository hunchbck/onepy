import { ProductCard } from "~/features/products/components/product-card";
import { makeSSRClient } from "~/supa-client";
import { getUserProducts } from "../queries";
import type { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "User Products | wemake" },
    { name: "description", content: "View user products" }
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const products = await getUserProducts(client, params.username);
  return products;
}

export default function ProfileProductsPage({
  loaderData
}: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {loaderData.map(
        (product: NonNullable<Route.ComponentProps["loaderData"]>[number]) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            tagline={product.tagline}
            reviewsCount={Number(product.reviews)}
            viewsCount={Number(product.views)}
            upvotesCount={Number(product.upvotes)}
          />
        )
      )}
    </div>
  );
}
