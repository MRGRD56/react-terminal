export default function useTerminal(input: string, setInput: (input: string) => void, onOutput: (output: string) => void) {
    return function () {
        switch (input) {
            case "":
                onOutput("");
                break;
            case "help":
                onOutput("Lorem ipsum dolor sit amet!");
                break;
            case "exit":
                onOutput("Exit...");
                window.open(window.location.toString(), '_self')?.close();
                break;
            default:
                onOutput("Unknown command.");
                break;
        }
    };
}