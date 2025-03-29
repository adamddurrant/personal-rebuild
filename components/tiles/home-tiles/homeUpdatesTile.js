import styles from ".//homeUpdateTile.module.css";
import util from "../../../styles/util.module.css";
import Link from "next/link";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function HomeUpdatesTile({
  internalUrl,
  logoUrl,
  title,
  content,
  date,
  url,
}) {
  return (
    <div className={styles.container}>
      <a href={url} target={url.includes("http") ? "_blank" : undefined} rel={url.includes("http") ? "noopener noreferrer" : undefined} className={styles.homeTileLink}>
        <div className={styles.stack}>
          <div className={styles.iconContainer}>
            {internalUrl ? (
              <Image
                className={styles.icon}
                priority
                unoptimized
                src={"/recents/" + internalUrl + ".png"}
                height={28}
                width={28}
                alt={title}
              />
            ) : logoUrl ? (
              <Image
                className={styles.icon}
                priority
                unoptimized
                src={logoUrl}
                height={28}
                width={28}
                alt={title}
              />
            ) : null}
          </div>
          <div style={{ display: "block" }}>
            <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
            <span className={styles.externalIcon}>{url.includes("http") ? "↗" : "→"}</span>
          </div>
          <span className={styles.tileContent}>
            {Array.isArray(content) ? content.map((e, i) => (
              <span key={i} className={styles.plainText}>{e.plain_text}</span>
            )) : null}
          </span>
          <p className={styles.date}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </p>
        </div>
      </a>
    </div>
  );
}
