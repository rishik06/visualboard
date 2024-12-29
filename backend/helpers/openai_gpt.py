from openai import OpenAI 
from dotenv import load_dotenv
import os


load_dotenv()


client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))


def gpt(sys_p, user_p):
    response = client.chat.completions.create(
        model=os.getenv("OPENAI_GPT_MODEL"),
        messages=[
        {"role": "system", "content": sys_p},
        {"role": "user", "content": user_p}
        ],
        # response_format={ "type": "json_object" }
    )

    return response.choices[0].message.content
