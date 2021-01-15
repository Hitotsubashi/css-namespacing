/* eslint-disable import/no-unresolved */
const namespace = require('@/index');

describe('pesudo-class', () => {
  test(':host ', () => {
    const before = `
    :host(.special-custom-element) {
      font-weight: bold;
    }
    `;
    const after = `
    :host(.cst-special-custom-element) {
      font-weight: bold;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test(':not ', () => {
    const before = `
    body :not(.crazy, .fancy) {
      font-family: sans-serif;
    }
    `;
    const after = `
    body :not(.cst-crazy, .cst-fancy) {
      font-family: sans-serif;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test(': close to the content', () => {
    const before = `
    .custom-select:valid{
      border-color:#28a745;
      padding-right:calc(.75em + 2.3125rem);
      background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px,url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e") #fff no-repeat center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem)
    }
    .custom-select.is-valid:focus,
    .was-validated .custom-select:valid:focus{
      border-color:#28a745;
      box-shadow:0 0 0 .2rem rgba(40,167,69,.25)
    }
    `;
    const after = `
    .cst-custom-select:valid{
      border-color:#28a745;
      padding-right:calc(.75em + 2.3125rem);
      background:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px,url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e") #fff no-repeat center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem)
    }
    .cst-custom-select.cst-is-valid:focus,
    .cst-was-validated .cst-custom-select:valid:focus{
      border-color:#28a745;
      box-shadow:0 0 0 .2rem rgba(40,167,69,.25)
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});
