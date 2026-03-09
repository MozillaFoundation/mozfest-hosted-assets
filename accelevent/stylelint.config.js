/** @type {import('stylelint').Config} */
export default {
  customSyntax: "postcss-scss",
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "block-no-empty": true,
    "selector-class-pattern": [
      // 1) block: lowercase + optional -words
      // 2) optional __element: lowercase + optional -words
      // 3) optional --modifier: lowercase + optional -words
      "^[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
      {
        message:
          "Class selectors must be kebab-case (e.g. foo-bar) or BEM (e.g. foo-bar__element--modifier).",
      },
    ],
    // Disable this rule to avoid conflict with Prettier line breaks
    "scss/dollar-variable-colon-space-after": null,
    // Disable deprecated rule
    "scss/load-no-partial-leading-underscore": null,
    "no-descending-specificity": null,
  },
};
