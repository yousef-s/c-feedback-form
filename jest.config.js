module.exports = {
  "roots": [
    "src/"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform"
  },
  "globals": {
    'ts-jest': {
      diagnostics: false,
    }
  },
}