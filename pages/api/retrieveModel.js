import { openai } from "./openai-instance";

export default async function (req, res) {
    const modelName = req.query.modelName;
    console.log("modelName", modelName);
    try {
        const response = await openai.retrieveModel(modelName);
        console.log(response.data);
        res.status(200).json({ result: response.data });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
}
