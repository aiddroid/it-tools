import { Kit, Raphael, parse, visualize } from 'regulex_common';
import { isRef, ref, watch } from 'vue';

export { convertTextToRegex, isValidRegex, useRegexGraph };

function isValidRegex(regexText: string) {
  try {
    const regex = new RegExp(regexText);
    // 正则表达式合法
    return true;
  }
  catch (error) {
    // 正则表达式不合法
    throw new Error('Invalid regex string');
  }
}

function convertTextToRegex(text: string, isIgnoreCase: boolean, isMultipleLines: boolean, isGlobalMatch: boolean) {
  if (!isValidRegex(text)) {
    return {};
  }
  const regex = text;
  const flags = (isIgnoreCase ? 'i' : '') + (isMultipleLines ? 'm' : '') + (isGlobalMatch ? 'g' : '');
  return { regex, flags };
}

interface IRegexGraphOptions {
  inputRegexText: MaybeRef<string>
  isIgnoreCase: MaybeRef<boolean>
  isMultiline: MaybeRef<boolean>
  isGlobalMatch: MaybeRef<boolean>
  regexGraphId: string
  regexGraph: Ref
}

function useRegexGraph({
  inputRegexText,
  isIgnoreCase,
  isMultiline,
  isGlobalMatch,
  regexGraphId,
  regexGraph,
}: IRegexGraphOptions) {
  watch([inputRegexText, isIgnoreCase, isMultiline, isGlobalMatch].filter(isRef),
    () => {
      if (!isValidRegex(inputRegexText.value)) {
        throw new Error('Invalid regex string');
      }

      const svgElement = regexGraph.value;
      while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
      }

      const paper = Raphael(regexGraphId, 0, 0);
      const flags = (isIgnoreCase.value ? 'i' : '') + (isMultiline.value ? 'm' : '') + (isGlobalMatch.value ? 'g' : '');
      visualize(parse(inputRegexText.value), flags, paper);
    },
    { immediate: true },
  );
}
