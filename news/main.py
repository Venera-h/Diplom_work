from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BOT_TOKEN = os.getenv("BOT_TOKEN")
CHANNEL = "@ai_kitai_service"
TELEGRAM_API = f"https://api.telegram.org/bot{BOT_TOKEN}"


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/news/")
async def get_news(limit: int = 10):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{TELEGRAM_API}/getUpdates",
            params={"limit": 100}
        )

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Telegram API error")

    updates = response.json().get("result", [])

    posts = []
    for update in updates:
        message = update.get("channel_post") or update.get("message")
        if not message:
            continue

        chat = message.get("chat", {})
        if chat.get("username") != "ai_kitai_service":
            continue

        post = {
            "id": message.get("message_id"),
            "text": message.get("text") or message.get("caption") or "",
            "date": message.get("date"),
            "image_url": None
        }

        if "photo" in message:
            photo = message["photo"][-1]
            file_id = photo["file_id"]
            post["image_url"] = f"https://api.telegram.org/bot{BOT_TOKEN}/getFile?file_id={file_id}"

        posts.append(post)

    return posts[-limit:]


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8004)
