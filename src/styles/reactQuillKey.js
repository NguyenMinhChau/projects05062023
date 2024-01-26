export const handleStyleInlineReactQuill = (className, inlineStyles) => {
  switch (className) {
    case 'ql-align-center':
      inlineStyles.push('text-align: center');
      break;
    case 'ql-align-justify':
      inlineStyles.push('text-align: justify');
      break;
    case 'ql-align-right':
      inlineStyles.push('text-align: right');
      break;
    case 'ql-align-left':
      inlineStyles.push('text-align: left');
      break;
    case 'ql-indent-1':
      inlineStyles.push('padding-left: 2em');
      break;
    case 'ql-indent-2':
      inlineStyles.push('padding-left: 4em');
      break;
    case 'ql-indent-3':
      inlineStyles.push('padding-left: 6em');
      break;
    case 'ql-indent-4':
      inlineStyles.push('padding-left: 8em');
      break;
    case 'ql-indent-5':
      inlineStyles.push('padding-left: 10em');
      break;
    case 'ql-indent-6':
      inlineStyles.push('padding-left: 12em');
      break;
    case 'ql-indent-7':
      inlineStyles.push('padding-left: 14em');
      break;
    case 'ql-indent-8':
      inlineStyles.push('padding-left: 16em');
      break;
    case 'ql-direction-rtl':
      inlineStyles.push('direction: rtl');
      break;
    case 'ql-direction-ltr':
      inlineStyles.push('direction: ltr');
      break;
    case 'ql-font-serif':
      inlineStyles.push('font-family: serif');
      break;
    case 'ql-font-monospace':
      inlineStyles.push('font-family: monospace');
      break;
    default:
      break;
  }
};
