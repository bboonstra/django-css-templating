# Django CSS Templating

Enhance your Django development experience with seamless CSS templating support in Visual Studio Code.

## Features

- Automatic detection and highlighting of Django template syntax within CSS files
- Syntax highlighting for Django template tags and variables
- Bracket matching and auto-closing for Django template tags
- Maintains full CSS language support and functionality
- Smooth integration with existing Django projects

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X on macOS)
3. Search for "Django CSS Templating"
4. Click Install

Alternatively, you can install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=bboonstra.django-css-templating).

## Usage

Once installed, the extension automatically activates for CSS files in your Django projects. You can start using Django template syntax in your CSS files right away.

Example:

```css
body {
    background-color: {% if is_night %}#000000{% else %}#ffffff{% endif %};
    color: {{ text_color }};
    font-family: '{{ primary_font }}', sans-serif;
}

.header {
    border-bottom: 1px solid {{ border_color }};
}

{% if user.is_authenticated %}
.user-menu {
    display: block;
}
{% else %}
.login-button {
    display: block;
}
{% endif %}
```

The extension will highlight Django template tags and variables while preserving standard CSS syntax highlighting.

## Configuration

No additional configuration is required. The extension works out of the box with your existing Django projects.

## Requirements

- Visual Studio Code version 1.93.1 or higher
- A Django project (for full functionality)

## Known Issues

Please report any issues or feature requests on our [GitHub repository](https://github.com/bboonstra/django-css-templating/issues).

## Contributing

We welcome contributions to improve the Django CSS Templating extension. Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Release Notes

### 1.0.0

Initial release of Django CSS Templating

- Automatic language detection for Django template syntax in CSS files
- Syntax highlighting for Django tags and variables
- Seamless integration with existing CSS functionality

For a full list of changes, please see our [CHANGELOG.md](CHANGELOG.md).
