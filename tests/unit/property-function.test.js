const namespace = require('@/index');

describe('function', () => {
  test('url', () => {
    const before = `
    .form-control:valid{
      border-color:#28a745;
      padding-right:calc(1.5em + .75rem);
      background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      background-repeat:no-repeat;
      background-position:right calc(.375em + .1875rem) center;
      background-size:calc(.75em + .375rem) calc(.75em + .375rem)
    }

    .form:root{
      background: url(".form{}")
    }
    `;
    const after = `
    .cst-form-control:valid{
      border-color:#28a745;
      padding-right:calc(1.5em + .75rem);
      background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
      background-repeat:no-repeat;
      background-position:right calc(.375em + .1875rem) center;
      background-size:calc(.75em + .375rem) calc(.75em + .375rem)
    }

    .cst-form:root{
      background: url(".form{}")
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('attr', () => {
    const before = `
    .form::before{
      content:"("attr(data-class)")"
    }
    `;
    const after = `
    .cst-form::before{
      content:"("attr(data-class)")"
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});
