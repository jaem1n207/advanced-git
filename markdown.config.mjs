import markdownMagic from 'markdown-magic';
import { resolve } from 'path';

const markdownPath = resolve('./README.md');

/**
 * @type {markdownMagic.Configuration}
 */
const config = {
  matchWord: 'AUTO-GENERATED-CONTENT',
};

markdownMagic(markdownPath, config);
