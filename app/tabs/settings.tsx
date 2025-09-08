import TabContent from "../components/TabContent";

export default function HomeTab() {
    return (
        <TabContent
            title="Welcome Settings"
            description="This is the settings tab with a video and a code snippet."
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            code={`function greet(name: string) {
  return "Hello, " + name;
}`}
        />
    );
}
