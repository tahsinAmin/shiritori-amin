// import Link from "next/link";
// import ClickAwayDemo from "./components/ClickAwayDemo";

// export default function Home() {

//   return (
//     <div>
//       <header>
//         <Link href="/shiritori">Shiritori</Link>
//       </header>
//       <ClickAwayDemo />
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./components/Sidebar";
import LoadingSpinner from "./components/LoadingSpinner";

const tabComponents: Record<string, React.ComponentType> = {
  home: dynamic(() => import("./tabs/home"), { loading: () => <LoadingSpinner /> }),
  profile: dynamic(() => import("./tabs/profile"), { loading: () => <LoadingSpinner /> }),
  analytics: dynamic(() => import("./tabs/analytics"), { loading: () => <LoadingSpinner /> }),
  settings: dynamic(() => import("./tabs/settings"), { loading: () => <LoadingSpinner /> }),
};

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <>
      <Sidebar onSelect={setActiveTab} />
      <main className="flex-1">
        {ActiveComponent ? <ActiveComponent /> : <p className="p-8">No tab selected</p>}
      </main>
    </>
  );
}
