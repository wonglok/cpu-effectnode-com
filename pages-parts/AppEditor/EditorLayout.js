import * as EditorCSS from "./css/editor.module.css";

export function SidebarLayout({ sidebar, children }) {
  return (
    <div className={`h-full w-full flex overflow-hidden`}>
      <aside className={EditorCSS.sidebar + ` bg-gray-200`}>{sidebar}</aside>
      <main className={EditorCSS.main}>{children}</main>
    </div>
  );
}

export function HeaderBodyFooter({ header, footer, children }) {
  return (
    <>
      <div className={EditorCSS.header + ` bg-gray-100`}>{header}</div>
      <div
        className={
          EditorCSS.bodyWithHeaderFooter +
          ` bg-white overflow-y-scroll overflow-x-hidden`
        }
      >
        {children}
      </div>
      <div className={EditorCSS.footer + ` bg-gray-100`}>{footer}</div>
    </>
  );
}

export function Sidebar() {
  return (
    <div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  );
}

export function Tabs({ selectedTab, tabs }) {
  return (
    <div className={"h-full w-full overflow-hidden"}>
      <div className={EditorCSS.tabs + ` flex bg-gray-300`}>
        <div>t0</div>
      </div>
      <main className={EditorCSS.bodyWithTabs + " bg-gray-100"}></main>
    </div>
  );
}
