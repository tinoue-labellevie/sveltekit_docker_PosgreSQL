// frontend/src/routes/+page.server.js
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // NestJS バックエンドの API エンドポイント
    const backendUrl = "http://localhost:3000/items"; // NestJS が起動している URL
    const response = await fetch(backendUrl);

    if (!response.ok) {
      // エラーハンドリング
      console.error(`HTTP error! status: ${response.status}`);
      return {
        items: [],
        error: `Failed to fetch items: ${response.statusText}`,
      };
    }

    const items = await response.json();

    return {
      items: items,
    };
  } catch (error) {
    console.error("Fetching items failed:", error);
    return {
      items: [],
      error: "Failed to fetch items due to a network error.",
    };
  }
};
