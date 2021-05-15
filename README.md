<h1 align="center">&lt;wc-csv-table&gt; CSV -> HTML Table</h1>

<div align="center">
  <a href="https://github.com/vanillawc/wc-csv-table/releases"><img src="https://badgen.net/github/tag/vanillawc/wc-csv-table" alt="GitHub Releases"></a>
  <a href="https://www.npmjs.com/package/@vanillawc/wc-csv-table"><img src="https://badgen.net/npm/v/@vanillawc/wc-csv-table" alt="NPM Releases"></a>
  <a href="https://bundlephobia.com/result?p=@vanillawc/wc-csv-table"><img src="https://badgen.net/bundlephobia/minzip/@vanillawc/wc-csv-table" alt="Bundlephobia"></a>
  <a href="https://github.com/vanillawc/wc-csv-table/actions"><img src="https://github.com/vanillawc/wc-csv-table/workflows/Latest/badge.svg" alt="Latest Status"></a>
  <a href="https://github.com/vanillawc/wc-csv-table/actions"><img src="https://github.com/vanillawc/wc-csv-table/workflows/Release/badge.svg" alt="Release Status"></a>

  <a href="https://discord.gg/aSWYgtybzV"><img alt="Discord" src="https://img.shields.io/discord/723296249121603604?color=%23738ADB"></a>
  <a href="https://www.webcomponents.org/element/vanillawc/wc-csv-table"><img src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" alt="Published on WebComponents.org"></a>
</div>

## Installation

*Installation*
```sh
npm i @vanillawc/wc-csv-table
```

*Import from NPM*
```html
<script type="module" src="node_modules/@vanillawc/wc-csv-table/index.js"></script>
```

*Import from CDN*
```html
<script type="module" src="https://cdn.jsdelivr.net/gh/vanillawc/wc-csv-table@1/index.js"></script>
```

## Demo

Try it on [WebComponents.dev](https://webcomponents.dev/edit/e9ymso9FS3XKUVomG90u?sv=1&pm=1)

## Usage

**Attributes**

- `src` - load an external CSV file
- `no-headers` - there is no header row

**Properties**

- `value` - get/set the editor's contents
- `noHeaders` - `no-headers` as a property

### Basic Usage

```html
<wc-csv-table src="sample.csv"></wc-csv-table>
```

### 'no-headers' Attribute

Use `no-headers` if your data doesn't contain row headers

```html
<wc-csv-table src="sample2.csv" no-headers></wc-csv-table>
```

## Styling

By default, `<wc-csv-table>` contains an un-styled `<table>` element in the lightDOM. That means, it will inherit any global CSS styles present on the site and can be styled directly using CSS.

## Contributing

See [CONTRIBUTING.md](https://github.com/vanillawc/vanillawc/blob/main/CONTRIBUTING.md)
