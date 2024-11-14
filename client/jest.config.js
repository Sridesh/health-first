import React from "react";

export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy", // Handle CSS imports
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"], // Add RTL setup file
};
