import { useParams } from "react-router-dom";

export default function BarbershopPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <h1 className="text-2xl font-bold text-green-600">
      Página Barbearia: {id}
    </h1>
  );
}