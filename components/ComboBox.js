import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ComboBox({ models }) {
    const [query, setQuery] = useState("");
    const [selectedModel, setSelectedModel] = useState(null);

    function formatDate(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // convert to milliseconds
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        // convert to a readable date string
        const formattedDate = date.toLocaleDateString(undefined, options);
        // return formatted date based on time zone
        return formattedDate;
    }

    const filteredModels =
        query === ""
            ? models
            : models.filter((model) => {
                  return model.id.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <>
            <Combobox
                as="div"
                value={selectedModel}
                onChange={setSelectedModel}
            >
                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Select Model
                </Combobox.Label>
                <div className="relative mt-2">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(model) => model?.id}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>

                    {filteredModels.length > 0 && (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredModels.map((model) => (
                                <Combobox.Option
                                    key={model.id}
                                    value={model}
                                    className={({ active }) =>
                                        classNames(
                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                            active
                                                ? "bg-indigo-600 text-white"
                                                : "text-gray-900"
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <div className="flex items-center">
                                                <span
                                                    className={classNames(
                                                        "inline-block h-2 w-2 flex-shrink-0 rounded-full",
                                                        model.online
                                                            ? "bg-green-400"
                                                            : "bg-gray-200"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                <span
                                                    className={classNames(
                                                        "ml-3 truncate",
                                                        selected &&
                                                            "font-semibold"
                                                    )}
                                                >
                                                    {model.id}
                                                    <span className="sr-only">
                                                        {" "}
                                                        is{" "}
                                                        {model.online
                                                            ? "online"
                                                            : "offline"}
                                                    </span>
                                                </span>
                                            </div>

                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                        active
                                                            ? "text-white"
                                                            : "text-indigo-600"
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
            {selectedModel && (
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Created on: {formatDate(selectedModel.created)}
                    </p>
                </div>
            )}
        </>
    );
}
