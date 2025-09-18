import TabContent from "../components/TabContent";

export default function HomeTab() {
    return (
        <TabContent
            title="Welcome Form"
            description="This is the Form tab with a video and a code snippet."
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            code={`
        CSS
        
        .form-container {
  transition: height 0.3s ease-in-out;
  overflow: hidden; /* Important to hide content that is not yet shown */
  height: 0;
}
/* Define fixed heights for each state */
.form-container.child {
  height: 100px; /* Example fixed height for 'Child' */
}
.form-container.female {
  height: 180px; /* Example fixed height for 'Female' */
}
.form-container.male {
  height: 290px; /* Example fixed height for 'Male' */
}
  
ReactJS

// app/page.tsx
"use client";

import { useState } from "react";

export default function FormPage() {
  const [category, setCategory] = useState("");

  return (
    <div
      className={'flex items-center justify-center min-h-screen p-4 bg-gray-100'}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Dynamic Form
        </h1>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Select a Category:
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose</option>
            <option value="child">Child</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        {/* This div serves as the container for the transition */}
        <div
          className={'form-container overflow-hidden transition-all duration-300 ease-in-out $--{category}'}
        >
          {/* This div holds the dynamic content and its layout */}
          <div className="min-h-0">
            {category === "child" && (
              <div className="mb-4">
                <label
                  htmlFor="child-title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="child-title"
                  name="child-title"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {category === "female" && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="female-title"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="female-title"
                    name="female-title"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="female-age"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="female-age"
                    name="female-age"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {category === "male" && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="male-title"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="male-title"
                    name="male-title"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="male-age"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="male-age"
                    name="male-age"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="male-experience"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Work Experience
                  </label>
                  <input
                    type="text"
                    id="male-experience"
                    name="male-experience"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


----------------

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Tabs</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }

        /* The container for the moving background */
        .tab-bg-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        /* The moving background element */
        .tab-bg {
            position: absolute;
            height: 100%;
            background-color: black;
            border-radius: 9999px; /* rounded-full */
            transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
        }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen p-4">

    <div class="relative bg-gray-200 p-1.5 rounded-full shadow-lg max-w-sm w-full">
        <!-- The moving background container -->
        <div class="tab-bg-container">
            <div id="active-bg" class="tab-bg"></div>
        </div>

        <!-- The actual tab buttons -->
        <div id="tab-container" class="relative flex justify-between">
            <button class="tab-button flex-1 text-center py-2 px-4 text-sm font-medium text-gray-800 rounded-full focus:outline-none z-10 transition-colors duration-300 ease-in-out" data-tab-id="1">Tab 1</button>
            <button class="tab-button flex-1 text-center py-2 px-4 text-sm font-medium text-gray-800 rounded-full focus:outline-none z-10 transition-colors duration-300 ease-in-out" data-tab-id="2">Tab 2</button>
            <button class="tab-button flex-1 text-center py-2 px-4 text-sm font-medium text-gray-800 rounded-full focus:outline-none z-10 transition-colors duration-300 ease-in-out" data-tab-id="3">Tab 3</button>
        </div>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const tabsContainer = document.getElementById('tab-container');
            const activeBg = document.getElementById('active-bg');
            const tabButtons = document.querySelectorAll('.tab-button');

            // Function to set the position and width of the active background
            const setActiveTab = (button) => {
                const buttonWidth = button.offsetWidth;
                const buttonLeft = button.offsetLeft;

                // Update the transform and width of the background element
                activeBg.style.transform = 'translateX($-{buttonLeft}px)';
                activeBg.style.width = '$-{buttonWidth}px';

                // Update text color for active/inactive tabs
                tabButtons.forEach(btn => {
                    btn.style.color = 'rgb(55, 65, 81)'; /* gray-700 */
                });
                button.style.color = 'white';
            };

            // Event listener for tab clicks
            tabsContainer.addEventListener('click', (event) => {
                const clickedButton = event.target.closest('.tab-button');
                if (clickedButton) {
                    setActiveTab(clickedButton);
                }
            });

            // Set the initial active tab on page load
            const initialTab = document.querySelector('.tab-button[data-tab-id="1"]');
            if (initialTab) {
                setActiveTab(initialTab);
            }
        });
    </script>
</body>
</html>


`}
        />
    );
}
