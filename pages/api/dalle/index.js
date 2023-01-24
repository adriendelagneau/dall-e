import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
const openai = new OpenAIApi(configuration);
  



export default async function handler(req, res) {
    switch(req.method){
        case "POST":
            await createImage(req, res)
            break;
    }
  }
  

  const createImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
          prompt,
          n: 1,
          size: '512x512',
          response_format: 'url',///////////////////////////////////////////////////////////////
        });
    //console.log(aiResponse.data.data[0].url)
        const image = aiResponse.data.data[0].url;
        res.status(200).json({ photo: image });
      } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
      }
  };
  