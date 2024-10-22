import { AppTitleBar }  from "lib/apps/AppTitleBar";
import { LayoutProps }  from "../layout";
import styles           from './examples.module.scss'

export default function ExampleLayout({children}:LayoutProps) {
   return <div className={styles.exampleLayout}>
      <AppTitleBar auth={false}/>
      {children}
   </div>
}