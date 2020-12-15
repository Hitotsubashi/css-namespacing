const AnnotationHandler = require('@/annotation-handler');
const namespace = require('@/index');

describe('annotaion-check', () => {
  let annotationHandler;
  beforeAll(() => {
    annotationHandler = new AnnotationHandler();
  });
  // test('//', () => {
  //   let before = '//123';
  //   expect(annotationHandler.ANNO_REG.test(before)).toEqual(true);
  //   annotationHandler.ANNO_REG.lastIndex = 0;
  //   before = '//     123';
  //   expect(annotationHandler.ANNO_REG.test(before)).toEqual(true);
  //   annotationHandler.ANNO_REG.lastIndex = 0;
  //   before = '//        ';
  //   expect(annotationHandler.ANNO_REG.test(before)).toEqual(true);
  //   annotationHandler.ANNO_REG.lastIndex = 0;
  //   before = '/       ';
  //   expect(annotationHandler.ANNO_REG.test(before)).toEqual(false);
  //   annotationHandler.ANNO_REG.lastIndex = 0;
  // });

  test('/**/', () => {
    let before = '/*123*/';
    expect(annotationHandler.ANNO_REG.test(before)).toEqual(true);
    annotationHandler.ANNO_REG.lastIndex = 0;
    before = `
    /*
    * 123
    */
    `;
    expect(annotationHandler.ANNO_REG.test(before)).toEqual(true);
    annotationHandler.ANNO_REG.lastIndex = 0;
    before = '/*    */';
    expect(annotationHandler.ANNO_REG.test(before)).toEqual(true);
    annotationHandler.ANNO_REG.lastIndex = 0;
    before = '/* /';
    expect(annotationHandler.ANNO_REG.test(before)).toEqual(false);
    annotationHandler.ANNO_REG.lastIndex = 0;
  });

  // test('collect and reset Anno', () => {
  //   const before = `
  //   //123

  //   /*
  //    * 123
  //    */

  //   /*123*/
  //   `;
  //   const after = '$0$1$2';
  //   let result = annotationHandler.collectAnno(before);
  //   expect(result).toEqual(after);
  //   result = annotationHandler.resetAnno(result);
  //   expect(result).toEqual(before);
  // });
});

describe('annotation-handle', () => {
  test('annotation is out of class', () => {
    const before = `
    /*!
    * Bootstrap Grid v4.5.0 (https://getbootstrap.com/)
    * Copyright 2011-2020 The Bootstrap Authors
    * Copyright 2011-2020 Twitter, Inc.
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    */
    html {
      box-sizing: border-box;
      -ms-overflow-style: scrollbar;
    }
    /* check-check */
    /* check-check */
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
    /* check-check */
    .container {
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    `;
    const after = `
    /*!
    * Bootstrap Grid v4.5.0 (https://getbootstrap.com/)
    * Copyright 2011-2020 The Bootstrap Authors
    * Copyright 2011-2020 Twitter, Inc.
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    */
    html {
      box-sizing: border-box;
      -ms-overflow-style: scrollbar;
    }
    /* check-check */
    /* check-check */
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
    /* check-check */
    .cst-container {
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('annotation in class', () => {
    const before = `
    *,
    *::before,
    *::after {
      /*123*/
      box-sizing: inherit; /*123.123*/
    }

    .container {
      width: 100%;
      padding-right: 15px; /*.123*/
      padding-left: 15px; /*.123*/
      /*.123*/
      /* check-check */
      margin-right: auto;
      margin-left: auto; /*.123*/
    }
    `;
    const after = `
    *,
    *::before,
    *::after {
      /*123*/
      box-sizing: inherit; /*123.123*/
    }

    .cst-container {
      width: 100%;
      padding-right: 15px; /*.123*/
      padding-left: 15px; /*.123*/
      /*.123*/
      /* check-check */
      margin-right: auto;
      margin-left: auto; /*.123*/
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});
