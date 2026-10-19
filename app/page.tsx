import {env} from "cloudflare:workers";
import StudyApp from "./study-app";
import { requireChatGPTUser } from "./chatgpt-auth";
export const dynamic = "force-dynamic";
export default async function Home() {
  await requireChatGPTUser("/");
  return <StudyApp accountLogin={env.EREM_ACCESS_MODE === "accounts"} />;
}
