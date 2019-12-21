class CSV {
  /**
   * Takes a string of CSV data and converts it to a 2 dimensional array
   *
   * options
   * - typed - type coercion [false]
   *
   * @static
   * @param {*} csv the CSV string to parse
   * @param {*} [options] an object containing the options
   * @param {*} [reviver] a custom function to modify the values
   * @returns a 2 dimensional array of `[entries][values]`
   */
  static parse (csv, options = {}, reviver = v => v) {
    // TODO: Add input checking
    let matches = [];
    let match = '';
    let state = 0;
    const ctx = Object.create(null);
    ctx.value = '';
    ctx.entry = [];
    ctx.output = [];
    ctx.col = 1;
    ctx.row = 1;

    const lexer = RegExp(/"|,|\r\n|\n|\r|[^",\r\n]+/y);

    while ((matches = lexer.exec(csv)) !== null) {
      match = matches[0];

      switch (state) {
        case 0: // start of entry
          switch (true) {
            case match === '"':
              state = 3;
              break;
            case match === ',':
              state = 0;
              this.valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              state = 0;
              this.valueEnd(ctx);
              this.entryEnd(ctx);
              break;
            default:
              ctx.value += match;
              state = 2;
              break;
          }
          break;
        case 2: // un-delimited input
          switch (true) {
            case match === ',':
              state = 0;
              this.valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              state = 0;
              this.valueEnd(ctx);
              this.entryEnd(ctx);
              break;
            default:
              state = 4;
              throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`);
          }
          break;
        case 3: // delimited input
          switch (true) {
            case match === '"':
              state = 4;
              break;
            default:
              state = 3;
              ctx.value += match;
              break;
          }
          break;
        case 4: // escaped or closing delimiter
          switch (true) {
            case match === '"':
              state = 3;
              ctx.value += match;
              break;
            case match === ',':
              state = 0;
              this.valueEnd(ctx);
              break;
            case /^(\r\n|\n|\r)$/.test(match):
              state = 0;
              this.valueEnd(ctx);
              this.entryEnd(ctx);
              break;
            default:
              throw Error(`CSVError: Illegal state [row:${ctx.row}, col:${ctx.col}]`);
          }
          break;
      }
    }

    // flush the last value
    if (ctx.entry.length !== 0) {
      this.valueEnd(ctx);
      this.entryEnd(ctx);
    }

    return ctx.output;
  }

  /**
   * Takes a 2 dimensional array of `[entries][values]` and converts them to CSV
   *
   * options
   * - eof - add a trailing newline at the end [true]
   *
   * @static
   * @param {*} array the input array to stringify
   * @param {*} [options] an object containing the options
   * @param {*} [replacer] a custom function to modify the values
   * @returns the CSV string
   */
  static stringify (array, options = {}, replacer = v => v) {
    // TODO: Add input checking

    options.eof = options.eof !== undefined
      ? options.eof
      : true;

    let output = '';
    array.forEach((row, rIdx) => {
      let entry = '';
      row.forEach((col, cIdx) => {
        col = col.replace('"', '""');
        entry += /"|,|\r\n|\n|\r/.test(col)
          ? `"${col}"`
          : col;
        if (cIdx !== row.length - 1) {
          entry += ',';
        }
      });
      if (options.eof === false) {
        output += entry;
        if (rIdx !== array.length - 1) {
          output += '\n';
        }
      } else {
        output += `${entry}\n`;
      }
    });
    return output;
  }

  /** @private */
  static valueEnd (ctx) {
    ctx.entry.push(ctx.value);
    ctx.value = '';
    ctx.col++;
  }

  /** @private */
  static entryEnd (ctx) {
    ctx.output.push(ctx.entry);
    ctx.entry = [];
    ctx.row++;
    ctx.col = 1;
  }
}

/* eslint no-undef: 0 */

class WCCSVTable extends HTMLElement {
  static get observedAttributes () {
    return ['src'];
  }

  get src () { return this.getAttribute('src'); }
  set src (value) {
    this.setAttribute('src', value);
    this.setSrc(value);
  }

  get value () { return this.__data; }
  set value (value) {
    this.setValue(value);
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return; }
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  constructor () {
    super();
    this.__initialized = false;
    this.__data = null;
    this.__table = null;
  }

  async connectedCallback () {
    this.__data = [];
    this.__table = document.createElement('table');
    this.appendChild(this.__table);

    if (this.hasAttribute('src')) {
      this.setSrc();
    }

    this.__initialized = true;
  }

  async setSrc () {
    if (this.hasAttribute('src')) {
      const rawCSV = await this.fetchSrc(this.src);
      this.__data = CSV.parse(rawCSV);
      this.render();
    }
  }

  async fetchSrc (src) {
    const response = await fetch(src);
    if (response.status !== 200) throw Error(`ERR ${response.status}: ${response.statusText}`);
    return response.text();
  }

  setValue (value) {
    this.__data = CSV.parse(value);
    this.render();
  }

  render () {
    const data = [...this.__data];
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headers = data.shift();
    headers.forEach(header => {
      const th = document.createElement('th');
      th.innerText = header;
      thead.appendChild(th);
    });
    table.appendChild(thead);

    data.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.innerText = cell;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    this.removeChild(this.__table);
    this.__table = table;
    this.appendChild(this.__table);
  }
}

customElements.define('wc-csv-table', WCCSVTable);

export { WCCSVTable };
