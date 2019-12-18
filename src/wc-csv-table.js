/* eslint no-undef: 0 */
import CSV from '../node_modules/csv-es/index.js';

export class WCCSVTable extends HTMLElement {
  static get observedAttributes () {
    return ['src'];
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return; }
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
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

    // build the headers row
    const thead = document.createElement('thead');
    const headers = data.shift();
    headers.forEach(header => {
      const th = document.createElement('th');
      th.innerText = header;
      thead.appendChild(th);
    });
    table.appendChild(thead);

    // build the data rows
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
