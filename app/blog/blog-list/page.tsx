import { redirect } from "next/navigation";

export default function LegacyArticleListRoute() {
  redirect("/articles");
}
