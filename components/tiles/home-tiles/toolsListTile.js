import styles from ".//toolsListTile.module.css";
import Image from "next/image";
import util from "../../../styles/util.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function ToolsListTile({
  imageUrl,
  title,
  content,
  url,
}) {

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.container}
    >
      <div className={styles.icon}>
        <Image
          unoptimized
          src={imageUrl}
          height={50}
          width={50}
          layout='fixed'
          alt={title}
        ></Image>
      </div>
      <div className={styles.right}>
        <div className={styles.stack}>
          <div className={styles.tileTitle}>  
            <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
            <span className={styles.externalIcon}>↗</span>
          </div>
          <p className={util.tileContent}>{content}</p>
        </div>
      </div>
    </a >
  );
}
