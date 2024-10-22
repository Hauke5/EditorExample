'use client'
import { useEffect, useRef, useState } 
                           from "react";
import { Editor, EditorContext, EditorMenu, foldingHeadingPlugin, tocPlugin, useAutoAction, useTOCRule, 
         useVariableRules, useWordCountRule, 
         variablesPlugin, 
         wordCountPlugin} 
                           from "components/Editor";
import { Log }             from "lib/utils";
import { useAppDesc }      from "lib/apps";
import { serverTextRead, serverTextWrite } 
                           from "lib/fileIO/serverFileIO";
import 'components/Editor/styles/gapcursor.css'
import styles              from './page.module.scss'


const file = `readme.md`

export function EditorExample() {
   const {key:appKey}            = useAppDesc()
   const [content, setContent]   = useState('# Editor Example\nEnter some text')

   useEffect(()=>{
      serverTextRead(appKey, file).then(setContent)
         .catch(e => log.warn(`${e}`))
   }, [appKey])

   return <EditorContext>
      <ExampleEditor initialText={content}/>
   </EditorContext>
}

const log = Log(`EditorExample`)

function ExampleEditor({initialText}:{initialText:string}) {
   const varRules       = useVariableRules()
   const wordCountRule  = useWordCountRule()
   const tocRule        = useTOCRule()
   const appPlugins     = useRef(()=>createAppPlugins())

   return <div className={styles.app}>
      <EditorMenu />
      <Editor className={`${styles.editor} ${styles.border}`} newContent={initialText} plugins={appPlugins.current}/>
   </div>

   function createAppPlugins() {
      const rules = Object.assign({}, varRules, wordCountRule, tocRule)
      log.debug(`createAppPlugins, ${rules.toc.comment}`)
      return [
         tocPlugin(),
         foldingHeadingPlugin(),
         wordCountPlugin({show:true, className:styles.wordCount}),
         variablesPlugin(rules),
      ]
   }   
}
