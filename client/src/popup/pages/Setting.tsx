import Layout from "@/layout/Layout"
import useDeleteToken from "@/hook/useDeleteToken";

export default function Setting() {
  const deleteToken = useDeleteToken();
  return (
    <Layout>
      <button onClick={deleteToken}>layout</button>
    </Layout>
  );
}
