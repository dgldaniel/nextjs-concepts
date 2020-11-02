import { GetServerSideProps } from "next";

import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommededProducts: IProduct[];
}

export default function Home({ recommededProducts }: HomeProps) {
  async function handleSum() {
    const math = (await import("../lib/math")).default;

    alert(math.sum(3, 5));
  }

  return (
    <div>
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

      <button onClick={handleSum}>Sum!</button>
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
