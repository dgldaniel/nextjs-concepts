import { GetServerSideProps } from "next";
import Link from "next/link";
import { Title } from "../styles/pages/Home";

import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";

interface HomeProps {
  recommededProducts: Document[];
}

export default function Home({ recommededProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        shouldExcludeTitleSuffix
        image="boost.png"
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommededProducts.map((recommededProduct) => {
            return (
              <li key={recommededProduct.id}>
                <Link href={`/catalog/products/${recommededProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommededProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommededProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommededProducts: recommededProducts.results,
    },
  };
};
