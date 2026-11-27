import { redirect } from "next/navigation";

export default function LegacyArticlesListRoute() {
  redirect("/articles");
}
