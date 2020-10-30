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
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3333/recommended");
  const recommededProducts = await response.json();

  return {
    props: {
      recommededProducts,
    },
  };
};
