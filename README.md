# Django CSS Templating

This VS Code extension adds support for Django template syntax within CSS files.

## Features

- Syntax highlighting for Django template tags and variables in CSS files
- Bracket matching and auto-closing for Django template tags
- Maintains all standard CSS functionality

## Usage

Simply open a CSS file in a Django project, and the extension will automatically recognize and highlight Django template syntax within the file.

Example:

```css
body {
background-color: {% if is_night %}#000000{% else %}#ffffff{% endif %};
color: {{ text_color }};
}
```

---

This extension allows you to seamlessly use Django template tags and variables in your CSS files while maintaining full CSS language support.
