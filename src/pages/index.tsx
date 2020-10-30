import { useEffect, useState } from "react";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommededProducts, setRecommededProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/recommended").then((response) => {
      response.json().then((data) => {
        setRecommededProducts(data);
      });
    });
  }, []);

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
