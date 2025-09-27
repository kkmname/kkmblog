# Tiptap Bundle Setup

This repository contains a custom Tiptap bundle and a Notion-like CSS for web usage. The tiptap.bundle.js was created manually using Rollup, and the styling (tiptap.notion.css) was implemented from scratch.

```bash
##################################################
# tiptap 경로 이동
##################################################
$ mkdir -p /opt/tiptap && cd /opt/tiptap

##################################################
# npm 설치
##################################################
$ sudo dnf install -y npm

##################################################
# tiptap 관련 라이브러리 설치(v3)
##################################################
$ npm install --save \
  @tiptap/core @tiptap/starter-kit \
  @tiptap/extension-bold \
  @tiptap/extension-italic \
  @tiptap/extension-strike \
  @tiptap/extension-underline \
  @tiptap/extension-code \
  @tiptap/extension-code-block \
  @tiptap/extension-blockquote \
  @tiptap/extension-bullet-list \
  @tiptap/extension-ordered-list \
  @tiptap/extension-list-item \
  @tiptap/extension-heading \
  @tiptap/extension-paragraph \
  @tiptap/extension-document \
  @tiptap/extension-text \
  @tiptap/extension-history \
  @tiptap/extension-horizontal-rule \
  @tiptap/extension-dropcursor \
  @tiptap/extension-gapcursor \
  @tiptap/extension-hard-break \
  @tiptap/extension-image \
  @tiptap/extension-link \
  @tiptap/extension-placeholder \
  @tiptap/extension-highlight \
  @tiptap/extension-task-list \
  @tiptap/extension-task-item \
  @tiptap/extension-table \
  @tiptap/extension-table-cell \
  @tiptap/extension-table-header \
  @tiptap/extension-table-row \
  @tiptap/extension-character-count \
  @tiptap/extension-color \
  @tiptap/extension-text-style \
  @tiptap/extension-bubble-menu \
  @tiptap/extension-floating-menu \
  @tiptap/extension-focus \
  @tiptap/extension-font-family \
  @tiptap/extension-list-keymap \
  @tiptap/extension-table-of-contents \
  @tiptap/extension-text-align \
  @tiptap/extension-typography \
  @tiptap/extension-unique-id \
  @tiptap/extension-invisible-characters \
  @tiptap/extension-file-handler \
  @tiptap/extension-drag-handle
  
##################################################
# rollup 관련 libary 설치
##################################################
$ npm install --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs

##################################################
# 설치된 libary 버전 정보
##################################################
$ cat package.json
{
  "dependencies": {
    "@tiptap/core": "^3.5.3",
    "@tiptap/extension-blockquote": "^3.5.3",
    "@tiptap/extension-bold": "^3.5.3",
    "@tiptap/extension-bullet-list": "^3.5.3",
    "@tiptap/extension-character-count": "^3.5.3",
    "@tiptap/extension-code": "^3.5.3",
    "@tiptap/extension-code-block": "^3.5.3",
    "@tiptap/extension-color": "^3.5.3",
    "@tiptap/extension-document": "^3.5.3",
    "@tiptap/extension-dropcursor": "^3.5.3",
    "@tiptap/extension-gapcursor": "^3.5.3",
    "@tiptap/extension-hard-break": "^3.5.3",
    "@tiptap/extension-heading": "^3.5.3",
    "@tiptap/extension-highlight": "^3.5.3",
    "@tiptap/extension-history": "^3.5.3",
    "@tiptap/extension-horizontal-rule": "^3.5.3",
    "@tiptap/extension-image": "^3.5.3",
    "@tiptap/extension-italic": "^3.5.3",
    "@tiptap/extension-link": "^3.5.3",
    "@tiptap/extension-list-item": "^3.5.3",
    "@tiptap/extension-ordered-list": "^3.5.3",
    "@tiptap/extension-paragraph": "^3.5.3",
    "@tiptap/extension-placeholder": "^3.5.3",
    "@tiptap/extension-strike": "^3.5.3",
    "@tiptap/extension-table": "^3.5.3",
    "@tiptap/extension-table-cell": "^3.5.3",
    "@tiptap/extension-table-header": "^3.5.3",
    "@tiptap/extension-table-row": "^3.5.3",
    "@tiptap/extension-task-item": "^3.5.3",
    "@tiptap/extension-task-list": "^3.5.3",
    "@tiptap/extension-text": "^3.5.3",
    "@tiptap/extension-text-style": "^3.5.3",
    "@tiptap/extension-underline": "^3.5.3",
    "@tiptap/starter-kit": "^3.5.3"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-node-resolve": "^16.0.1",
    "rollup": "^4.52.2"
  }
}

##################################################
# Rollup 설정
##################################################
$ vi rollup.config.js
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

export default {
  input: "bundle-entry.js",
  output: {
    file: "dist/tiptap.bundle.js",
    format: "iife", // 브라우저에서 <script>로 바로 사용 가능
    name: "Tiptap", // window.Tiptap으로 접근
  },
  plugins: [
    resolve(),
    commonjs(),
  ],
}

##################################################
# Bundle 입력
##################################################
$ vi bundle-entry.js
import { Editor } from "@tiptap/core"
import { StarterKit } from "@tiptap/starter-kit"

// 설치한 모든 v3 extension import
import { Bold } from "@tiptap/extension-bold"
import { Italic } from "@tiptap/extension-italic"
import { Strike } from "@tiptap/extension-strike"
import { Underline } from "@tiptap/extension-underline"
import { Code } from "@tiptap/extension-code"
import { CodeBlock } from "@tiptap/extension-code-block"
import { Blockquote } from "@tiptap/extension-blockquote"
import { BulletList } from "@tiptap/extension-bullet-list"
import { OrderedList } from "@tiptap/extension-ordered-list"
import { ListItem } from "@tiptap/extension-list-item"
import { Heading } from "@tiptap/extension-heading"
import { Paragraph } from "@tiptap/extension-paragraph"
import { Document } from "@tiptap/extension-document"
import { Text } from "@tiptap/extension-text"
import { History } from "@tiptap/extension-history"
import { HorizontalRule } from "@tiptap/extension-horizontal-rule"
import { Dropcursor } from "@tiptap/extension-dropcursor"
import { Gapcursor } from "@tiptap/extension-gapcursor"
import { HardBreak } from "@tiptap/extension-hard-break"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { Placeholder } from "@tiptap/extension-placeholder"
import { Highlight } from "@tiptap/extension-highlight"
import { TaskList } from "@tiptap/extension-task-list"
import { TaskItem } from "@tiptap/extension-task-item"
import { Table } from "@tiptap/extension-table"
import { TableCell } from "@tiptap/extension-table-cell"
import { TableHeader } from "@tiptap/extension-table-header"
import { TableRow } from "@tiptap/extension-table-row"
import { CharacterCount } from "@tiptap/extension-character-count"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"

window.Tiptap = {
  Editor,
  StarterKit,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Blockquote,
  BulletList,
  OrderedList,
  ListItem,
  Heading,
  Paragraph,
  Document,
  Text,
  History,
  HorizontalRule,
  Dropcursor,
  Gapcursor,
  HardBreak,
  Image,
  Link,
  Placeholder,
  Highlight,
  TaskList,
  TaskItem,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  CharacterCount,
  Color,
  TextStyle,
}

##################################################
# Rollup
##################################################
$ npx rollup -c

##################################################
# target
##################################################
$ file dist/tiptap.bundle.js
```