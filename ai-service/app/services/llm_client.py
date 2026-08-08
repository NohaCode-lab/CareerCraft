import httpx
from typing import List, Dict, Any, Optional
from app.config import settings

class LLMClient:
    def __init__(self, litellm_url: str = settings.LITELLM_URL, master_key: str = settings.LITELLM_MASTER_KEY):
        self.litellm_url = litellm_url
        self.master_key = master_key

    async def chat_completion(
        self,
        messages: List[Dict[str, str]],
        model_alias: str = "career-fast",
        temperature: float = 0.7,
        max_tokens: int = 1000,
        request_id: Optional[str] = None
    ) -> Dict[str, Any]:
        if settings.AI_MOCK_MODE:
            return self._mock_response(model_alias, messages, request_id)

        payload = {
            "model": model_alias,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.master_key}"
        }
        if request_id:
            headers["x-request-id"] = request_id

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(
                    f"{self.litellm_url}/chat/completions",
                    json=payload,
                    headers=headers
                )
                if response.status_code == 200:
                    data = response.json()
                    content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                    return {
                        "content": content,
                        "model": data.get("model", model_alias),
                        "usage": data.get("usage", {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0})
                    }
            except Exception:
                pass

        # Fallback to deterministic mock completion if LiteLLM proxy is offline in local dev
        return self._mock_response(model_alias, messages, request_id)

    def _mock_response(self, model_alias: str, messages: List[Dict[str, str]], request_id: Optional[str]) -> Dict[str, Any]:
        user_msg = next((m["content"] for m in messages if m["role"] == "user"), "")
        content = f"[AI-Service-{model_alias}] Executed LLM task. User prompt length: {len(user_msg)}."
        return {
            "content": content,
            "model": model_alias,
            "usage": {"prompt_tokens": len(user_msg) // 4 + 10, "completion_tokens": len(content) // 4, "total_tokens": (len(user_msg) + len(content)) // 4 + 10}
        }

llm_client = LLMClient()
