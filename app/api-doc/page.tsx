import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "@/swagger/swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
