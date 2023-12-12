<script setup lang="ts">
import { useStorage } from '@vueuse/core';
// import Stackedit from 'stackedit-js';
import { onMounted } from 'vue';

// Initialize StackEdit
// const el = document.getElementById('markdown-editor');
// const stackedit = new Stackedit();

// const markdownContent = ref(useStorage('markdown-editor-content', '### Welcome to MarkdownEdit!'));

// Listen to StackEdit events and apply the changes to the textarea.
// stackedit.on('fileChange', (file) => {
//   markdownContent.value = file.content.text;
// });

onMounted(() => {
  // const markdownTemplate = document.getElementById('markdown-template') as HTMLTextAreaElement;
  // if (!markdownContent.value) {
  //   markdownContent.value = markdownTemplate.value;
  // }
  // console.log(markdownContent.value);

  // Open the iframe
  // stackedit.openFile({
  //   name: 'Filename', // with an optional filename
  //   content: {
  //     text: markdownContent.value, // and the Markdown content.
  //   },
  // });
});
</script>

<template>
  <div style="flex: 0 1 1200px; max-width: 1200px;">
    <!-- <c-input-text :value="markdownContent" multiline placeholder="Your markdown content..." mt-5 rows="30" /> -->
    <!-- <iframe style="width: 1200px; height: 600px;" src="https://stackedit.io/app#" frameborder="0" referrerpolicy="no-referrer"></iframe> -->
    <iframe style="width: 1200px; height: 650px;" src="https://stackedit.io/app#" frameborder="0" referrerpolicy="no-referrer"></iframe>
  </div>
<textarea id="markdown-template" style="display: none;">
# Welcome to StackEdit!

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.

## SmartyPants

SmartyPants converts ASCII punctuation characters into smart typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`Isn't this fun?`            |'Isn't this fun?'            |
|Quotes          |`Isn't this fun?`            |'Isn't this fun?'            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|

## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).

## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br>long time, so long<br>that the text does<br>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

And this will produce a flow chart:

```mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
```
</textarea>
</template>

<style lang="less" scoped>
</style>
