export const streamChat = async (
  messages,
  onTokenReceived,
  onError,
  onComplete
) => {
  try {
    const response = await fetch("http://localhost:5000/api/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        if (onComplete) onComplete();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim() === "") continue;

        try {
          const eventData = line.replace(/^data: /, "");
          const data = JSON.parse(eventData);

          if (data.token) {
            onTokenReceived(data.token);
          }

          if (data.completed && onComplete) {
            onComplete();
          }

          if (data.error) {
            throw new Error(data.error);
          }
        } catch (e) {
          console.error("Error parsing event:", e);
          if (onError) onError(e);
        }
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    if (onError) onError(error);
  }
};
