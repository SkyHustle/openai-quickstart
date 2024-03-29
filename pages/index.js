import styles from "./index.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import ComboBox from "../components/ComboBox";

export default function Home() {
    const [animalInput, setAnimalInput] = useState("");
    const [result, setResult] = useState();
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetchModels();
    }, []);

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ animal: animalInput }),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                );
            }

            setResult(data.result);
            setAnimalInput("");
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    async function fetchModels() {
        try {
            const response = await fetch(`/api/listModels`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                );
            }

            setModels(data.result.data);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function retrieveModel() {
        try {
            const response = await fetch(
                `/api/retrieveModel?modelName=${"text-davinci-003"}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            if (response.status !== 200) {
                throw (
                    data.error ||
                    new Error(`Request failed with status ${response.status}`)
                );
            }

            console.log("Retrieve Model ", data.result);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div>
            <Head>
                <title>OpenAI Quickstart</title>
                <link rel="icon" href="/dog.png" />
            </Head>

            <main className={styles.main}>
                <img src="/dog.png" className={styles.icon} />
                <h3>Name my pet</h3>
                <form onSubmit={onSubmit}>
                    <input
                        required
                        type="text"
                        name="animal"
                        placeholder="Enter an animal"
                        value={animalInput}
                        onChange={(e) => setAnimalInput(e.target.value)}
                    />
                    <input type="submit" value="Generate names" />
                </form>
                <div className={styles.result}>{result}</div>
            </main>
            <ComboBox models={models} />
        </div>
    );
}
