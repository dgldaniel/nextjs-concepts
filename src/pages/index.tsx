import { GetServerSideProps } from "next";

import { Title } from "../styles/pages/Home";

import SEO from "@/components/SEO";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommededProducts: IProduct[];
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
              <li key={recommededProduct.id}>{recommededProduct.title}</li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`);
  const recommededProducts = await response.json();

  return {
    props: {
      recommededProducts,
    },
  };
};
