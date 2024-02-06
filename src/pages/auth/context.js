import React, { createContext, useContext, useState } from "react";

// Create a Context: You first need to create a context using React.createContext(). This returns a context object with two components: a Provider and a Consumer. In most cases with hooks, you will only use the Provider and the useContext hook itself.

const MyContext = createContext();

// Provide Context Value: The Provider component is used to wrap a part of your component tree and provide the context value to all components within that tree. Any component under this provider can access the context value, no matter how deeply nested it is.

// Step 2: Create a Context Provider Component
// This component will use the Provider component of your context to pass down the state and any functions you want to make available to your component tree.

//When you define a context with createContext(), you're setting up the infrastructure to share values across components without having to pass props manually at every level, but initially, the Provider component doesn't have a value to provide until you explicitly define it.
