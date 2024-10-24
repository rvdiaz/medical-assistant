import axios from "axios";

export const getOpenIAAnswer = async (question, data) => {
  try {
    const baseUrl = process.env.REACT_APP_OPENIA_ENDPOINT;

    const response = await axios.post(
      baseUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a medical assistant helping user analyze their dreams. User will give you a question. Analize the question and find the response in the followings answer and questions prompts, if is not there you will response I don't know: ${data}`,
          },
          {
            role: "user",
            content: question,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.choices[0].message.content;
    }
  } catch (error) {
    console.log("error:::", error);
    return "Error connecting with IA assistant";
  }
};
