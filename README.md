[![GitHub Releases](https://badgen.net/github/tag/vanillawc/wc-csv-table)](https://github.com/vanillawc/wc-csv-table/releases)
[![NPM Release](https://badgen.net/npm/v/@vanillawc/wc-csv-table)](https://www.npmjs.com/package/@vanillawc/wc-csv-table)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/@vanillawc/wc-csv-table)](https://bundlephobia.com/result?p=@vanillawc/wc-csv-table)
[![MIT License](https://badgen.net/github/license/vanillawc/wc-csv-table)](https://raw.githubusercontent.com/vanillawc/wc-csv-table/master/LICENSE)
[![Published on WebComponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vanillawc/wc-csv-table)
[![Latest Status](https://github.com/vanillawc/wc-csv-table/workflows/Latest/badge.svg)](https://github.com/vanillawc/wc-csv-table/actions)
[![Release Status](https://github.com/vanillawc/wc-csv-table/workflows/Release/badge.svg)](https://github.com/vanillawc/wc-csv-table/actions)

A display CSV (Comma Separated Values) as a table

-----

## Installation

```sh
npm i @vanillawc/wc-csv-table
```

Then import the `index.js` file at the root of the package.

-----

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

```html
<wc-csv-table src="sample2.csv" no-headers></wc-csv-table>
```

## Styling

By default, `<wc-csv-table>` contains an un-styled `<table>` element in the lightDOM. That means, it will inherit any global CSS styles present on the site and can be styled directly using CSS.

-----

## Demo

### [WC-CSV-Table - WebComponents.dev](https://webcomponents.dev/edit/e9ymso9FS3XKUVomG90u?sv=1&pm=1)
